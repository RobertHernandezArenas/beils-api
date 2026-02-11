# Guía de Autenticación Nuxt 3 + Pinia + TanStack Query

Esta guía implementa el flujo de autenticación (Login + Refresh Token) utilizando **Pinia** para el estado global y **TanStack Query (Vue Query)** para la gestión de peticiones asíncronas.

## 1. Instalación de Dependencias

```bash
bun add pinia @pinia/nuxt @tanstack/vue-query
```

Configura `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    // ... otros módulos
  ],
  // Configuración opcional para auto-importar stores
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
})
```

## 2. Configuración de Plugins

### A. Plugin de TanStack Query (`plugins/vue-query.ts`)

```typescript
// plugins/vue-query.ts
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Opcional: Evitar refetch al cambiar de ventana
        retry: false, // Importante: Manejaremos los reintentos de 401 en el cliente HTTP
      },
    },
  })

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  if (process.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      // Serializar estado para SSR
      nuxtApp.payload.state['vue-query'] = dehydrate(queryClient)
    })
  }
})
```

## 3. Cliente HTTP con Interceptores (`utils/api.ts`)

Este es el **corazón** de la autenticación. Creamos una instancia de `$fetch` que TanStack Query utilizará. Esta instancia maneja la inyección del token y la renovación automática.

```typescript
// utils/api.ts
import { useAuthStore } from '~/stores/auth'

// Creamos una instancia personalizada de fetch
export const $api = async <T>(request: string, opts?: any): Promise<T> => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore() // Accedemos a Pinia (debe estar dentro de un contexto de setup o función exportada)
    
    // 1. Definir Headers con Token
    const headers = {
        ...opts?.headers,
        Authorization: authStore.accessToken ? `Bearer ${authStore.accessToken}` : ''
    }

    try {
        // 2. Realizar petición original
        return await $fetch<T>(request, {
            baseURL: config.public.apiBase || 'http://localhost:3000/api/v1', // Ajusta tu URL base
            ...opts,
            headers,
            // Interceptar respuesta de error
            async onResponseError({ response }) {
                if (response.status === 401) {
                    // 3. Si es 401, intentar refrescar
                    const refreshed = await authStore.refreshTokens()
                    
                    if (refreshed) {
                        // 4. Si se refrescó, reintentar la petición original con el nuevo token
                        // IMPORTANTE: Actualizar el header Authorization
                        const retryHeaders = {
                             ...headers,
                             Authorization: `Bearer ${authStore.accessToken}`
                        }
                        
                        // Retornamos una nueva promesa con el reintento
                        // Nota: $fetch maneja 'retry' internamente, pero para control total a veces
                        // es mejor devolver una nueva llamada recursiva o dejar que lanze y 
                        // usar retry de la librería, pero aquí lo hacemos transparente.
                    } else {
                        // 5. Si falla el refresh, logout
                        authStore.logout()
                    }
                }
            }
        })
    } catch (error: any) {
        // Manejo de reintento si el onResponseError no lo resolvió automáticamente (depende de la versión de ofetch)
        // En implementaciones sencillas, si el refresh funciona, el usuario puede necesitar recargar o 
        // idealmente, el fetcher debería reintentar.
        
        // Estrategia Robustez:
        // Si el error es 401 y acabamos de refrescar, podríamos reintentar aquí recursivamente una vez.
        throw error;
    }
}
```

## 4. Store de Pinia (`stores/auth.ts`)

Usamos **Composition API** dentro de Pinia.

```typescript
// stores/auth.ts
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

interface User {
    user_id: string;
    email: string;
    role: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = useState<User | null>('user', () => null)
    const accessToken = useCookie('access_token')
    const refreshToken = useCookie('refresh_token')
    const router = useRouter()

    // Getters / Computed
    const isAuthenticated = computed(() => !!accessToken.value)

    // Actions
    const setUser = (data: any) => {
        accessToken.value = data.token
        refreshToken.value = data.refreshToken // Asegúrate que el back devuelva 'refreshToken'
        user.value = data.user
    }

    const logout = () => {
        accessToken.value = null
        refreshToken.value = null
        user.value = null
        router.push('/login')
    }

    // Acción de Refresh separada para ser usada por el interceptor
    const refreshTokens = async (): Promise<boolean> => {
        if (!refreshToken.value) return false

        try {
            // Hacemos fetch directo (SIN usar $api para evitar bucle infinito)
            const response = await $fetch<{ data: { token: string, refreshToken: string } }>('http://localhost:3000/api/v1/user/refresh-token', {
                method: 'POST',
                body: { refresh_token: refreshToken.value }
            })

            accessToken.value = response.data.token
            refreshToken.value = response.data.refreshToken
            return true
        } catch (error) {
            logout()
            return false
        }
    }

    return {
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        setUser,
        logout,
        refreshTokens
    }
})
```

## 5. Uso en Componentes (TanStack Query)

### A. Login con `useMutation` (`pages/login.vue`)

```vue
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" />
      <input v-model="form.password" type="password" />
      <button :disabled="isPending" type="submit">
        {{ isPending ? 'Cargando...' : 'Entrar' }}
      </button>
    </form>
    <p v-if="isError" class="error">Error: {{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })

// Definimos la mutación
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: async (credentials: typeof form) => {
    // Usamos $fetch directo o una función helper, NO $api (porque $api inyecta token y aquí no lo tenemos aún)
    return await $fetch('http://localhost:3000/api/v1/user/login', {
       method: 'POST',
       body: credentials
    })
  },
  onSuccess: (data: any) => {
      // Guardamos en Pinia
      authStore.setUser(data.data) // Asumiendo estructura estándar { data: ... }
      router.push('/dashboard')
  }
})

const handleLogin = () => {
  mutate({ ...form })
}
</script>
```

### B. Fetch de Datos Protegidos con `useQuery` (`pages/dashboard.vue`)

Aquí usamos el helper `$api` que creamos en `utils/api.ts`. TanStack Query manejará el estado de carga (`isLoading`) y los datos (`data`), mientras que `$api` manejará silenciosamente la renovación del token si expira.

```vue
<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="isLoading">Cargando perfil...</div>
    <div v-else-if="isError">Error cargando perfil</div>
    <div v-else>
      <p>Bienvenido, {{ data?.email }}</p>
      <p>Role: {{ data?.role }}</p>
    </div>
    
    <button @click="authStore.logout">Salir</button>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '~/stores/auth'
import { $api } from '~/utils/api' // Nuestro helper con interceptores

const authStore = useAuthStore()

// Query Key: ['user-profile']
// Query Fn: Usa $api para fetcher protegido
const { data, isLoading, isError } = useQuery({
  queryKey: ['user-profile'],
  queryFn: () => $api<any>('/user/profile') // Tu endpoint protegido
})
</script>
```

## Resumen
1. **Pinia** maneja el estado global (`user`, `tokens`) y persistencia (`useCookie`).
2. **Utils/API** encapsula `ofetch` con interceptores para inyectar token `Authorization` y manejar `401` -> `refreshTokens`.
3. **TanStack Query** usa el cliente `Utils/API` como fetcher. Si el token expira, `Utils/API` lo renueva "por debajo" y TanStack Query recibe los datos exitosamente (o falla si el refresh falla).

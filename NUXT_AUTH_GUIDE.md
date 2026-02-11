# Guía de Implementación de Autenticación con Nuxt 3 y Refresh Token

Esta guía describe cómo implementar el flujo de autenticación (Login + Refresh Token) en una aplicación **Nuxt 3** consumiendo tu API Node.js.

## 1. Estrategia
Usaremos **Composables** para la lógica de estado y una instancia personalizada de `$fetch` para interceptar errores 401 y renovar el token automáticamente.

**Almacenamiento:**
- `accessToken`: `useCookie('access_token')` (Accesible en SSR y Cliente)
- `refreshToken`: `useCookie('refresh_token')`
- `user`: `useState('user')`

## 2. Implementación

### A. Crear el Composable de Auth (`composables/useAuth.ts`)
Este composable maneja el estado del usuario y las acciones de login/logout.

```typescript
// composables/useAuth.ts
import type { UserDTO } from '~/types'; // Define tus tipos según tu API

export const useAuth = () => {
    const user = useState<UserDTO | null>('user', () => null);
    const accessToken = useCookie('access_token');
    const refreshToken = useCookie('refresh_token');
    const { $api } = useNuxtApp(); // Cliente API personalizado (ver punto B)

    // Login
    const login = async (credentials: any) => {
        try {
            const response = await $api('/user/login', {
                method: 'POST',
                body: credentials
            });

            setUserState(response);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    // Set User State
    const setUserState = (data: any) => {
        accessToken.value = data.token;
        refreshToken.value = data.refreshToken;
        user.value = data.user;
    };

    // Refresh Token Logic
    const refreshTokens = async () => {
        if (!refreshToken.value) return false;

        try {
            const response = await $fetch<{ data: { token: string, refreshToken: string } }>('http://localhost:3000/api/v1/user/refresh-token', {
                method: 'POST',
                body: { refresh_token: refreshToken.value }
            });

            accessToken.value = response.data.token;
            refreshToken.value = response.data.refreshToken;
            return true;
        } catch (error) {
            logout();
            return false;
        }
    };

    // Logout
    const logout = () => {
        accessToken.value = null;
        refreshToken.value = null;
        user.value = null;
        navigateTo('/login');
    };

    return {
        user,
        accessToken,
        login,
        logout,
        refreshTokens
    };
};
```

### B. Crear Plugin de API con Interceptores (`plugins/api.ts`)
Creamos una instancia de `$fetch` que inyecta el token y maneja el refresh automáticamente.

```typescript
// plugins/api.ts
export default defineNuxtPlugin((nuxtApp) => {
    const { accessToken, refreshTokens, logout } = useAuth();
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.apiBase || 'http://localhost:3000/api/v1',
        
        // Interceptor de Request: Inyectar Token
        onRequest({ options }) {
            if (accessToken.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken.value}`
                };
            }
        },

        // Interceptor de Respuesta: Manejar errores
        async onResponseError({ response }) {
            if (response.status === 401) {
                // Intentar renovar token
                const success = await refreshTokens();
                
                if (success) {
                    // Reintentar la petición original con el nuevo token
                    // Nota: $fetch reintentará automáticamente si no lanzamos error, 
                    // pero debemos actualizar el header en el reintento implícito o hacerlo manual.
                    // Una forma robusta es re-ejecutar la llamada:
                    // return api(response.url, options); -> Cuidado con bucles infinitos
                    
                    // En Nuxt 3 (ofetch), lo ideal puede ser simplemente dejar que el usuario recargue o manejarlo en el componente,
                    // PERO para transparencia total, lo mejor es usar una librería como 'ofetch' que permite 'retry'.
                    // Simplificación: Redirigir a login si falla el refresh es lo más seguro.
                } else {
                    logout();
                }
            }
        }
    });

    return {
        provide: {
            api
        }
    };
});
```
*Nota: La re-ejecución automática de request en `ofetch` requiere configuración cuidadosa para evitar bucles. Una alternativa simple es redirigir a login si el token expira.*

### C. Configurar Middleware (`middleware/auth.ts`)
Protege tus rutas.

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const { accessToken } = useAuth();

    if (!accessToken.value && to.path !== '/login') {
        return navigateTo('/login');
    }
});
```

### D. Uso en Componentes (`pages/login.vue`)

```vue
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup>
const { login } = useAuth();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
    const success = await login({ email: email.value, password: password.value });
    if (success) {
        navigateTo('/dashboard');
    } else {
        alert('Credenciales inválidas');
    }
};
</script>
```

## Resumen de Flujo
1. **Login**: Usuario envía credenciales -> API devuelve Access + Refresh Token -> Guardamos en Cookies.
2. **Request Protegido**: `useAuth` inyecta `accessToken` en headers.
3. **Token Expirado (401)**: Interceptor captura error -> llama a `/refresh-token` -> Actualiza cookies -> Reintenta o redirige.
4. **Logout**: Limpia cookies y redirige.

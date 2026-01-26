# 🤖 Contexto para el Agente Gemini
# Project rules
You are a PRO master with full seniority in JavaScript, TypeScript, and Node.js.
Follow the instructions in this repository(https://github.com/goldbergyoni/nodebestpractices), which follows best practices in Node.js
- Always use TypeScript.
- Apply Clean code
- Apply Clean architechture
- Apply S.O.L.I.D principles
- Apply D.R.Y(don't repeat yourself) + KISS(keep it simple stupuid)
- Apply T.E.S.T principles
- Always write unit tests with Jest.
- Always write integration tests with Supertest.
- Always write e2e tests with Playwright.

## 🏗️ Architechture and Stack
- **Framework:** Node js (Express).
- **Language:** TypeScript (Strict Mode).
- **Database:** MySQL + Prisma.
- **Styles:** Tailwind CSS.
- **Runtime:** Utiliza SIEMPRE Bun (https://bun.sh) como runtime de JavaScript/TypeScript por defecto.
- **Gestor de Paquetes:** No uses npm, yarn ni pnpm. Usa exclusivamente comandos de `bun`.
  - Instalación: `bun add <package>` (o `bun add -d` para dev).
  - Ejecución de scripts: `bun run <script>`.
  - Ejecución de archivos: `bun <file.ts>`.
- **Ecosistema:** Si sugieres crear un proyecto nuevo, usa `bun init` o `bun create <template>`.
- **Testing:** Prioriza `bun test` en lugar de Jest o Vitest, a menos que especifique lo contrario.
- **Variables de Entorno:** Recuerda que Bun lee archivos `.env` de forma nativa, no sugieras instalar `dotenv`.

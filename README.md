# Gestor de Recogidas Fijas

Aplicación React + TypeScript creada con Vite. Arquitectura modular, Tailwind CSS v4, React Router, Zustand, Formik/Yup, react-intl, ESLint y Prettier. Integra librerías privadas desde Azure Artifacts (`@ctt-library/*`).

## Requisitos

- Node 18+
- Acceso al feed de Azure Artifacts

## Instalación y arranque

```bash
npm install
npm run dev
```

La app se abre en http://localhost:5173

## Azure Artifacts (.npmrc)

Se incluye un `.npmrc` en la raíz con:

```
registry=https://registry.npmjs.org/
@ctt-library:registry=https://pkgs.dev.azure.com/CTT-SOT/_packaging/front-libraries/npm/registry/
always-auth=true

//pkgs.dev.azure.com/CTT-SOT/_packaging/front-libraries/npm/registry/:_authToken=${AZURE_NPM_TOKEN}
//pkgs.dev.azure.com/CTT-SOT/_packaging/front-libraries/npm/:_authToken=${AZURE_NPM_TOKEN}
```

- En local: inicia sesión con tu usuario de Azure (por ejemplo `npm login --registry=https://pkgs.dev.azure.com/CTT-SOT/_packaging/front-libraries/npm/registry/`).
- En CI/CD: define la variable `AZURE_NPM_TOKEN` con un PAT válido.

Si alguna librería no se puede instalar sin versión, usa por ejemplo `npm i @ctt-library/alert@latest` para forzar siempre la última.

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: build
- `npm run preview`: preview del build
- `npm run lint`: ESLint
- `npm run format`: Prettier

## Estructura

```
src/
  app/           -> router y layout
  components/    -> wrappers y UI compartida
  features/      -> módulos (clientes, recogidas)
  lib/           -> utilidades
  styles/        -> estilos globales (Tailwind v4)
  hooks/         -> hooks reutilizables
  i18n/          -> mensajes y provider
  store/         -> Zustand (clientes y recogidas)
```

## Notas de diseño

- Uso de componentes `@ctt-library/*` con `React.lazy` y fallback nativo para robustez.
- Estado global con persistencia en `localStorage` (clave `fixed-pickups-store`).
- Formularios con Formik + Yup (crear/editar recogidas por cliente).
- Búsqueda de clientes por nombre o código.

## Despliegue

- Genera el build: `npm run build`
- Sirve el directorio `dist/` en tu plataforma (Netlify, Vercel, Nginx, etc.)

## i18n

- `react-intl` con autodetección simple (es/en). Amplía mensajes en `src/i18n/messages/`.

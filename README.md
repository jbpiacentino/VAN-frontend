# VAN Frontend (Nuxt)

Nuxt-based frontend for the Vates Alliance Network (VAN), connected to Strapi v5.

## Stack

- Nuxt 4 (SSR + route-level SWR/prerender)
- Tailwind CSS + daisyUI
- Strapi REST API

## What changed

- Migrated from Vite SPA to Nuxt app.
- VAN Finder now uses a server endpoint (`/api/van-finder/vendors`) for filtering/counts.
- Client no longer loads full vendor/solution/guide/brief/kb datasets into browser memory.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` values.
4. Start dev server:
   ```bash
   npm run dev
   ```

## NPM Scripts

- `npm run dev` - start Nuxt dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run strapi:schema` - inspect live Strapi collections and infer a schema report
- `npm run strapi:seed` - run Strapi seed workflow (dry-run by default, add `-- --apply`)

## Environment

See `.env.example`:

- `NUXT_PUBLIC_STRAPI_BASE_URL` (preferred runtime base URL)
- `VITE_STRAPI_BASE_URL` (fallback runtime base URL + seeding scripts)
- `VITE_STRAPI_API_TOKEN` (read token)
- `VITE_STRAPI_FULL_ACCESS_TOKEN` (write token for seed script)
- `VITE_STRAPI_API_PREFIX` (`/api` default)
- `VITE_STRAPI_LANDING_SINGLE_TYPE` (`landing-page` default)
- `PROTECTED_ACCESS` (`true|false`, missing/false disables access protection)
- `PROTECTED_ACCESS_PWD` (password used only when `PROTECTED_ACCESS=true`)

## Protected Access Gate

The app supports a global password gate via server middleware.

- When `PROTECTED_ACCESS=true`:
  - all website routes are protected
  - users are redirected to `/access` until authenticated
  - access is granted by posting password to `POST /api/access/login`
- When `PROTECTED_ACCESS=false` (or missing):
  - protection is disabled
  - `/access` redirects to `/`

Example (enabled):

```env
PROTECTED_ACCESS=true
PROTECTED_ACCESS_PWD=ridethevan
```

Example (disabled):

```env
PROTECTED_ACCESS=false
```

## Finder API

`GET /api/van-finder/vendors`

Query params:

- `q` - search text (vendor name first, then solution fallback)
- `focuses` - comma-separated areas_of_focus values
- `includeNonMembers` - `true|false`
- `page`, `pageSize`

Response includes:

- filtered/sorted vendor cards
- per-vendor resource counts (`solutions`, `briefs`, `guides`, `kb`)
- `focusOptions`
- pagination metadata

## Seeding

Seed scripts are unchanged and still located in:

- `scripts/seed-data.mjs`
- `scripts/seed-strapi.mjs`

Examples:

```bash
npm run strapi:seed
npm run strapi:seed -- --apply --verbose
```

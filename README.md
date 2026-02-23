# VAN Frontend (Nuxt)

Nuxt 4 frontend for the Vates Alliance Network (VAN), backed by Strapi v5.

## Stack

- Nuxt 4 (SSR)
- Tailwind CSS v4 + daisyUI v5
- Strapi REST API
- Markdown rendering via `markdown-it`

## Main Features

- VAN Finder with server-side filtering and pagination
- Vendor detail pages
- Solutions list and solution detail pages
- Product section:
  - `/products`
  - `/products/[slug]`
- Product cross-links from:
  - Solution Brief pages
  - Solution Guide pages
  - KB Article pages
  - Solution detail pages
- Solution Guide lead capture with optional Grist storage
- Optional global password gate

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Set your Strapi URL and token values.
4. Start dev server:
   ```bash
   npm run dev
   ```

## NPM Scripts

- `npm run dev` - start Nuxt dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run strapi:schema` - inspect Strapi and regenerate `strapi-schema-report.json`
- `npm run strapi:seed` - seed Strapi (dry-run by default; add `-- --apply`)

## Environment Variables

See `.env.example`.

- `NUXT_PUBLIC_STRAPI_BASE_URL` preferred runtime Strapi base URL
- `VITE_STRAPI_BASE_URL` fallback runtime base URL, also used by scripts
- `VITE_STRAPI_API_TOKEN` Strapi read token
- `VITE_STRAPI_FULL_ACCESS_TOKEN` Strapi write token for seeding
- `VITE_STRAPI_API_PREFIX` default `/api`
- `VITE_STRAPI_LANDING_SINGLE_TYPE` default `landing-page`
- `PROTECTED_ACCESS` `true|false` (missing/false disables gate)
- `PROTECTED_ACCESS_PWD` password for `/access` gate
- `GRIST_BASE_URL`, `GRIST_API_KEY`, `GRIST_DOC_ID`, `GRIST_TABLE_ID` for SG lead capture export

## Protected Access Gate

- Global middleware protects routes when `PROTECTED_ACCESS=true`.
- Users must pass through `/access`.
- Access is granted by `POST /api/access/login`.
- When disabled, `/access` redirects to `/`.

## Solution Guide Lead Capture

- SG page body is locked until form submission.
- Endpoint: `POST /api/access/solution-guide-contact`
- File: `server/api/access/solution-guide-contact.post.ts`
- With Grist configured, records are written to the configured table.
- If Grist is unavailable, payload is logged to server stdout.
- Cookies used:
  - `sg_access` list of unlocked SG slugs
  - `sg_lead_profile` reusable contact profile

## API Routes (server/)

- `GET /api/van-finder/vendors`
- `GET /api/vendors/[slug]`
- `GET /api/solutions`
- `GET /api/solutions/[slug]`
- `GET /api/solution-guides/[slug]`
- `GET /api/solution-briefs/[slug]`
- `GET /api/kb-articles/[slug]`
- `GET /api/products`
- `GET /api/products/[slug]`
- `GET /api/landing`
- `GET /api/static-pages/[slug]`

## Seeding

- Source data: `scripts/seed-data.mjs`
- Seeder: `scripts/seed-strapi.mjs`

Examples:

```bash
npm run strapi:seed
npm run strapi:seed -- --apply --verbose
```

## Deployment (Docker + Caddy at `/van`)

This repo already includes:

- Multi-stage Dockerfile (`Dockerfile`)
- Compose setup (`docker-compose.yml`)
- Base path preset to `/van/`

### 1. Prepare production env

Create `.env.production`:

```env
NUXT_PUBLIC_STRAPI_BASE_URL=http://10.1.5.125:8080
VITE_STRAPI_BASE_URL=http://10.1.5.125:8080
VITE_STRAPI_API_TOKEN=...
VITE_STRAPI_API_PREFIX=/api
PROTECTED_ACCESS=true
PROTECTED_ACCESS_PWD=ridethevan
```

Add Grist vars only if SG lead capture export is needed.

### 2. Build and start container

```bash
docker compose build
docker compose up -d
```

By default, app listens on `127.0.0.1:3001` on host.

### 3. Configure Caddy

Example Caddyfile block for `fsb94.hopto.org/van`:

```caddy
fsb94.hopto.org {
  handle_path /van/* {
    reverse_proxy 127.0.0.1:3001
  }
}
```

If you also serve other apps on the same domain, keep them in separate `handle`/`handle_path` blocks.

Reload Caddy:

```bash
sudo systemctl reload caddy
```

### 4. Verify

- Open `https://fsb94.hopto.org/van`
- Confirm:
  - nav routes load under `/van/...`
  - API-backed pages load data
  - product links from SG/SB/KB navigate to `/van/products/[slug]`

## Notes

- The app expects Strapi content fields as reflected in `strapi-schema-report.json`.
- Re-run `npm run strapi:schema` whenever Strapi content types change.

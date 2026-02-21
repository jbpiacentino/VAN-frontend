# VAN Frontend (Vue)

Vue.js skeleton for Vates's Alliance Network (VAN) website.

## Features

- Static VAN pages (home + program overview)
- Dynamic CMS pages powered by Strapi
- Vendors list and vendor detail pages
- Vendor solutions page
- Resource page with solution guides, solution briefs, and knowledge articles

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Set real values in `.env`
4. Start dev server:
   ```bash
   npm run dev
   ```

## NPM Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run strapi:schema` - inspect live Strapi collections and infer a schema report
- `npm run strapi:seed` - run Strapi seed workflow (dry-run by default, use `-- --apply` to write)

## Environment

See `.env.example`:

- `VITE_STRAPI_BASE_URL` (example: `http://10.1.5.125:8080`)
- `VITE_STRAPI_API_TOKEN` (read-only token)
- `VITE_STRAPI_FULL_ACCESS_TOKEN` (write token for seeding)
- `VITE_STRAPI_API_PREFIX` (`/api` by default in Strapi v5)
- `VITE_STRAPI_LANDING_SINGLE_TYPE` (`landing-page` by default)

## Expected Strapi Collections (skeleton)

- `vendors`
- `solution-guides`
- `solution-briefs`
- `knowledge-articles`

Note: In the current schema report, solutions are rendered from the `vendors` relation field `solutions` because `vendor-solutions` endpoint is not available.

## Discover Strapi Data Schema

Use the built-in probe script to fetch sample records and infer fields/types from live Strapi responses.

```bash
npm run strapi:schema
```

Optional flags:

- `--collections vendors,vendor-solutions` to limit which collections are checked
- `--collections vendors,solution-guides` to limit which collections are checked
- `--page-size 3` to sample more than one record
- `--out strapi-schema-report.json` to write output to a file

Example:

```bash
npm run strapi:schema -- --collections vendors,solution-guides --out strapi-schema-report.json
```

## Seed Strapi Test Data

Sample seed content and relation mapping are provided for:

- `vendors`
- `solutions`
- `solution-guides`
- `solution-briefs`
- `kb-articles`
- `compatibility-records`
- `products`

It includes the product set you specified:

- Xen Orchestra
- XCP-ng
- XOStore
- XOProxy
- Vates VMS
- EasyVirt DC Scope
- EasyVirt DC Netscope

Files:

- `scripts/seed-data.mjs` (sample payloads and relations)
- `scripts/seed-strapi.mjs` (upsert + relation wiring)
- `scripts/assets/logos/*.svg` (generated sample vendor logos used for seeding)

Run a dry-run (no writes):

```bash
npm run strapi:seed
```

Apply writes:

```bash
npm run strapi:seed -- --apply
```

Seed only selected collections:

```bash
npm run strapi:seed -- --apply --only vendors,products,solutions
```

Verbose mode:

```bash
npm run strapi:seed -- --apply --verbose
```

Notes:

- The script upserts by `slug` (or `name` when `slug` is unavailable), then sets relations in a second pass.
- For writes, the seeder uses `VITE_STRAPI_FULL_ACCESS_TOKEN` first, then falls back to `STRAPI_API_TOKEN`, then `VITE_STRAPI_API_TOKEN`.
- Vendor logos are always refreshed during seed (existing same-name uploads are deleted, then files are re-uploaded and reattached).
- Solution pictures can be seeded from remote URLs (`sourceUrl`) and are uploaded to Strapi; each seeded solution description is updated with one markdown image.
- For `kb-articles` and `compatibility-records`, your report currently has no inferred fields. If Strapi rejects guessed fields in `scripts/seed-data.mjs`, adjust those payload fields to your exact content-type definition and rerun.

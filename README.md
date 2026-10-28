# My Equipment Indonesia

Company site and product catalog built with Next.js App Router and TypeScript. Content is managed in the private CMS and stored in PostgreSQL.

## Run locally

1. Copy `.env.example` to `.env.local`. Set a unique `AUTH_SECRET` and a temporary Admin email/password (12+ characters). `.env.local` is ignored by Git.
2. Start local PostgreSQL and RustFS (S3-compatible) with `docker compose up -d`.
3. Run `npm install`, `npm run db:migrate`, `npm run db:seed`, `npm run storage:init`, and `npm run cms:bootstrap-admin`.
4. Start the website with `npm run dev`, then open `/admin/login`.

The Compose file uses development-only credentials. Replace them and the local object-storage setup before exposing any service to the internet. The RustFS Console is available on port `9001`.

## CMS access and data

- The first Admin is created from `CMS_BOOTSTRAP_EMAIL`, `CMS_BOOTSTRAP_PASSWORD`, and optional `CMS_BOOTSTRAP_NAME`. Bootstrap refuses to overwrite an existing Admin.
- Login attempts are rate-limited by a hashed account identifier, with an additional hashed source address when the reverse proxy supplies a trusted `X-Real-IP` header. Configure the proxy to overwrite that header; the application does not trust the client-supplied `X-Forwarded-For` chain.
- Admins create Editor/Admin accounts from **Pengguna**. The one-time link is displayed for copying, expires in 24 hours, and is not emailed. Only Admins can change users and contact settings; Editors can manage content and publish it immediately.
- If an Admin is locked out, set `CMS_RESET_EMAIL` and `CMS_RESET_PASSWORD`, then run `npm run cms:reset-admin`. Do not put production secrets in source control.
- Product prices marked as indicative still need confirmation. Promo entries require a source URL and valid date range. Portfolio photos and outlet names stay hidden publicly until the CMS records publication permission; keep the date and approval channel in the internal permission note. No testimonials are created.
- Database migrations live in `src/db/migrations`. Run `npm run db:migrate` after updating to apply schema changes, including portfolio permission records, cleanup of two known non-compliant catalog photos, and path updates for optimized local WebP images. `npm run db:seed` imports the current local catalog once and skips an already seeded product table. Back up PostgreSQL before upgrades and keep the media bucket backed up separately.

## Production configuration

Provide a self-managed PostgreSQL database and an S3-compatible bucket, then configure the variables from `.env.example` in the hosting environment. Set `AUTH_URL` and `CMS_PUBLIC_URL` to the same public HTTPS origin, and `CMS_MEDIA_PUBLIC_URL` to a reachable HTTPS image origin. Run `npm run check:production-env` in the deployment environment before building; it reports missing or invalid configuration names without printing secret values. Configure the bucket or CDN for public image reads and allow browser `PUT` requests from the site origin in its CORS policy. Keep S3 write credentials private and use a least-privilege service account. The `storage:init` command creates the development bucket, public-read policy, and CORS rules.

Run database migrations as a deployment step. Seed only when initializing a new database, then bootstrap the initial Admin. Review the security headers in `next.config.ts` and confirm HTTPS, database, and object-storage connectivity in the hosting environment. Keep a database backup and media backup before deploying schema or storage changes.

## Legacy URLs and photography

Legacy WooCommerce paths redirect in `next.config.ts`. Review this mapping against Search Console and analytics before switching the domain. Product and portfolio photos are managed through the CMS. To regenerate optimized local WebP assets after replacing source photography, run `npm run assets:optimize`; the source assets remain available in `public/images`. Use clean product photography without promotional posters; replace missing-photo placeholders only with the matching official product image. Published service hours follow the [official package page](https://www.myequipmentindonesia.com/paket-usaha-laundry-pontianak/) and should be reconfirmed before a domain launch. Warranty and delivery coverage must be confirmed per product and destination because no universal policy has been verified.

# EcomWMS

EcomWMS is an e-commerce warehouse management system organized as a split repository with a Laravel backend and a Nuxt frontend.

## Repository Structure

```text
ecom-wms/
|-- backend/   Laravel 12 API, admin resources, business modules, tests
|-- frontend/  Nuxt 3 storefront PWA
|-- docs/      Setup, verification, roadmap, and deployment documentation
```

## Applications

### Backend

- Framework: Laravel 12
- Location: `backend/`
- Main responsibilities: API, authentication, admin tooling, and module orchestration

Common commands:

```bash
cd backend
composer install
php artisan test
php artisan serve
```

### Frontend

- Framework: Nuxt 3
- Location: `frontend/`
- Main responsibilities: storefront UI, customer flows, and frontend state management

Common commands:

```bash
cd frontend
npm install
npm run typecheck
npm run dev
npm run build
```

## Status

- Backend split is in place and backend tests are passing.
- Frontend split is in place and production build succeeds.
- Frontend type checking passes.
- Frontend npm audit is clean.
- `storefront-pwa/` is now a legacy empty folder pending automatic deletion on the next Windows sign-in if it is still locked by another process.

## Documentation

- Refactor and verification guides live under `docs/road/`.
- Additional setup and deployment notes are kept in the repository documentation files.

## Environment Notes

- Backend uses its own `.env` file inside `backend/`.
- Frontend uses its own `.env` file inside `frontend/`.
- The repository root is now a workspace shell for both applications, not a runnable Laravel app.

# Brillarix

Monorepo for brillarix.com.

## Prerequisites

- Node.js 22+
- pnpm 10+
- Docker Desktop (for local PostgreSQL)

## Getting started

1. Copy `apps/api/.env.example` to `apps/api/.env`.
2. Run `docker compose up -d`.
3. Run `pnpm install`.
4. Run `pnpm db:generate` and `pnpm db:migrate`.
5. Run `pnpm dev`.

The web app runs at http://localhost:3000 and the API at http://localhost:3001/api/v1/health.

# Aura OS Operations

## Local setup

1. Copy `.env.example` to `.env.local` and provide real service credentials.
2. Set `DATABASE_URL` to a reachable PostgreSQL database.
3. Run `npx prisma migrate deploy` in production, or `npx prisma db push` only against a local development database.
4. Start the application with `npm run dev`.

## Required services

- `NEXTAUTH_SECRET` must be a strong, unique value.
- Configure Gmail credentials to enable account verification.
- Configure at least one AI provider key for Aura Code.
- Configure Stripe credentials only when billing is enabled.

## Rollback

Application changes can be rolled back by deploying the previous build. Database migrations must be reviewed and applied separately; do not reset or drop a shared database.

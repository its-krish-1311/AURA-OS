# 15 DEPLOYMENT RULES

- Validate all environment variables during build (fail the build if required ENV vars are missing).
- Run linting and type-checking before deploying (`npm run lint`, `tsc --noEmit`).
- Ensure Prisma migrations are run safely before the new build goes live.\n
# 06 DATABASE RULES

DATABASE SAFETY IS CRITICAL.

- ❌ NEVER drop production tables casually.
- ❌ NEVER delete migrations.
- ❌ NEVER reset production database without approval.
- ❌ NEVER delete data permanently (Use Soft Deletes: `isDeleted`, `deletedAt`).

## Requirements
- All schema changes require `prisma db push` (dev) or `prisma migrate deploy` (prod).
- All foreign keys must enforce relational integrity.
- Tenant isolation (e.g., `workspaceId`) must be included in WHERE clauses.\n
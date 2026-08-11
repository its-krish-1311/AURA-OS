# 08 AUTH & SECURITY

- **Authentication**: Enforced via NextAuth.
- **Authorization**: Role-Based Access Control (RBAC) via `WorkspaceMember.role` (OWNER, ADMIN, MEMBER).
- **Protection**: Use Next.js Middleware to protect `/os/*` routes from unauthenticated users.
- **Secrets**: Never hardcode API keys. Always use `process.env`.
- **Injection**: Prisma inherently protects against SQL injection, but raw queries must use Prisma parameterized methods.\n
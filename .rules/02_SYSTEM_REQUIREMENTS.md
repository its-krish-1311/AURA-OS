# 02 SYSTEM REQUIREMENTS

## Core Modules
- **Authentication**: NextAuth.js. Inputs: Email/password or OAuth. Outputs: Session tokens. Failure behavior: 401 Unauthorized.
- **Goals OS**: OKR tracking. Dependencies: Prisma (Objective, KeyResult). Security: Soft deletes only.
- **Executive Planner**: Task management. Dependencies: Prisma (Task).
- **AI Chat**: Multi-provider AI orchestration (OpenAI, Anthropic, Groq). Input validation using Zod.

## Security Requirements
- All API routes must use server-side session validation.
- All database operations must be tenant-isolated (by Workspace or User).\n
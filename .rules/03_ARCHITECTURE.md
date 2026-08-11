# 03 ARCHITECTURE

## Stack
- **Frontend**: Next.js 15 (React 19), Tailwind CSS, Framer Motion.
- **Backend**: Next.js App Router API Routes.
- **Database**: PostgreSQL (via Prisma).
- **Auth**: NextAuth.js (v4).
- **Testing**: Jest, React Testing Library.

## Data Flow
Client (React) -> Next.js API Routes -> Prisma Client -> PostgreSQL.

## Core Subsystems
- `app/api/auth`: NextAuth endpoints.
- `app/api/goals`, `app/api/habits`, `app/api/tasks`: REST APIs.
- `app/os/*`: OS module UI.
- `components/dashboard`: Reusable dashboard elements.\n
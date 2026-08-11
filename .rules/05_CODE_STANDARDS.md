# 05 CODE STANDARDS

- **Framework**: Use Next.js App Router strictly. No `pages/` directory.
- **Components**: Use `"use client"` only at the leaf nodes or where interactivity/hooks are strictly required.
- **Naming**: PascalCase for React components. camelCase for functions and variables.
- **Type Safety**: TypeScript is mandatory. Explicitly type props and API responses.
- **Validation**: Use Zod for all API input validation.
- **State Management**: Use React Context (e.g., `OSContext`, `ActionModalContext`) instead of complex global stores unless absolutely necessary.\n
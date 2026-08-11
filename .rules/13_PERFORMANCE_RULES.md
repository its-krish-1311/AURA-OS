# 13 PERFORMANCE RULES

- **Bundle Size**: Avoid massive third-party libraries. Code-split heavy UI components.
- **Data Fetching**: Use Server Components for initial data loads where possible.
- **N+1 Queries**: Use Prisma's `include` to prevent N+1 queries.
- **Images**: Always use `next/image` for optimized image delivery.\n
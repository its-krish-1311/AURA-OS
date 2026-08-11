# 07 API RULES

Every API must:
1. Verify authentication (`getServerSession`).
2. Verify authorization (e.g., check if the user belongs to the requested `workspaceId`).
3. Validate input using Zod.
4. Handle errors gracefully (wrap in try-catch).
5. Return appropriate HTTP status codes (200, 400, 401, 403, 404, 500).

NEVER expose raw database error messages or internal stack traces to the client.\n
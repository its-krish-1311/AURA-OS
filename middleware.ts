export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    // Exclude API routes that don't need auth or handle auth themselves (e.g. webhooks, login)
    "/api/chat/:path*", 
    "/api/conversations/:path*",
    "/api/memories/:path*",
    "/api/knowledge/:path*",
    "/api/siya/:path*"
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.pathname;
  const isAdminRoute = url.startsWith("/control-room");

  // Handle root route
  if (url === "/") {
    // If accessToken exists, redirect to the admin dashboard
    if (accessToken) {
      return NextResponse.redirect(new URL("/control-room", req.url));
    }
    return NextResponse.next();
  }

  // Allow access to non-protected routes
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // If attempting to access protected admin route without accessToken, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If accessToken exists, allow access to protected route
  return NextResponse.next();
}

export const config = {
  matcher: ["/control-room/:path*", "/"], // Apply to root and admin routes
};

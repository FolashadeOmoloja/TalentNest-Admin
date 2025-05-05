import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;
  const isAdminRoute = url.startsWith("/control-room");

  // Check if the user is on the root route ("/")
  if (url === "/") {
    // If token exists, redirect to control-room
    if (token) {
      return NextResponse.redirect(new URL("/control-room", req.url));
    } else {
      return NextResponse.next(); // Allow access to "/" if no token
    }
  }

  // If the route is not protected, let the request proceed
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // If no token is found for admin route, redirect to login or homepage
  if (!token) {
    const response = NextResponse.redirect(
      new URL(isAdminRoute ? "/" : req.url, req.url)
    );
    return response;
  }

  try {
    let secretKey;

    // Assign the correct secret key for the admin route
    if (isAdminRoute) {
      secretKey = new TextEncoder().encode(process.env.ADMIN_SECRET_KEY);
    }

    if (!secretKey) {
      throw new Error("Secret key not found for the requested route.");
    }

    // Verify the token using the appropriate secret key
    const { payload } = await jwtVerify(token, secretKey);

    // Extract the user role from the token payload
    //@ts-ignore
    const userRole: string = payload.role; // Assuming 'role' is present in the token

    // Dynamic route protection based on user role
    if (isAdminRoute && userRole === "admin") {
      return NextResponse.next(); // Allow access to admin route
    } else {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/control-room/:path*", // Admin routes
    "/", // Root route
  ],
};

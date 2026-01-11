import { NextRequest, NextResponse } from "next/server";

// Define allowed roles for each route pattern
const ROLE_ROUTES = {
  admin: /^\/admin(\/.*)?$/,
  institution: /^\/institution(\/.*)?$/,
  author: /^\/author(\/.*)?$/,
} as const;

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/signup",
  "/unauthorized",
  "/about",
  "/contact",
  "/articles",
  "/support",
  "/authors",
  "/institutions",
  "/journals",
  "/search",
  "/topics",
];

/**
 * Decode JWT token without verification (only parse payload)
 * In production, consider using a proper JWT library with verification
 */
function decodeJWT(token: string): { user_type?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    );
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Check if the path is a public route
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  });
}

/**
 * Get required role for a given pathname
 */
function getRequiredRole(
  pathname: string
): "admin" | "institution" | "author" | null {
  for (const [role, pattern] of Object.entries(ROLE_ROUTES)) {
    if (pattern.test(pathname)) {
      return role as "admin" | "institution" | "author";
    }
  }
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get access_token from cookies
  const accessToken = request.cookies.get("access_token")?.value;

  // If user is authenticated and trying to access login/signup, redirect to dashboard
  if (
    accessToken &&
    (pathname === "/login" ||
      pathname.startsWith("/signup") ||
      pathname === "/register")
  ) {
    const decoded = decodeJWT(accessToken);
    if (decoded && decoded.user_type) {
      const userType = decoded.user_type;
      const dashboardUrl =
        userType === "admin"
          ? "/admin/dashboard"
          : userType === "institution"
          ? "/institution/dashboard"
          : "/author/dashboard";
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // If no token and route requires authentication, redirect to login
  const requiredRole = getRequiredRole(pathname);
  if (requiredRole && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists and route requires specific role, check authorization
  if (requiredRole && accessToken) {
    const decoded = decodeJWT(accessToken);

    if (!decoded || !decoded.user_type) {
      // Invalid token, redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has required role
    if (decoded.user_type !== requiredRole) {
      // Wrong role, redirect to unauthorized
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

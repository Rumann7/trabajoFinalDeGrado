import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  const userIdCookie = request.cookies.get("userId");

  const token = tokenCookie ? tokenCookie.value : "";
  const userId = userIdCookie ? userIdCookie.value : "";

  const isValidToken = token !== "";
  const isValidUserId = userId !== "";

  if (
    request.nextUrl.pathname.startsWith("/home") &&
    (!isValidToken || !isValidUserId)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/" && isValidToken && isValidUserId) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/"],
};

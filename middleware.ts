import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const hostname = request.headers.get("host");

  if (request.nextUrl.pathname == "/auth") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    var cookie = request.cookies.get("token");
    if (cookie === undefined) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    var cookie = request.cookies.get("adminToken");

    if (cookie === undefined) {
      return NextResponse.redirect(new URL("/auth/login/admin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};

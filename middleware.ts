import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (request.nextUrl.pathname == "/auth") {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    var cookie = request.cookies.get("token");
    if (cookie === undefined) {
      return NextResponse.rewrite(new URL('/auth/login', request.url));
    }
  }

  var theme = request.headers.get("Sec-CH-Prefers-Color-Scheme");
  var themeCookie = request.cookies.get("theme")?.value;
  if (themeCookie === undefined) {
    if (theme != null) {
      response.cookies.set("theme", theme, {
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  return response;
}

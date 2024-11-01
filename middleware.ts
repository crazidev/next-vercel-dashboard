import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   if (request.nextUrl.pathname.startsWith('/about')) {
  //     return NextResponse.rewrite(new URL('/about-2', request.url))
  //   }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    var cookie = request.cookies.get("token");
    if (cookie === undefined) {
      // return NextResponse.rewrite(new URL('/auth/login', request.url));
    }
  }
  const response = NextResponse.next({ request });
  // response.headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");

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

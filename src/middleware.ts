import { NextResponse, type NextRequest } from "next/server";
import { session } from "./contants/token";

export function middleware(request: NextRequest) {
  let token: string | undefined;
  let adminToken: string | undefined;

  const pathName: string = request.nextUrl.pathname;
  if (request.cookies.has(session.token)) {
    token = request.cookies.get(session.token)?.value;
  } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = request.headers.get("Authorization")?.substring(7);
  }
  if (request.cookies.has("adminToken")) {
    adminToken = request.cookies.get("adminToken")?.value;
  } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
    adminToken = request.headers.get("Authorization")?.substring(7);
  }

  if (!token && (pathName === "/" || pathName.startsWith("/books"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (adminToken && pathName === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/books", request.url));
  }
  if (
    !adminToken &&
    (pathName === "/admin/books" || pathName === "/admin/users")
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/books/:path*", "/admin/:path*"],
};

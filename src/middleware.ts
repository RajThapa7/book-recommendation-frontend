import { NextResponse, type NextRequest } from 'next/server'
import { session } from './contants/token';
import { routes } from './contants/routes';

export function middleware(request: NextRequest) {
    let token: string | undefined;
    const pathName: string = request.nextUrl.pathname;
    // // check for token in session cookie
    if (request.cookies.has(session.token)) {
        token = request.cookies.get(session.token)?.value;
    } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = request.headers.get("Authorization")?.substring(7);
    }
    //checks for protected path when token is not available
    if (!token && (pathName === "/" ||
        pathName.startsWith("/books")
    )) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    // if (token && (pathName === "/" ||
    //     pathName.startsWith("/books")
    // )) {

    //     return NextResponse.redirect(new URL(routes.book.book, request.url))
    // }
}

export const config = {
    matcher: [
        "/books/:path*",
    ]
}
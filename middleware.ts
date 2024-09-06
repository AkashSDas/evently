import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (
            !request.cookies.has(
                process.env.JWT_SECRET_KEY_COOKIE_KEY as string
            )
        ) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/"],
};

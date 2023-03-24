import { NextResponse } from 'next/server';

export default function middleware(req: Request) {
    try {
        const url = new URL(req.url);
        return NextResponse.redirect(
            `https://github.com/FinnDore/${url.pathname.slice(2)}`
        );
    } catch (e) {}
}

export const config = {
    matcher: '/g/:path*'
};

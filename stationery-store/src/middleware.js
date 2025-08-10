import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for the checkout page
  if (request.nextUrl.pathname === '/checkout') {
    // This is a simplified check. In a real application, you would check for
    // authentication tokens, cookies, or session data to determine if the user is logged in.
    // For this example, we'll just check for a hypothetical auth cookie

    const isLoggedIn = request.cookies.has('auth_token');

    // If not logged in, redirect to login page with return URL
    if (!isLoggedIn) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', '/checkout');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run only on the checkout page
export const config = {
  matcher: '/checkout',
};
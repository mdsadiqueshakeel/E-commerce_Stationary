import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Check if the request is for an admin route
  if (path.startsWith('/admin')) {
    // Check for auth token
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      // If not logged in, redirect to login page with return URL
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
    
    // Get user profile from cookies if available
    const userProfileCookie = request.cookies.get('user_profile')?.value;
    let userProfile;
    
    try {
      userProfile = userProfileCookie ? JSON.parse(userProfileCookie) : null;
    } catch (error) {
      console.error('Error parsing user profile cookie:', error);
      userProfile = null;
    }
    
    // If user is not an admin, redirect to home page
    if (!userProfile || userProfile.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // Check if the request is for the checkout page
  else if (request.nextUrl.pathname === '/checkout') {
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

// Configure the middleware to run on admin routes and checkout page
export const config = {
  matcher: ['/admin/:path*', '/checkout'],
};
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin auth check: protect all /admin routes except login and api
  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login') &&
    !pathname.startsWith('/admin/api')
  ) {
    const adminSession = request.cookies.get('admin_session')
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  const response = intlMiddleware(request)

  // Fix: Hostinger reverse proxy leaks internal port 3000 in redirect URLs
  if (response && response.status === 307) {
    const location = response.headers.get('location')
    if (location) {
      response.headers.set('location', location.replace(':3000', ''))
    }
  }

  return response
}

export const config = {
  matcher: ['/', '/(en|zh|es|fr|ar|ru)/:path*', '/admin/:path*'],
}

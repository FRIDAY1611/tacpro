import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: Request) {
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
  matcher: ['/', '/(en|zh|es|fr|ar|ru)/:path*'],
}

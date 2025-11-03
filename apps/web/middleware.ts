import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'fr',
  localePrefix: 'always'
});

export const config = {
  // Intercepte toutes les routes (sauf API, _next, fichiers statiques) pour gérer la locale
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};


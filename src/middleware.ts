import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Ensure the locale is always present in the URL path
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\\\..*).*)']
};
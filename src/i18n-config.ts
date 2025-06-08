export const locales = ['en', 'pt', 'de'] as const;
export const defaultLocale = 'en' as const;
export type Locale = typeof locales[number];

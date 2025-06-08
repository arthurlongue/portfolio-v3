import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from './i18n-config';

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }: { locale: Locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});

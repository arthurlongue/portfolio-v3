import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./i18n-config";

// Can be imported from a shared config

export default getRequestConfig(async (params) => {
  const { locale } = params as { locale: string };
  if (!locales.includes(locale as any)) notFound();
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});

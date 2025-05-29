import { createInstance, i18n as I18nInstanceType } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '../../../next-i18next.config.js';

import type { Resource } from 'i18next'; // Import Resource type

interface InitTranslationsResult {
  i18n: I18nInstanceType;
  resources: Resource; // Use i18next's Resource type
  t: I18nInstanceType['t'];
}

export default async function initTranslations(
  locale: string,
  namespaces: string[] = ['common']
): Promise<InitTranslationsResult> {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string): Promise<Record<string, string>> => // Explicitly type Promise resolution
      import(`../../../public/locales/${language}/${namespace}.json`)
    ))
    .init({
      lng: locale,
      fallbackLng: i18nConfig.i18n.defaultLocale,
      supportedLngs: i18nConfig.i18n.locales,
      defaultNS: namespaces[0],
      ns: namespaces,
      // react: { useSuspense: false } // Not needed for server-side 't' function
      // ... other i18next options
    });
  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}

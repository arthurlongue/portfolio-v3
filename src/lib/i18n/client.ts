import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18nConfig from '../../../next-i18next.config.js';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detect user language
  .use(resourcesToBackend((language: string, namespace: string): Promise<Record<string, string>> =>
    import(`../../../public/locales/${language}/${namespace}.json`)
  ))
  .init({
    // lng: undefined, // Let detector work or fallback to config; LanguageDetector will set this
    fallbackLng: i18nConfig.i18n.defaultLocale,
    supportedLngs: i18nConfig.i18n.locales,
    defaultNS: 'common', // Assuming 'common' is your default namespace
    ns: ['common'], // Adjust if you have multiple namespaces
    debug: process.env.NODE_ENV === 'development', // Enable debug messages in development
    detection: { // Optional: LanguageDetector options
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'], // What to cache user's language selection in
    },
    // React specific options
    react: {
      useSuspense: true, // Recommended for Suspense-based data loading
    }
  });

export default i18n;

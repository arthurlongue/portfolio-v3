// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "../public/locales/pt/common.json";
import en from "../public/locales/en/common.json";
import de from "../public/locales/de/common.json";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      common: pt,
    },
    en: {
      common: en,
    },
    de: {
      common: de,
    },
  },
  lng: "pt",
  fallbackLng: "pt",
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

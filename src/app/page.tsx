// src/app/page.tsx
import React from "react";
import initTranslations from "../lib/i18n/server"; // Adjusted path
import nextI18NextConfig from "../../next-i18next.config.js"; // To get defaultLocale as fallback

// interface HomeProps { // Removing HomeProps as params are removed
//   params: { lang: string };
// }

export default async function Home() { // Removed params from function signature
  // Use defaultLocale as params are not used.
  const lang = nextI18NextConfig.i18n.defaultLocale;
  const { t } = await initTranslations(lang, ['common']);

  return (
    <>
      <div>
        <h1>{t('welcomeMessage')}</h1> {/* Using a key from common.json */}
      </div>
    </>
  );
}

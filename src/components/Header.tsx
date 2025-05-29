"use client";
// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'; // Re-add useTranslation
import { useRouter, usePathname } from 'next/navigation'; // Import for language switching

const Header: React.FC = () => {
  const { t, i18n } = useTranslation('common'); // Specify namespace if needed
  const router = useRouter();
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState("nord");

  useEffect(() => {
    // On mount, try to load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && (savedTheme === "nord" || savedTheme === "synthwave")) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setCurrentTheme(savedTheme);
    } else {
      // If no saved theme, or invalid, set default (nord)
      document.documentElement.setAttribute("data-theme", "nord");
      setCurrentTheme("nord");
      localStorage.setItem("theme", "nord"); // Also save default to localStorage
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === "nord" ? "synthwave" : "nord";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save preference
    setCurrentTheme(newTheme);
  };

  const changeLanguage = (newLocale: string) => {
    // This assumes current path is like /en/some-page or /some-page
    // If path is /en/some-page, replace /en with /newLocale
    // If path is /some-page, prepend /newLocale
    // This logic might need adjustment based on actual routing structure
    const currentLang = i18n.language;
    let newPath = pathname;

    if (pathname.startsWith(`/${currentLang}/`)) {
      newPath = pathname.replace(`/${currentLang}/`, `/${newLocale}/`);
    } else if (pathname === `/${currentLang}`) { // handles root path like /en
      newPath = `/${newLocale}`;
    } else if (pathname === "/") { // handles root path for default locale
        // This case is tricky if defaultLocale is not prefixed.
        // Assuming next.config.js i18n redirects / to /defaultLocale
        newPath = `/${newLocale}`;
    } else { // For paths without lang prefix, prepend newLocale
        newPath = `/${newLocale}${pathname}`;
    }
    // i18n.changeLanguage(newLocale); // This updates i18next instance, router.push handles route
    router.push(newPath);
  };

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{t("myApp")}</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost" onClick={toggleTheme}>
          {t("toggleTheme", { theme: currentTheme })}
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            {t(i18n.language)} 
          </label>
          <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            <li><a onClick={() => changeLanguage("pt")}>{t("portuguese")}</a></li>
            <li><a onClick={() => changeLanguage("en")}>{t("english")}</a></li>
            <li><a onClick={() => changeLanguage("de")}>{t("german")}</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

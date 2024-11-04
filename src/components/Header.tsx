// src/components/Header.tsx
import React, { useContext } from "react";
import { MyContext } from "@/app/layout";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { message, setMessage } = useContext(MyContext);
  const { t, i18n } = useTranslation();

  const toggleTheme = () => {
    // Implementar lógica de tema
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{t("myApp")}</a>
      </div>
      <div className="flex-none">{/* ... resto do código ... */}</div>
    </header>
  );
};

export default Header;

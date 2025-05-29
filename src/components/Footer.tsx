"use client"; // Footer is likely a client component if using hooks
import React from "react";
import { useTranslation } from 'next-i18next'; // Re-add useTranslation

const Footer = () => {
  const { t } = useTranslation('common'); // Specify namespace if needed
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">{t("footer.services")}</span>
        <a className="link link-hover">{t("footer.branding")}</a>
        <a className="link link-hover">{t("footer.design")}</a>
        <a className="link link-hover">{t("footer.marketing")}</a>
        <a className="link link-hover">{t("footer.advertisement")}</a>
      </div>
      <div>
        <span className="footer-title">{t("footer.company")}</span>
        <a className="link link-hover">{t("footer.about_us")}</a>
        <a className="link link-hover">{t("footer.contact")}</a>
        <a className="link link-hover">{t("footer.jobs")}</a>
        <a className="link link-hover">{t("footer.press_kit")}</a>
      </div>
      <div>
        <span className="footer-title">{t("footer.legal")}</span>
        <a className="link link-hover">{t("footer.terms_of_use")}</a>
        <a className="link link-hover">{t("footer.privacy_policy")}</a>
        <a className="link link-hover">{t("footer.cookie_policy")}</a>
      </div>
    </footer>
  );
};

export default Footer;

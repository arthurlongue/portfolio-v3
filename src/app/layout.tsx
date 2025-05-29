// src/layouts/layout.tsx
import "../app/globals.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Metadata } from "next";
import React, { ReactNode } from "react";
// import { useTranslation } from "next-i18next"; // Cannot use in Server Component
import nextI18NextConfig from "../../next-i18next.config.js"; // Import the config to get defaultLocale
import I18nClientProvider from "../components/I18nClientProvider"; // Import the client provider

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcasing my projects and skills.",
};

// Layout is a Server Component. Using simplified inline prop types.
export default function RootLayout({
  children,
}: {
  children: ReactNode;
  // params prop removed
}) {
  // lang is set using defaultLocale as params are not used.
  const lang = nextI18NextConfig.i18n.defaultLocale;

  return (
    <html lang={lang}> 
      <body className="flex-col justify-center">
        <I18nClientProvider>
          <Header />
          <Hero />
          <main>{children}</main>
          <Footer />
        </I18nClientProvider>
      </body>
    </html>
  );
}

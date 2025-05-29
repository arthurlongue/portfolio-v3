// src/components/Hero.tsx
"use client";

import React from "react";
import { useTranslation } from 'next-i18next'; // Re-add useTranslation

const Hero = () => {
  const { t } = useTranslation('common'); // Specify namespace if needed

  return (
    <section className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{t("welcome")}</h1>
          <p className="py-6">{t("description")}</p>
          <button className="btn btn-primary">{t("learn_more")}</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

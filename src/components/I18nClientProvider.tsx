"use client";

import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n/client'; // Path to your client i18n instance

interface I18nClientProviderProps {
  children: ReactNode;
}

export default function I18nClientProvider({ children }: I18nClientProviderProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

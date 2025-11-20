"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="hidden md:flex items-center gap-2 text-md font-semibold text-white hover:text-white/80 transition-colors duration-200 px-4 py-2 rounded-full"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      {t.languageSwitcher}
    </button>
  );
}
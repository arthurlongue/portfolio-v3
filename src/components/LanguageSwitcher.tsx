"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale = pathname.split('/')[1] || 'en';

  const switchLanguage = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          disabled={isPending}
          className={`
            px-2 py-1 text-xs rounded transition-colors duration-200
            ${currentLocale === lang.code 
              ? 'bg-primary text-white' 
              : 'text-secondary hover:text-primary hover:bg-gray-200'
            }
            ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          title={lang.name}
        >
          <span className="text-sm">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
};
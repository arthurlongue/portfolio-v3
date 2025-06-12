"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale = pathname.split("/")[1] || "en";

  const switchLanguage = (locale: string) => {
    const segments = pathname.split("/");
    // Ensure the first segment is always empty (due to leading slash)
    // Replace the locale segment with the new locale
    if (segments.length > 1 && ["en", "pt", "de"].includes(segments[1])) {
      segments[1] = locale;
    } else {
      // If no locale present, insert it
      segments.splice(1, 0, locale);
    }
    // Remove any duplicate locale segments
    const filteredSegments = [
      segments[0],
      segments[1],
      ...segments.slice(2).filter((seg) => !["en", "pt", "de"].includes(seg)),
    ];
    const newPath = filteredSegments.join("/") || "/";
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
            ${
              currentLocale === lang.code
                ? "bg-primary text-white"
                : "text-secondary hover:text-primary hover:bg-gray-200"
            }
            ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          title={lang.name}
        >
          <span className="text-sm">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
};

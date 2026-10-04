'use client';

import { useLocale, type Locale } from './locale';

const OPTIONS: { id: Locale; label: string }[] = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'English' },
];

export default function LanguageToggle({ center = false }: { center?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`flex ${center ? 'justify-center' : 'justify-end'} mb-4`}>
      <div
        className="inline-flex rounded-full border border-[#E8E0D8] bg-white p-0.5 shadow-sm"
        role="group"
        aria-label="Language / 语言"
      >
        {OPTIONS.map(option => (
          <button
            key={option.id}
            onClick={() => setLocale(option.id)}
            aria-pressed={locale === option.id}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150
              ${locale === option.id
                ? 'bg-[#2D2D2D] text-white'
                : 'text-[#888] hover:text-[#2D2D2D]'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

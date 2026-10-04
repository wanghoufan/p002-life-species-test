'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsModal from '@/components/StatsModal';
import { useLocale } from '@/i18n/locale';
import { UI } from '@/i18n/ui';
import LanguageToggle from '@/i18n/LanguageToggle';

const FEATURE_ICONS = ['🎯', '🦊', ''];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { locale, ready } = useLocale();

  useEffect(() => setMounted(true), []);

  if (!mounted || !ready) return null;

  const t = UI[locale].home;
  const stats = UI[locale].stats;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 max-w-[480px] mx-auto">
        <LanguageToggle />

        {/* Hero */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🐾</div>
          <h1 className="text-3xl font-black text-[#2D2D2D] tracking-tight mb-2">
            {t.title}
          </h1>
          <p className="text-base text-[#666] leading-relaxed">
            {t.subtitleLine1}
            <br />
            {t.subtitleLine2}
          </p>
        </div>

        {/* 可爱的介绍词 */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-[#E8E0D8] w-full">
          <p className="text-sm text-[#555] leading-relaxed text-center">
            {t.intro}
            <span className="block mt-1 text-xs text-[#999]">{t.introFoot}</span>
          </p>
        </div>

        {/* Feature cards */}
        <div className="w-full space-y-3 mb-8">
          {t.features.map((feature, i) => (
            <div key={feature.title} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E0D8]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{FEATURE_ICONS[i]}</span>
                <div>
                  <p className="font-semibold text-sm text-[#2D2D2D]">{feature.title}</p>
                  <p className="text-xs text-[#888]">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/test"
          className="w-full bg-[#2D2D2D] text-white text-center py-4 rounded-2xl font-bold text-lg
                     active:scale-[0.98] transition-transform duration-150 shadow-md"
        >
          {t.startTest}
        </Link>

        {/* Stats button */}
        <button
          onClick={() => setShowStats(true)}
          className="w-full mt-5 bg-white rounded-2xl p-4 shadow-sm border border-[#E8E0D8] 
                     active:scale-[0.98] transition-transform duration-150 hover:border-[#ccc]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div className="text-left">
              <p className="font-semibold text-sm text-[#2D2D2D]">{stats.title}</p>
              <p className="text-xs text-[#888]">{stats.desc}</p>
            </div>
          </div>
        </button>

        <p className="text-xs text-[#999] mt-4 text-center">
          {t.meta}
        </p>
      </div>

      <StatsModal open={showStats} onClose={() => setShowStats(false)} />
    </>
  );
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/i18n/locale';
import { UI, fmt } from '@/i18n/ui';
import { QUESTIONS } from '@/i18n/questions';
import { buildPreviewResult } from '@/lib/client-preview';
import LanguageToggle from '@/i18n/LanguageToggle';

export default function TestPage() {
  const router = useRouter();
  const { locale, ready } = useLocale();
  const t = UI[locale];
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('life_species_test');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentQ(parsed.currentQ || 0);
      } catch {}
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('life_species_test', JSON.stringify({ answers, currentQ }));
    }
  }, [answers, currentQ, mounted]);

  // Scroll to top when question changes
  useEffect(() => {
    questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentQ]);

  const handleSelect = useCallback((optionIndex: number) => {
    const q = QUESTIONS[currentQ];
    setError('');

    if (q.multi) {
      setAnswers(prev => {
        const current = prev[q.q] || [];
        if (current.includes(optionIndex)) {
          return { ...prev, [q.q]: current.filter(i => i !== optionIndex) };
        }
        if (current.length >= (q.maxSelect || 5)) {
          return prev;
        }
        return { ...prev, [q.q]: [...current, optionIndex] };
      });
    } else {
      setAnswers(prev => ({ ...prev, [q.q]: [optionIndex] }));
      // Auto advance for single choice
      setTimeout(() => {
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ(prev => prev + 1);
        }
      }, 300);
    }
  }, [currentQ]);

  const handleNext = useCallback(() => {
    const q = QUESTIONS[currentQ];
    const ans = answers[q.q];
    if (!ans || ans.length === 0) {
      setError(t.test.errPickOne);
      return;
    }
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, answers, t]);

  const handlePrev = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
    }
  }, [currentQ]);

  const handleJump = useCallback((qIndex: number) => {
    setCurrentQ(qIndex);
    setError('');
  }, []);

  const handleSubmit = useCallback(async () => {
    const missed = QUESTIONS.filter(q => !answers[q.q] || answers[q.q].length === 0);
    if (missed.length > 0) {
      const missedNums = missed.map(q => q.q);
      setError(fmt(t.test.errMissed, { list: missedNums.join(', ') }));
      return;
    }

    setLoading(true);
    setError('');

    // Format answers
    const formattedAnswers = QUESTIONS.map(q => ({
      q: q.q,
      options: answers[q.q],
    }));

    try {
      // Start a new run
      const startRes = await fetch('/api/runs/start', { method: 'POST' });
      const startData = await startRes.json();

      if (!startRes.ok) {
        throw new Error(startData.error || 'Failed to start test');
      }

      // Complete the run
      const completeRes = await fetch(`/api/runs/${startData.runId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          runToken: startData.runToken,
          answers: formattedAnswers,
        }),
      });

      const completeData = await completeRes.json();

      if (!completeRes.ok) {
        throw new Error(completeData.error || 'Failed to complete test');
      }

      // Clear saved progress
      localStorage.removeItem('life_species_test');

      // Navigate to result
      router.push(`/r/${completeData.shareCode}`);
    } catch {
      // 数据库没接入时退回本机通道：结果照样能看、能存图，只是不落库、没有永久链接
      try {
        const previewRes = await fetch('/api/runs/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: formattedAnswers }),
        });
        if (!previewRes.ok) throw new Error('preview failed');
        sessionStorage.setItem('life_species_preview', JSON.stringify(await previewRes.json()));
      } catch {
        // GitHub Pages 静态镜像没有 API 路由：在浏览器本机跑同一评分器出结果
        try {
          const localResult = await buildPreviewResult(formattedAnswers);
          sessionStorage.setItem('life_species_preview', JSON.stringify(localResult));
        } catch {
          setError(t.test.errSubmit);
          setLoading(false);
          return;
        }
      }
      localStorage.removeItem('life_species_test');
      router.push('/r/preview');
    } finally {
      setLoading(false);
    }
  }, [answers, router, t]);

  if (!mounted || !ready) return null;

  const q = QUESTIONS[currentQ];
  const options = q.options[locale];
  const selected = answers[q.q] || [];
  const missedQuestions = QUESTIONS.filter(qq => !answers[qq.q] || answers[qq.q].length === 0);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-[480px] mx-auto px-5 py-6">
      <LanguageToggle />

      {/* Dot progress indicator */}
      <div className="mb-6" ref={questionRef}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#888] font-medium">
            {currentQ + 1} / {QUESTIONS.length}
          </span>
          {missedQuestions.length > 0 && (
            <span className="text-xs text-red-500 font-medium">
              {fmt(t.test.missedBadge, { n: missedQuestions.length })}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {QUESTIONS.map((qq, idx) => {
            const isAnswered = answers[qq.q] && answers[qq.q].length > 0;
            const isCurrent = idx === currentQ;
            const isMissed = !isAnswered;

            return (
              <button
                key={qq.q}
                onClick={() => handleJump(idx)}
                className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center
                  transition-all duration-150
                  ${isCurrent
                    ? 'ring-2 ring-offset-1 ring-[#2D2D2D] scale-110'
                    : ''
                  }
                  ${isAnswered
                    ? isCurrent
                      ? 'bg-[#2D2D2D] text-white'
                      : 'bg-[#2D2D2D] text-white opacity-60 hover:opacity-100'
                    : isCurrent
                      ? 'bg-red-500 text-white'
                      : 'bg-red-300 text-white hover:bg-red-500'
                  }
                `}
                title={isMissed ? fmt(t.test.dotTitleMissed, { n: qq.q }) : fmt(t.test.dotTitle, { n: qq.q })}
              >
                {qq.q}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center" key={currentQ}>
        <div className="animate-[fadeInUp_0.3s_ease-out]">
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-6 leading-relaxed">
            {q.text[locale]}
          </h2>

          <div className="space-y-2.5">
            {options.map((opt, idx) => {
              const isSelected = selected.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 text-sm leading-relaxed
                    ${isSelected
                      ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white font-medium'
                      : 'border-[#E8E0D8] bg-white text-[#333] hover:border-[#ccc]'
                    }
                    active:scale-[0.98]`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected
                        ? 'border-white bg-white'
                        : 'border-[#ccc]'
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2D2D2D]" />
                      )}
                    </span>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-4 space-y-2">
        {error && (
          <p className="text-red-500 text-xs text-center leading-relaxed">{error}</p>
        )}

        <div className="flex gap-3">
          {currentQ > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3.5 rounded-2xl border-2 border-[#E8E0D8] bg-white text-[#333] font-medium text-sm
                         active:scale-[0.98] transition-transform duration-150"
            >
              {t.test.prev}
            </button>
          )}

          {currentQ < QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!selected.length}
              className={`flex-1 py-3.5 rounded-2xl font-medium text-sm active:scale-[0.98] transition-all duration-150
                ${selected.length
                  ? 'bg-[#2D2D2D] text-white'
                  : 'bg-[#E8E0D8] text-[#999]'
                }`}
            >
              {t.test.next}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !selected.length}
              className={`flex-1 py-3.5 rounded-2xl font-bold text-sm active:scale-[0.98] transition-all duration-150
                ${loading
                  ? 'bg-[#666] text-white'
                  : 'bg-[#2D2D2D] text-white'
                }`}
            >
              {loading ? t.test.submitting : t.test.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

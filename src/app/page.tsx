'use client';

// ============================================================
// PF Claim Decoder — Landing Page
// ============================================================

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { DEMO_SCENARIOS } from '@/lib/demoScenarios';
import { TAXONOMY } from '@/lib/taxonomy';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function HomePage() {
  const { language, loadScenario, setActiveStep } = useClaim();
  const t = getTranslation(language);
  const router = useRouter();

  const handleTryDemo = (scenarioId: string) => {
    loadScenario(scenarioId);
    setActiveStep(2);
    router.push('/decode');
  };

  const handleStartCustom = () => {
    setActiveStep(1);
    router.push('/input');
  };

  return (
    <div className="flex-1 flex flex-col py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto w-full space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {language === 'hi' ? 'नागरिक सहायता प्रोटोटाइप' : 'Grounded Citizen Assistance Engine'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 max-w-3xl mx-auto leading-tight">
            {t.appName}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleTryDemo('demo-1')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t.tryDemoBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleStartCustom}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-900 dark:text-slate-100 font-bold text-sm sm:text-base border border-slate-200 dark:border-zinc-700 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{t.pasteRemarkBtn}</span>
            </button>
          </div>

          <div className="max-w-xl mx-auto pt-2">
            <SafetyNotice variant="card" />
          </div>
        </section>

        {/* Quick Demo Scenarios Selector */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'hi' ? 'त्वरित डेमो परिदृश्य' : 'Instant Synthetic Demo Scenarios'}
            </h2>
            <span className="text-xs text-slate-500">
              {DEMO_SCENARIOS.length} scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_SCENARIOS.slice(0, 6).map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleTryDemo(scenario.id)}
                className="p-4 rounded-xl text-left bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                      {scenario.claimReference}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {scenario.claimantName}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {language === 'hi' ? scenario.labelHi : scenario.label}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic">
                    &ldquo;{language === 'hi' ? scenario.remarkHi : scenario.remark}&rdquo;
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <span>{language === 'hi' ? 'विश्लेषण देखें' : 'Run Decoder'}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t.howItWorksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {language === 'hi'
                ? 'चार सरल चरणों में अस्पष्टता से स्पष्टता और आधिकारिक कार्रवाई तक का सफर'
                : 'From opaque status remarks to structured facts, evidentiary checklists, and official filings in four clean steps'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {t.step1}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t.step1Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {t.step2}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t.step2Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {t.step3}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t.step3Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {t.step4}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t.step4Desc}
              </p>
            </div>
          </div>
        </section>

        {/* 12 Static Taxonomy Categories */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'hi' ? '12 नियत श्रेणी वर्गीकरण' : '12 Deterministic EPFO Problem Categories'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'नियत वर्गीकरण — AI को नई श्रेणियां बनाने या नैदानिक निष्कर्ष बदलने की अनुमति नहीं है'
                : 'Static & grounded taxonomy. AI cannot create arbitrary categories or hallucinate reasons.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TAXONOMY.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs space-y-1"
              >
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                  <span>{idx + 1}.</span>
                  <span>{cat.id}</span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {language === 'hi' ? cat.labelHi : cat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

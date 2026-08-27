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
    <div className="flex-1 flex flex-col py-12 sm:py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            {language === 'hi' ? 'नागरिक सहायता प्रोटोटाइप' : 'Grounded Citizen Assistance Engine'}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-300 max-w-4xl mx-auto leading-tight pb-2">
            {t.appName}
          </h1>

          <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            {t.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => handleTryDemo('demo-1')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base sm:text-lg shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t.tryDemoBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleStartCustom}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base sm:text-lg border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{t.pasteRemarkBtn}</span>
            </button>
          </div>

          <div className="max-w-2xl mx-auto pt-6">
            <SafetyNotice variant="card" />
          </div>
        </section>

        {/* Quick Demo Scenarios Selector */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {language === 'hi' ? 'त्वरित डेमो परिदृश्य' : 'Instant Synthetic Demo Scenarios'}
            </h2>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {DEMO_SCENARIOS.length} scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {DEMO_SCENARIOS.slice(0, 6).map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleTryDemo(scenario.id)}
                className="p-6 rounded-2xl text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover-card-trigger group flex flex-col justify-between h-full focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-md">
                      {scenario.claimReference}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {scenario.claimantName}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 leading-snug">
                    {language === 'hi' ? scenario.labelHi : scenario.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 italic leading-relaxed">
                    &ldquo;{language === 'hi' ? scenario.remarkHi : scenario.remark}&rdquo;
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-indigo-600 dark:text-indigo-400 font-bold">
                  <span>{language === 'hi' ? 'विश्लेषण देखें' : 'Run Decoder'}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="rounded-2xl p-8 sm:p-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              {t.howItWorksTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              {language === 'hi'
                ? 'चार सरल चरणों में अस्पष्टता से स्पष्टता और आधिकारिक कार्रवाई तक का सफर'
                : 'From opaque status remarks to structured facts, evidentiary checklists, and official filings in four clean steps'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 hover-card-trigger shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                1
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {t.step1}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 hover-card-trigger shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                2
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {t.step2}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 hover-card-trigger shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                3
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {t.step3}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 hover-card-trigger shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                4
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {t.step4}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.step4Desc}
              </p>
            </div>
          </div>
        </section>

        {/* 12 Static Taxonomy Categories */}
        <section className="space-y-6">
          <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {language === 'hi' ? '12 नियत श्रेणी वर्गीकरण' : '12 Deterministic EPFO Problem Categories'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {language === 'hi'
                ? 'नियत वर्गीकरण — AI को नई श्रेणियां बनाने या नैदानिक निष्कर्ष बदलने की अनुमति नहीं है'
                : 'Static & grounded taxonomy. AI cannot create arbitrary categories or hallucinate reasons.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-stagger">
            {TAXONOMY.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2 shadow-sm hover-card-trigger"
              >
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <span className="bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">{idx + 1}</span>
                  <span className="truncate">{cat.id}</span>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight">
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

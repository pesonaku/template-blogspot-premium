import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, Shield } from 'lucide-react';

export default function HeroSkeleton() {
  const bloggerSettings = window.BloggerSettings || {};
  const heroBadge = bloggerSettings.heroBadge || 'KERANGKA TATA LETAK PREMIUM';
  const heroTitle = bloggerSettings.heroTitle || 'Kerangka Landing Page Blogspot Premium';
  const heroSubtitle = bloggerSettings.heroSubtitle || 'Struktur dinamis siap dikustomisasi langsung melalui panel Tata Letak Blogger dan divalidasi oleh sistem lisensi domain.';
  const primaryCta = bloggerSettings.heroPrimaryCta || 'Kustomisasi di Tata Letak';
  const secondaryCta = bloggerSettings.heroSecondaryCta || 'Pelajari Dokumentasi';

  return (
    <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{heroBadge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-normal">
            {heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#tata-letak"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/25 text-sm"
            >
              <Sliders className="w-4 h-4" />
              <span>{primaryCta}</span>
            </a>
            <a
              href="https://github.com/pesonaku/template-blogspot-premium"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-semibold px-7 py-3.5 rounded-xl transition duration-200 text-sm"
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <span>{secondaryCta}</span>
            </a>
          </div>

          {/* Feature Highlights Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/60 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Domain Locked</p>
                <p className="text-slate-500">Lisensi aman per host</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Blogger Layout</p>
                <p className="text-slate-500">Edit via menu tata letak</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">GitHub CDN</p>
                <p className="text-slate-500">High speed distribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

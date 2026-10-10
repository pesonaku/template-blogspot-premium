import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

export default function FooterSkeleton() {
  const bloggerSettings = window.BloggerSettings || {};
  const brandName = bloggerSettings.brandName || 'PREMIUM THEME';
  const copyrightText = bloggerSettings.copyrightText || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">{brandName}</span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-left">
            {copyrightText}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Domain Protected Template</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

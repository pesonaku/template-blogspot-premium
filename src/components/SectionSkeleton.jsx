import React from 'react';
import { LayoutGrid, Cpu, SlidersHorizontal, Check } from 'lucide-react';

export default function SectionSkeleton() {
  const bloggerSettings = window.BloggerSettings || {};
  const sectionTitle = bloggerSettings.featuresTitle || 'Modul & Kerangka Section';
  const sectionSubtitle = bloggerSettings.featuresSubtitle || 'Bagian ini siap menerima komponen dan data dinamis dari widget Blogspot.';

  return (
    <section id="fitur" className="py-20 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Arsitektur Landing Page</span>
          <h2 className="text-3xl font-bold text-white mt-2 tracking-tight">{sectionTitle}</h2>
          <p className="text-slate-400 text-sm mt-3">{sectionSubtitle}</p>
        </div>

        {/* 3 Grid Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl relative group hover:border-indigo-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Slot Komponen #1</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Area placeholder untuk konten sesi utama yang dapat dikontrol dari widget Blogger XML.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-slate-500">
              <span className="font-mono text-indigo-400">Section Slot: 01</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl relative group hover:border-indigo-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Slot Komponen #2</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Area penataan konfigurasi parameter dan atribut visual landing page.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-slate-500">
              <span className="font-mono text-indigo-400">Section Slot: 02</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl relative group hover:border-indigo-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Slot Komponen #3</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Struktur modular responsif siap menerima instruksi desain lanjutan.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-slate-500">
              <span className="font-mono text-indigo-400">Section Slot: 03</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

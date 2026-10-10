import React, { useState } from 'react';
import { Layers, ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bloggerSettings = window.BloggerSettings || {};
  const brandName = bloggerSettings.brandName || 'PREMIUM THEME';
  const ctaText = bloggerSettings.navCtaText || 'Mulai Sekarang';
  const ctaUrl = bloggerSettings.navCtaUrl || '#get-started';

  // Fallback default links jika belum diatur di menu Tata Letak
  const defaultNavLinks = [
    { title: 'Beranda', url: '#hero' },
    { title: 'Fitur', url: '#fitur' },
    { title: 'Tata Letak', url: '#tata-letak' },
    { title: 'Bantuan', url: '#faq' },
  ];

  const navLinks = (bloggerSettings.navLinks && bloggerSettings.navLinks.length > 0)
    ? bloggerSettings.navLinks
    : defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
                {brandName}
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <ShieldCheck className="w-3 h-3" /> Licensed
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Blogspot Powered</span>
            </div>
          </div>

          {/* Navigation Links Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className="hover:text-indigo-400 transition-colors"
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={ctaUrl}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm shadow-white/10 hover:shadow-md"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 space-y-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                {link.title}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800/60 sm:hidden">
              <a
                href={ctaUrl}
                className="flex items-center justify-center gap-2 text-sm font-semibold bg-white text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition duration-200"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-slate-700" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

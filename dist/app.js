/**
 * Template Blogspot Premium - Core Runtime Bundle (v1.0.2)
 * Repository: https://github.com/pesonaku/template-blogspot-premium
 * Build target: dist/app.js
 */
(function() {
  'use strict';

  // Helper untuk parsing konfigurasi format JSON atau Baris "Key: Value"
  function parseConfig(rawText) {
    if (!rawText || typeof rawText !== 'string') return {};
    var trimmed = rawText.trim();
    if (!trimmed) return {};

    // 1. Coba parse JSON
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        return JSON.parse(trimmed);
      } catch (e) {}
    }

    // 2. Parse format baris "key: value"
    var config = {};
    var lines = trimmed.split('\n');
    lines.forEach(function(line) {
      var trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('//')) return;
      var colonIdx = trimmedLine.indexOf(':');
      if (colonIdx > -1) {
        var key = trimmedLine.substring(0, colonIdx).trim();
        var val = trimmedLine.substring(colonIdx + 1).trim();
        if (key && val) {
          config[key] = val;
        }
      }
    });
    return config;
  }

  // Ekstraksi data pengaturan dari DOM Blogger jika belum diset di window.BloggerSettings
  function extractSettingsFromDOM() {
    window.BloggerSettings = window.BloggerSettings || {};
    var settings = window.BloggerSettings;

    // 1. Ekstrak Menu Navigasi dari LinkList (#nav-links-container)
    var navLinksEl = document.querySelectorAll('#nav-links-container li a, #nav-links-container a');
    if (navLinksEl && navLinksEl.length > 0) {
      var links = [];
      navLinksEl.forEach(function(el) {
        var title = el.textContent ? el.textContent.trim() : '';
        var url = el.getAttribute('href') || '#';
        if (title) {
          links.push({ title: title, url: url });
        }
      });
      if (links.length > 0) {
        settings.navLinks = links;
      }
    }

    // 2. Ekstrak Brand & CTA (#widget-brand-data)
    var brandEl = document.getElementById('widget-brand-data');
    if (brandEl && brandEl.textContent) {
      var brandConf = parseConfig(brandEl.textContent);
      if (brandConf.brandName) settings.brandName = brandConf.brandName;
      if (brandConf.navCtaText) settings.navCtaText = brandConf.navCtaText;
      if (brandConf.navCtaUrl) settings.navCtaUrl = brandConf.navCtaUrl;
    }

    // 3. Ekstrak Lisensi (#widget-license-data)
    var licEl = document.getElementById('widget-license-data');
    if (licEl && licEl.textContent) {
      var licRaw = licEl.textContent.trim();
      var licConf = parseConfig(licRaw);
      if (licConf.licenseKey) {
        settings.licenseKey = licConf.licenseKey;
        if (licConf.licenseApiUrl) settings.licenseApiUrl = licConf.licenseApiUrl;
      } else if (licRaw) {
        settings.licenseKey = licRaw;
      }
    }

    // 4. Ekstrak Hero Section (#widget-hero-data)
    var heroEl = document.getElementById('widget-hero-data');
    if (heroEl && heroEl.textContent) {
      var heroConf = parseConfig(heroEl.textContent);
      if (heroConf.heroBadge) settings.heroBadge = heroConf.heroBadge;
      if (heroConf.heroTitle) settings.heroTitle = heroConf.heroTitle;
      if (heroConf.heroSubtitle) settings.heroSubtitle = heroConf.heroSubtitle;
      if (heroConf.heroPrimaryCta) settings.heroPrimaryCta = heroConf.heroPrimaryCta;
      if (heroConf.heroSecondaryCta) settings.heroSecondaryCta = heroConf.heroSecondaryCta;
    }

    // 5. Ekstrak Fitur Section (#widget-features-data)
    var featEl = document.getElementById('widget-features-data');
    if (featEl && featEl.textContent) {
      var featConf = parseConfig(featEl.textContent);
      if (featConf.featuresTitle) settings.featuresTitle = featConf.featuresTitle;
      if (featConf.featuresSubtitle) settings.featuresSubtitle = featConf.featuresSubtitle;
    }

    // 6. Ekstrak Footer Section (#widget-footer-data)
    var footerEl = document.getElementById('widget-footer-data');
    if (footerEl && footerEl.textContent) {
      var footerConf = parseConfig(footerEl.textContent);
      if (footerConf.copyrightText) settings.copyrightText = footerConf.copyrightText;
    }

    return settings;
  }

  function initLandingPage() {
    var root = document.getElementById('root');
    if (!root) {
      console.error('[Blogspot Premium] Root container #root tidak ditemukan.');
      return;
    }

    // Ambil pengaturan terbaru
    var settings = extractSettingsFromDOM();
    var domain = (window.location.hostname || '').toLowerCase();
    var licenseKey = (settings.licenseKey || '').trim();
    var apiUrl = (settings.licenseApiUrl || 'https://license.example.com/api/verify-license').trim();

    // Lingkungan Development / Preview Blogspot
    var isDev = domain === 'localhost' || 
                domain === '127.0.0.1' || 
                domain.indexOf('blogger.com') !== -1 ||
                domain.indexOf('blogspot.com') !== -1 ||
                domain === '';

    // Fungsi Render Tampilan Utama Landing Page
    function renderMainTemplate() {
      var brandName = settings.brandName || 'LANDING PRO';
      var navCtaText = settings.navCtaText || 'Mulai Sekarang';
      var navCtaUrl = settings.navCtaUrl || '#fitur';
      var heroBadge = settings.heroBadge || 'KERANGKA TATA LETAK PREMIUM';
      var heroTitle = settings.heroTitle || 'Kerangka Landing Page Blogspot Premium';
      var heroSubtitle = settings.heroSubtitle || 'Struktur dinamis siap dikustomisasi langsung melalui panel Tata Letak Blogger dan divalidasi oleh sistem lisensi domain.';
      var heroPrimaryCta = settings.heroPrimaryCta || 'Kustomisasi di Tata Letak';
      var heroSecondaryCta = settings.heroSecondaryCta || 'Dokumentasi GitHub';
      var featuresTitle = settings.featuresTitle || 'Modul & Kerangka Section';
      var featuresSubtitle = settings.featuresSubtitle || 'Bagian ini siap menerima komponen dan data dinamis dari widget Blogspot.';
      var copyrightText = settings.copyrightText || ('© ' + new Date().getFullYear() + ' ' + brandName + '. All rights reserved.');

      // Daftar tautan navigasi (Dinamis dari widget LinkList Blogger)
      var defaultNavLinks = [
        { title: 'Beranda', url: '#hero' },
        { title: 'Fitur', url: '#fitur' },
        { title: 'Tata Letak', url: '#tata-letak' },
        { title: 'Bantuan', url: '#faq' }
      ];
      var navLinks = (settings.navLinks && settings.navLinks.length > 0) ? settings.navLinks : defaultNavLinks;

      var navHtml = navLinks.map(function(item) {
        return '<a href="' + item.url + '" class="hover:text-indigo-400 transition-colors font-medium">' + item.title + '</a>';
      }).join('');

      var mobileNavHtml = navLinks.map(function(item) {
        return '<a href="' + item.url + '" class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors">' + item.title + '</a>';
      }).join('');

      root.innerHTML = `
        <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
          <!-- Navbar -->
          <header class="sticky top-0 z-50 glass-nav transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between" style="height: 70px;">
                <!-- Brand / Logo -->
                <div class="flex items-center gap-3">
                  <div class="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                      ${brandName}
                      <span class="text-[10px] uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">Licensed</span>
                    </span>
                    <span class="text-[11px] text-slate-400 font-medium">Blogspot Powered</span>
                  </div>
                </div>

                <!-- Desktop Nav Links -->
                <nav class="hidden md:flex items-center gap-8 text-sm text-slate-300">
                  ${navHtml}
                </nav>

                <!-- CTA Button & Mobile Toggle -->
                <div class="flex items-center gap-3">
                  <a href="${navCtaUrl}" class="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl transition shadow hover:shadow-md">
                    <span>${navCtaText}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>

                  <!-- Tombol Hamburger Mobile -->
                  <button id="mobile-menu-btn" type="button" class="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white" aria-label="Toggle Menu">
                    <svg id="hamburger-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    <svg id="close-icon" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              </div>

              <!-- Mobile Nav Drawer -->
              <div id="mobile-nav-panel" class="hidden md:hidden py-4 border-t border-slate-800/80 space-y-2">
                ${mobileNavHtml}
                <div class="pt-3 border-t border-slate-800/60 sm:hidden">
                  <a href="${navCtaUrl}" class="flex items-center justify-center gap-2 text-sm font-semibold bg-white text-slate-900 px-4 py-2.5 rounded-xl transition">
                    <span>${navCtaText}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>
            </div>
          </header>

          <!-- Hero Section -->
          <main class="flex-1">
            <section id="hero" class="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div class="max-w-3xl mx-auto">
                  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
                    <span>${heroBadge}</span>
                  </div>

                  <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                    ${heroTitle}
                  </h1>

                  <p class="text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-normal">
                    ${heroSubtitle}
                  </p>

                  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <a href="#fitur" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/25 text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line></svg>
                      <span>${heroPrimaryCta}</span>
                    </a>
                    <a href="https://github.com/pesonaku/template-blogspot-premium" target="_blank" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition text-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      <span>${heroSecondaryCta}</span>
                    </a>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
                    <div class="p-4 rounded-xl bg-slate-900/40 border border-slate-800/40 flex items-center gap-3">
                      <svg class="text-indigo-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      <div class="text-xs">
                        <p class="font-semibold text-slate-200">Domain Locked</p>
                        <p class="text-slate-500">Lisensi aman per host</p>
                      </div>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-900/40 border border-slate-800/40 flex items-center gap-3">
                      <svg class="text-indigo-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      <div class="text-xs">
                        <p class="font-semibold text-slate-200">Blogger Layout</p>
                        <p class="text-slate-500">Edit via menu tata letak</p>
                      </div>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-900/40 border border-slate-800/40 flex items-center gap-3">
                      <svg class="text-indigo-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      <div class="text-xs">
                        <p class="font-semibold text-slate-200">GitHub CDN</p>
                        <p class="text-slate-500">High speed distribution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Features Skeleton Section -->
            <section id="fitur" class="py-20 bg-slate-900/40 border-y border-slate-800">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400">Arsitektur Landing Page</span>
                <h2 class="text-3xl font-bold text-white mt-2 mb-3 tracking-tight">${featuresTitle}</h2>
                <p class="text-slate-400 text-sm max-w-2xl mx-auto mb-16">${featuresSubtitle}</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div class="glass-panel p-6 rounded-2xl group hover:border-indigo-500/40 transition">
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>
                    </div>
                    <h3 class="text-lg font-semibold text-white mb-2">Slot Komponen #1</h3>
                    <p class="text-xs text-slate-400 leading-relaxed">Area placeholder untuk konten sesi utama yang dapat dikontrol dari widget Blogger XML.</p>
                    <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-indigo-400 font-mono">
                      <span>Section Slot: 01</span>
                    </div>
                  </div>

                  <div class="glass-panel p-6 rounded-2xl group hover:border-indigo-500/40 transition">
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </div>
                    <h3 class="text-lg font-semibold text-white mb-2">Slot Komponen #2</h3>
                    <p class="text-xs text-slate-400 leading-relaxed">Area penataan konfigurasi parameter dan atribut visual landing page.</p>
                    <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-indigo-400 font-mono">
                      <span>Section Slot: 02</span>
                    </div>
                  </div>

                  <div class="glass-panel p-6 rounded-2xl group hover:border-indigo-500/40 transition">
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <h3 class="text-lg font-semibold text-white mb-2">Slot Komponen #3</h3>
                    <p class="text-xs text-slate-400 leading-relaxed">Struktur modular responsif siap menerima instruksi desain lanjutan.</p>
                    <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs text-indigo-400 font-mono">
                      <span>Section Slot: 03</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <!-- Footer -->
          <footer class="bg-slate-950 border-t border-slate-900 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-3">
                  <span class="font-bold text-white text-sm tracking-tight">${brandName}</span>
                </div>
                <p class="text-xs text-slate-500 text-center">${copyrightText}</p>
                <div class="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <span>Domain Protected Template</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      `;

      // Event listener tombol hamburger mobile
      var mobileBtn = document.getElementById('mobile-menu-btn');
      var mobilePanel = document.getElementById('mobile-nav-panel');
      var iconHam = document.getElementById('hamburger-icon');
      var iconClose = document.getElementById('close-icon');

      if (mobileBtn && mobilePanel) {
        mobileBtn.addEventListener('click', function() {
          var isClosed = mobilePanel.classList.contains('hidden');
          if (isClosed) {
            mobilePanel.classList.remove('hidden');
            if (iconHam) iconHam.classList.add('hidden');
            if (iconClose) iconClose.classList.remove('hidden');
          } else {
            mobilePanel.classList.add('hidden');
            if (iconHam) iconHam.classList.remove('hidden');
            if (iconClose) iconClose.classList.add('hidden');
          }
        });
      }
    }

    // Fungsi Render Tampilan Lisensi Invalid
    function renderLicenseInvalid(message) {
      root.innerHTML = `
        <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-slate-900 border border-red-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div class="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-6 text-red-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>

            <h2 class="text-2xl font-bold text-white mb-2 tracking-tight">Lisensi Tidak Valid</h2>
            <p class="text-sm text-slate-400 mb-6 leading-relaxed">${message || 'Domain ini belum terdaftar untuk lisensi yang digunakan.'}</p>

            <div class="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 mb-6">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-500">Domain</span>
                <span class="font-mono text-slate-300 font-semibold">${domain || 'Unknown'}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-500">License Key</span>
                <span class="font-mono text-slate-300">${licenseKey ? licenseKey.substring(0, 6) + '••••••••' : 'Belum diisi'}</span>
              </div>
            </div>

            <div class="space-y-3">
              <a href="https://github.com/pesonaku/template-blogspot-premium" target="_blank" class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                <span>Hubungi Dukungan / Beli Lisensi</span>
              </a>
              <p class="text-center text-xs text-slate-500">Ubah konfigurasi melalui Dashboard Blogger → Tata Letak.</p>
            </div>
          </div>
        </div>
      `;
    }

    // Pengecekan status lisensi
    if (!licenseKey) {
      if (isDev) {
        // Mode pratinjau / development di subdomain Blogspot
        renderMainTemplate();
        return;
      }
      renderLicenseInvalid('Kode lisensi belum dimasukkan di menu Tata Letak Blogspot.');
      return;
    }

    // Jika API masih default example.com atau belum terhubung server kustom
    if (apiUrl.indexOf('example.com') !== -1) {
      renderMainTemplate();
      return;
    }

    // Melakukan validasi resmi ke backend API Laravel
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        license_key: licenseKey,
        domain: domain
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && data.valid) {
        renderMainTemplate();
      } else {
        renderLicenseInvalid(data && data.message ? data.message : 'Lisensi ditolak oleh server.');
      }
    })
    .catch(function(err) {
      console.warn('[Blogspot Premium] Gagal verifikasi lisensi:', err);
      renderLicenseInvalid('Gagal menghubungi server validasi lisensi.');
    });
  }

  // Eksekusi segera jika DOM sudah ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingPage);
  } else {
    initLandingPage();
  }
})();

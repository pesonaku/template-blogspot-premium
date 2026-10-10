/**
 * Blogger Settings & Dynamic Data Parser
 * Membaca pengaturan dari widget Blogger (DOM / window) secara aman
 * Mendukung format Key-Value line dan JSON, serta Blogger LinkList native
 */

export function parseConfig(rawText) {
  if (!rawText || typeof rawText !== 'string') return {};
  const trimmed = rawText.trim();
  if (!trimmed) return {};

  // 1. Coba parse JSON jika diawali { atau [
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      console.warn('[BloggerSettings] Gagal mem-parse JSON, beralih ke parsing baris:', e);
    }
  }

  // 2. Parse format baris key: value (ramah pengguna awam)
  const config = {};
  const lines = trimmed.split('\n');
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('//')) return;
    const colonIdx = trimmedLine.indexOf(':');
    if (colonIdx > -1) {
      const key = trimmedLine.substring(0, colonIdx).trim();
      const val = trimmedLine.substring(colonIdx + 1).trim();
      if (key && val) {
        config[key] = val;
      }
    }
  });

  return config;
}

export function initBloggerSettings() {
  window.BloggerSettings = window.BloggerSettings || {};

  // Hostname / domain saat ini untuk verifikasi lisensi
  if (!window.BloggerSettings.domain) {
    window.BloggerSettings.domain = window.location.hostname;
  }

  // 1. Ekstrak Menu Navigasi dari widget LinkList Blogger (#nav-links-container)
  const navLinksEl = document.querySelectorAll('#nav-links-container li a, #nav-links-container a');
  if (navLinksEl && navLinksEl.length > 0) {
    const extractedLinks = [];
    navLinksEl.forEach((el) => {
      const title = el.textContent ? el.textContent.trim() : '';
      const url = el.getAttribute('href') || '#';
      if (title) {
        extractedLinks.push({ title, url });
      }
    });
    if (extractedLinks.length > 0) {
      window.BloggerSettings.navLinks = extractedLinks;
    }
  }

  // 2. Ekstrak Brand & CTA (#widget-brand-data)
  const brandEl = document.getElementById('widget-brand-data');
  if (brandEl && brandEl.textContent) {
    const brandConf = parseConfig(brandEl.textContent);
    if (brandConf.brandName) window.BloggerSettings.brandName = brandConf.brandName;
    if (brandConf.navCtaText) window.BloggerSettings.navCtaText = brandConf.navCtaText;
    if (brandConf.navCtaUrl) window.BloggerSettings.navCtaUrl = brandConf.navCtaUrl;
  }

  // 3. Ekstrak Lisensi (#widget-license-data)
  const licEl = document.getElementById('widget-license-data');
  if (licEl && licEl.textContent) {
    const licRaw = licEl.textContent.trim();
    const licConf = parseConfig(licRaw);
    if (licConf.licenseKey) {
      window.BloggerSettings.licenseKey = licConf.licenseKey;
      if (licConf.licenseApiUrl) window.BloggerSettings.licenseApiUrl = licConf.licenseApiUrl;
    } else if (licRaw) {
      // Jika pengguna hanya menempelkan kode lisensi polos
      window.BloggerSettings.licenseKey = licRaw;
    }
  }

  // 4. Ekstrak Hero Section (#widget-hero-data)
  const heroEl = document.getElementById('widget-hero-data');
  if (heroEl && heroEl.textContent) {
    const heroConf = parseConfig(heroEl.textContent);
    if (heroConf.heroBadge) window.BloggerSettings.heroBadge = heroConf.heroBadge;
    if (heroConf.heroTitle) window.BloggerSettings.heroTitle = heroConf.heroTitle;
    if (heroConf.heroSubtitle) window.BloggerSettings.heroSubtitle = heroConf.heroSubtitle;
    if (heroConf.heroPrimaryCta) window.BloggerSettings.heroPrimaryCta = heroConf.heroPrimaryCta;
    if (heroConf.heroSecondaryCta) window.BloggerSettings.heroSecondaryCta = heroConf.heroSecondaryCta;
  }

  // 5. Ekstrak Fitur Section (#widget-features-data)
  const featEl = document.getElementById('widget-features-data');
  if (featEl && featEl.textContent) {
    const featConf = parseConfig(featEl.textContent);
    if (featConf.featuresTitle) window.BloggerSettings.featuresTitle = featConf.featuresTitle;
    if (featConf.featuresSubtitle) window.BloggerSettings.featuresSubtitle = featConf.featuresSubtitle;
  }

  // 6. Ekstrak Footer Section (#widget-footer-data)
  const footerEl = document.getElementById('widget-footer-data');
  if (footerEl && footerEl.textContent) {
    const footerConf = parseConfig(footerEl.textContent);
    if (footerConf.copyrightText) window.BloggerSettings.copyrightText = footerConf.copyrightText;
  }

  return window.BloggerSettings;
}

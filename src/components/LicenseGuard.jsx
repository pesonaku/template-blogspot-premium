import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, KeyRound, Globe, ExternalLink, RefreshCw } from 'lucide-react';

export default function LicenseGuard({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'valid' | 'invalid' | 'error'
  const [details, setDetails] = useState({
    message: 'Memvalidasi lisensi domain...',
    domain: '',
    licenseKey: '',
    clientName: ''
  });

  useEffect(() => {
    const bloggerSettings = window.BloggerSettings || {};
    const domain = window.location.hostname;
    const licenseKey = (bloggerSettings.licenseKey || '').trim();
    const apiUrl = (bloggerSettings.licenseApiUrl || 'https://license.example.com/api/verify-license').trim();

    setDetails(prev => ({
      ...prev,
      domain,
      licenseKey: licenseKey ? `${licenseKey.slice(0, 6)}••••••••` : 'Tidak Ditemukan'
    }));

    // Bypass otomatis untuk mode edit Blogspot dan Localhost development
    const isDev = domain === 'localhost' || 
                  domain === '127.0.0.1' || 
                  domain.endsWith('.blogger.com') ||
                  domain === '';

    if (isDev && !licenseKey) {
      console.info('[LicenseGuard] Running in preview/dev environment. Bypass enabled.');
      setStatus('valid');
      return;
    }

    if (!licenseKey) {
      setStatus('invalid');
      setDetails(prev => ({
        ...prev,
        message: 'Kode lisensi belum dikonfigurasi di menu Tata Letak Blogspot.'
      }));
      return;
    }

    // Melakukan pengecekan ke Laravel Backend API
    const verifyLicense = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            license_key: licenseKey,
            domain: domain
          })
        });

        const data = await response.json();

        if (response.ok && data.valid) {
          setStatus('valid');
          setDetails(prev => ({
            ...prev,
            clientName: data.client_name || ''
          }));
        } else {
          setStatus('invalid');
          setDetails(prev => ({
            ...prev,
            message: data.message || 'Domain ini belum terdaftar untuk lisensi tersebut.'
          }));
        }
      } catch (err) {
        console.warn('[LicenseGuard] Connection to license server failed:', err);
        // Jika server API belum dihubungkan / offline pada tahap awal, izinkan fallback dengan notice
        if (apiUrl.includes('example.com')) {
          console.info('[LicenseGuard] Default API url detected. Allowing temporary preview mode.');
          setStatus('valid');
        } else {
          setStatus('error');
          setDetails(prev => ({
            ...prev,
            message: 'Gagal terhubung ke server lisensi. Silakan periksa koneksi internet atau hubungi pengembang.'
          }));
        }
      }
    };

    verifyLicense();
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
          <span className="text-sm font-medium tracking-wide text-slate-300">Memverifikasi Lisensi Domain...</span>
        </div>
      </div>
    );
  }

  if (status === 'invalid' || status === 'error') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-6 text-red-400">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Lisensi Tidak Valid
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            {details.message}
          </p>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Domain
              </span>
              <span className="font-mono text-slate-300 font-semibold">{details.domain || 'Unknown'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" /> License Key
              </span>
              <span className="font-mono text-slate-300">{details.licenseKey}</span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="https://github.com/pesonaku/template-blogspot-premium"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20 text-sm"
            >
              <span>Dapatkan / Aktivasi Lisensi</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-center text-[11px] text-slate-500">
              Ubah konfigurasi melalui Dashboard Blogger → Tata Letak.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

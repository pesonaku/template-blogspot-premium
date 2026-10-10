import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LicenseGuard from './components/LicenseGuard';
import Navbar from './components/Navbar';
import HeroSkeleton from './components/HeroSkeleton';
import SectionSkeleton from './components/SectionSkeleton';
import FooterSkeleton from './components/FooterSkeleton';

export default function App() {
  return (
    <ErrorBoundary>
      <LicenseGuard>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Areas */}
        <main className="flex-1">
          <HeroSkeleton />
          <SectionSkeleton />
        </main>

        {/* Footer */}
        <FooterSkeleton />
        </div>
      </LicenseGuard>
    </ErrorBoundary>
  );
}

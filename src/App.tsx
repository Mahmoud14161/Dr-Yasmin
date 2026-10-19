/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar, PageView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HealthCalculator } from './components/HealthCalculator';
import { ProgramsSection } from './components/ProgramsSection';
import { TransformationStories } from './components/TransformationStories';
import { MealPlannerGuide } from './components/MealPlannerGuide';
import { ClinicBranchesSection } from './components/ClinicBranchesSection';
import { AboutDoctor } from './components/AboutDoctor';
import { FAQSection } from './components/FAQSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { Program, DOCTOR_INFO } from './data/doctorData';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { gsap } from './utils/gsapSetup';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

// Import Dedicated Landing Pages
import { CalculatorPage } from './pages/CalculatorPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { MealGuidePage } from './pages/MealGuidePage';
import { BranchesPage } from './pages/BranchesPage';
import { FAQPage } from './pages/FAQPage';
import { AboutDoctorPage } from './pages/AboutDoctorPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').trim();
      const valid: PageView[] = [
        'home',
        'calculator',
        'programs',
        'transformations',
        'meal-guide',
        'branches',
        'faq',
        'about'
      ];
      if (valid.includes(hash as PageView)) return hash as PageView;
    }
    return 'home';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefilledBookingData, setPrefilledBookingData] = useState<{
    bmi?: string;
    weight?: number;
    height?: number;
    goal?: string;
    tdee?: number;
    programTitle?: string;
    branch?: 'aden' | 'jihan' | 'salamon' | 'online';
  } | null>(null);

  const floatingBtnRef = useRef<HTMLAnchorElement>(null);

  // Sync hash changes with page view (supports browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const valid: PageView[] = [
        'home',
        'calculator',
        'programs',
        'transformations',
        'meal-guide',
        'branches',
        'faq',
        'about'
      ];
      if (valid.includes(hash as PageView)) {
        setCurrentPage(hash as PageView);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // WhatsApp button breathing pulse
  useEffect(() => {
    if (floatingBtnRef.current) {
      const tween = gsap.to(floatingBtnRef.current, {
        scale: 1.05,
        y: -3,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      return () => {
        tween.kill();
      };
    }
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    if (page === 'home') {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    setPrefilledBookingData(null);
    setIsBookingOpen(true);
  };

  const handleSelectProgram = (program: Program) => {
    setPrefilledBookingData({
      programTitle: program.title,
    });
    setIsBookingOpen(true);
  };

  const handleSelectBranch = (branchKey: 'aden' | 'jihan' | 'salamon' | 'online') => {
    setPrefilledBookingData({
      branch: branchKey,
    });
    setIsBookingOpen(true);
  };

  const handleBookWithCalculatorResults = (results: {
    bmi: string;
    weight: number;
    height: number;
    goal: string;
    tdee: number;
  }) => {
    setPrefilledBookingData({
      bmi: results.bmi,
      weight: results.weight,
      height: results.height,
      goal: results.goal,
      tdee: results.tdee,
    });
    setIsBookingOpen(true);
  };

  const handleScrollToCalculator = () => {
    if (currentPage !== 'home') {
      handleNavigate('calculator');
    } else {
      const calc = document.getElementById('calculator');
      if (calc) {
        calc.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navigation Bar with active page state */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content: Switches between Home and Dedicated Landing Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onOpenBooking={handleOpenBooking}
              onScrollToCalculator={handleScrollToCalculator}
            />

            {/* Quick Section Hub on Home: Direct Access to Dedicated Landing Pages */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 sm:mb-10 relative z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 border border-emerald-900/10 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      الأقسام والصفحات المخصصة
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                      تصفح سريع
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-500 hidden sm:inline">
                    اضغط على أي صفحة للاطلاع على الدليل الكامل والعودة للرئيسية بنقرة واحدة
                  </span>
                </div>

                <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-3 pb-0.5">
                  <button
                    onClick={() => handleNavigate('calculator')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>حاسبة السعرات</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigate('programs')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>البرامج العلاجية</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigate('transformations')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>قصص النجاح</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigate('meal-guide')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>جدول الوجبات</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigate('branches')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>الفروع والمواعيد</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigate('faq')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>الأسئلة الشائعة</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigate('about')}
                    className="shrink-0 min-w-[125px] sm:min-w-0 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/70 hover:border-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group active:scale-95"
                  >
                    <span>عن الدكتورة</span>
                    <span className="text-[10px] text-emerald-700 opacity-80 group-hover:opacity-100 font-semibold flex items-center gap-0.5">
                      لاندينج بيدج ↗
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Interactive Health & Caloric Needs Calculator */}
            <div className="relative">
              <HealthCalculator
                onBookWithResults={handleBookWithCalculatorResults}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-12 flex justify-center">
                <button
                  onClick={() => handleNavigate('calculator')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج حاسبة السعرات المستقلة والدليل الطبي</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>

            {/* 3. Clinical & Nutrition Programs */}
            <div className="relative">
              <ProgramsSection
                onSelectProgram={handleSelectProgram}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-12 flex justify-center">
                <button
                  onClick={() => handleNavigate('programs')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج البرامج العلاجية والمقارنة الكاملة</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>

            {/* 4. Documented Transformation Stories */}
            <div className="relative">
              <TransformationStories
                onOpenBooking={handleOpenBooking}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-12 flex justify-center">
                <button
                  onClick={() => handleNavigate('transformations')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج قصص النجاح وتجارب المراجعين الكاملة</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>

            {/* 5. Daily Meal Guide & Smart Swaps */}
            <div className="relative">
              <MealPlannerGuide />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-12 flex justify-center">
                <button
                  onClick={() => handleNavigate('meal-guide')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج جدول الوجبات والبدائل الغذائية الذكية</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>

            {/* 6. Clinic Locations & Schedule (فروع العيادة والمواعيد) */}
            <div className="relative">
              <ClinicBranchesSection
                onSelectBranch={handleSelectBranch}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-12 flex justify-center">
                <button
                  onClick={() => handleNavigate('branches')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج الفروع وتعليمات الزيارة المعتمدة</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>

            {/* 7. Frequently Asked Questions */}
            <div className="relative">
              <FAQSection
                onOpenBooking={handleOpenBooking}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-12 flex justify-center">
                <button
                  onClick={() => handleNavigate('faq')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج الأسئلة الشائعة ومركز الاستفسارات</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>

            {/* 8. About Dr. Yassmin Elmenawy & Credentials */}
            <div className="relative">
              <AboutDoctor
                onOpenBooking={handleOpenBooking}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-5 mb-16 flex justify-center">
                <button
                  onClick={() => handleNavigate('about')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs shadow-sm transition-all hover:shadow active:scale-95 group"
                >
                  <span>استعراض لاندينج بيدج السيرة المهنية والأكاديمية والشهادات</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Dedicated Landing Page 1: Health Calculator */}
        {currentPage === 'calculator' && (
          <CalculatorPage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
            onBookWithResults={handleBookWithCalculatorResults}
          />
        )}

        {/* Dedicated Landing Page 2: Clinical Programs */}
        {currentPage === 'programs' && (
          <ProgramsPage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
            onSelectProgram={handleSelectProgram}
          />
        )}

        {/* Dedicated Landing Page 3: Transformations */}
        {currentPage === 'transformations' && (
          <TransformationsPage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* Dedicated Landing Page 4: Meal Guide */}
        {currentPage === 'meal-guide' && (
          <MealGuidePage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* Dedicated Landing Page 5: Clinic Branches & Schedule */}
        {currentPage === 'branches' && (
          <BranchesPage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
            onSelectBranch={handleSelectBranch}
          />
        )}

        {/* Dedicated Landing Page 6: FAQs */}
        {currentPage === 'faq' && (
          <FAQPage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* Dedicated Landing Page 7: About Doctor */}
        {currentPage === 'about' && (
          <AboutDoctorPage
            onGoHome={() => handleNavigate('home')}
            onOpenBooking={handleOpenBooking}
          />
        )}

      </main>

      {/* Smart Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefilledData={prefilledBookingData}
      />

      {/* Official WhatsApp Floating Action Button on Desktop/Tablet */}
      <div className="hidden sm:flex fixed bottom-6 left-6 z-40 items-center gap-3">
        <a
          ref={floatingBtnRef}
          href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم د. ياسمين المناوي 🌿، أود الاستفسار عن برامج التغذية وحجز موعد استشارة.')}`}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-emerald-300 will-change-transform"
          title={`واتساب عيادة د. ياسمين المناوي: ${DOCTOR_INFO.phoneDisplay}`}
          aria-label={`تواصل فوري عبر واتساب عيادة د. ياسمين المناوي: ${DOCTOR_INFO.phoneDisplay}`}
        >
          <WhatsAppIcon size={32} />

          {/* Quick Tooltip on Hover */}
          <span className="hidden sm:inline-block absolute right-full ml-0 mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            واتساب العيادة: {DOCTOR_INFO.phoneDisplay}
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Quick Action Bar (Thumb-Friendly Phone UX) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2.5">
        <button
          onClick={handleOpenBooking}
          className="flex-1 py-3 px-4 rounded-xl bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
        >
          <span>احجز استشارتك الآن</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <a
          href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم د. ياسمين المناوي 🌿، أود الاستفسار عن برامج التغذية وحجز موعد استشارة.')}`}
          target="_blank"
          rel="noreferrer"
          className="py-3 px-4 rounded-xl bg-[#25D366] active:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform shrink-0"
          aria-label="تواصل واتساب"
        >
          <WhatsAppIcon size={18} />
          <span>واتساب</span>
        </a>
      </div>

      {/* Official Medical Footer with Page Navigation (extra bottom padding on mobile for sticky bar) */}
      <div className="pb-16 sm:pb-0">
        <Footer
          onOpenBooking={handleOpenBooking}
          onNavigate={handleNavigate}
        />
      </div>

    </div>
  );
}

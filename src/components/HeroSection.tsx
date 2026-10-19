import React, { useEffect, useRef, useState } from 'react';
import { DoctorLogo } from './DoctorLogo';
import { DOCTOR_INFO } from '../data/doctorData';
import { Calendar, Calculator, CheckCircle2, Award, HeartPulse, Sparkles } from 'lucide-react';
import { gsap } from '../utils/gsapSetup';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onScrollToCalculator
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const badgeFloatingRef = useRef<HTMLDivElement>(null);
  const statsStripRef = useRef<HTMLDivElement>(null);

  // Animated counters state
  const [casesCount, setCasesCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text elements entrance animation
      if (textContentRef.current) {
        const textElements = textContentRef.current.children;
        gsap.from(textElements, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'all'
        });
      }

      // 2. Image frame entrance
      if (imageFrameRef.current) {
        gsap.from(imageFrameRef.current, {
          scale: 0.94,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          delay: 0.2,
          clearProps: 'transform,opacity'
        });
      }

      // 3. Ambient levitation for official doctor badge stamp & success counter card
      if (badgeFloatingRef.current) {
        gsap.to(badgeFloatingRef.current, {
          y: -10,
          rotation: 1.5,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }


      // 4. Counter animations for proof metrics with ScrollTrigger
      const counterObj = { cases: 0, years: 0, satisfaction: 0 };
      gsap.to(counterObj, {
        cases: 4500,
        years: 8,
        satisfaction: 98,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsStripRef.current,
          start: 'top 90%',
          once: true
        },
        onUpdate: () => {
          setCasesCount(Math.floor(counterObj.cases));
          setYearsCount(Math.floor(counterObj.years));
          setSatisfactionCount(Math.floor(counterObj.satisfaction));
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F3F7F3] via-[#F8FAF8] to-white"
    >
      {/* Subtle organic decorative healthy food backdrop (Imagen generated) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/hero_nutrition_backdrop_1792280764639.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F7F3]/85 via-[#F8FAF8]/80 to-white" />
      </div>

      {/* Subtle organic decorative backdrop blur circles */}
      <div className="absolute top-10 right-[-100px] w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-80px] w-80 h-80 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Right Column (in RTL): Headline, Doctor Bio Kicker, CTAs */}
          <div ref={textContentRef} className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Unboxed natural kicker */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm font-bold text-emerald-800 mb-3 sm:mb-4">
              <span>{DOCTOR_INFO.name}</span>
              <span aria-hidden="true" className="text-emerald-400">·</span>
              <span>{DOCTOR_INFO.title}</span>
              <span aria-hidden="true" className="text-emerald-400 hidden sm:inline">·</span>
              <span className="text-slate-500 font-medium hidden sm:inline">معتمد إكلينيكياً</span>
            </div>

            {/* Main Balanced Display Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.35] sm:leading-[1.28] tracking-tight mb-4 sm:mb-6 max-w-2xl text-balance">
              صحتك ورشاقتك بأسلوب حياة{' '}
              <span className="text-emerald-800 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">
                مستدام وعلمي
              </span>{' '}
              بدون حرمان قاسي
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              نصمم لك رحلة علاجية وتغذوية متكاملة تناسب طبيعة جسمك، هرموناتك، وروتين يومك. تخلص من السمنة والنحافة ومقاومة الإنسولين بطرق طبية آمنة تضمن استدامة النتائج مدى الحياة.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-emerald-800 hover:bg-emerald-900 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <Calendar className="w-5 h-5 text-emerald-200" />
                <span>احجز كشفك الآن (عيادة أو أونلاين)</span>
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-emerald-900 bg-white hover:bg-emerald-50/80 border border-emerald-900/15 shadow-sm transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <Calculator className="w-5 h-5 text-emerald-700" />
                <span>احسب مؤشر كتلتك وسعراتك</span>
              </button>
            </div>

            {/* Trust bullet features without badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full border-t border-slate-200/80 pt-5 sm:pt-6 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <span>أنظمة غذائية تفصيلية متجددة أسبوعياً</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <span>برامج خاصة لمقاومة الإنسولين وتكيس المبايض</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <span>متابعة شخصية مستمرة مع د. ياسمين مباشرة</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <span>خطة تثبيت وزن نهائية لحماية نتائجك</span>
              </div>
            </div>

          </div>

          {/* Left Column (in RTL): Doctor Image & Brand Stamp */}
          <div className="lg:col-span-5 flex justify-center relative mt-2 lg:mt-0">
            <div ref={imageFrameRef} className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Doctor Portrait Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-emerald-900/10 to-transparent p-1.5 sm:p-2 border border-emerald-950/10 shadow-xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-emerald-50">
                  <img
                    src="/photos/dryasmin.webp"
                    alt="د. ياسمين المناوي - أخصائية التغذية العلاجية والسمنة والنحافة"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle lighting scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Doctor Tag Card (Fully visible at the bottom) */}
                  <div className="absolute bottom-2.5 right-2.5 left-2.5 sm:bottom-4 sm:right-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-emerald-950/10 shadow-lg flex items-center justify-between gap-2 z-10">
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-xs sm:text-base truncate">
                        {DOCTOR_INFO.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-emerald-800 font-medium truncate">
                        أخصائية التغذية السريرية وعلاج السمنة
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-xl shrink-0">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>معتمد</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Badge Stamp floating on top-right corner with ambient GSAP levitation */}
              <div ref={badgeFloatingRef} className="absolute -top-4 right-1 sm:-top-6 sm:-right-6 will-change-transform z-20 scale-75 sm:scale-100 origin-top-right">
                <div className="bg-white p-1.5 sm:p-2 rounded-full shadow-xl border border-emerald-100">
                  <DoctorLogo size={105} variant="full-badge" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Proof & Metrics Strip in a clean full-width row below */}
        <div ref={statsStripRef} className="mt-10 sm:mt-20 pt-6 sm:pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums mb-1">
                +{casesCount.toLocaleString('en-US')}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                حالة حققت وزنها الصحي
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums mb-1">
                +{yearsCount} سنوات
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                خبرة سريرية في التغذية
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums mb-1">
                {satisfactionCount}%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                نسبة التزام ورضا المراجعين
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums mb-1">
                100% علمي
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                أنظمة بدون حرمان أو أدوية ضارة
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

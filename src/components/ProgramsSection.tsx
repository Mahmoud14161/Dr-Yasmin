import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CLINICAL_PROGRAMS, Program } from '../data/doctorData';
import { Check, ArrowLeft, Clock, Sparkles, ChevronRight, ChevronLeft, Layers, LayoutGrid, Hand } from 'lucide-react';
import { gsap } from '../utils/gsapSetup';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartRef = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredPrograms = CLINICAL_PROGRAMS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  // Reset active slide when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setDragX(0);
  }, [activeFilter]);

  // Animate grid cards when in grid mode
  useEffect(() => {
    if (viewMode === 'grid' && gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [activeFilter, viewMode]);

  const total = filteredPrograms.length;

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'swipe') return;
      if (e.key === 'ArrowLeft') handleNext();
      if (e.key === 'ArrowRight') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNext, handlePrev]);

  // Pointer / Touch Swipe handlers
  const handleDragStart = (clientX: number) => {
    if (total <= 1) return;
    dragStartRef.current = clientX;
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || dragStartRef.current === null) return;
    const delta = clientX - dragStartRef.current;
    setDragX(delta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const threshold = 55;
    if (dragX > threshold) {
      // Swiped right -> next in RTL
      handleNext();
    } else if (dragX < -threshold) {
      // Swiped left -> prev in RTL
      handlePrev();
    }
    setIsDragging(false);
    setDragX(0);
    dragStartRef.current = null;
  };

  // Calculate relative circular offset for 3D card swap stack
  const getRelativeOffset = (index: number) => {
    if (total <= 1) return 0;
    let diff = index - activeIndex;
    const half = Math.floor(total / 2);
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
  };

  return (
    <section ref={sectionRef} id="programs" className="relative py-16 lg:py-24 bg-[#F8FAF8] overflow-hidden">
      {/* Subtle organic decorative healthy ingredients backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/programs_healthy_textures_1792280764582.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-10 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAF8]/90 via-[#F8FAF8]/80 to-[#F8FAF8]/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="text-xs font-bold text-emerald-800 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>باقات علاجية ومتابعة فردية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            البرامج العلاجية المتخصصة مع د. ياسمين المناوي
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            اختر البرنامج العلاجي المصمم خصيصاً لأهدافك الصحية، سواء كنت تبحث عن الرشاقة، التخلص من مقاومة الإنسولين، أو علاج النحافة.
          </p>
        </div>

        {/* Filter Tabs & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {[
              { id: 'all', label: 'جميع البرامج' },
              { id: 'obesity', label: 'علاج السمنة والقوام' },
              { id: 'clinical', label: 'التغذية العلاجية والأمراض' },
              { id: 'underweight', label: 'علاج النحافة' },
              { id: 'online', label: 'المتابعة أونلاين VIP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/50 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mode Toggle: Swipe vs Grid */}
          <div className="inline-flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs shrink-0">
            <button
              onClick={() => setViewMode('swipe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'swipe'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/60 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>شرائح تفاعلية</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/60 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>عرض الكل</span>
            </button>
          </div>
        </div>

        {/* MODE 1: INTERACTIVE SWIPE / CARD SWAP CAROUSEL */}
        {viewMode === 'swipe' && (
          <div className="relative max-w-5xl mx-auto">
            
            {/* Swipe Gesture Hint */}
            {total > 1 && (
              <div className="flex items-center justify-center gap-2 mb-4 text-xs text-emerald-800/80 font-semibold">
                <Hand className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                <span>اسحب البطاقة يميناً أو يساراً أو اضغط على البطاقات الجانبية للتبديل ({activeIndex + 1} من {total})</span>
              </div>
            )}

            <div className="relative flex items-center justify-center">
              
              {/* Previous Button (Right side in RTL) */}
              {total > 1 && (
                <button
                  onClick={handlePrev}
                  aria-label="البرنامج السابق"
                  className="hidden md:flex absolute -right-4 lg:-right-8 z-40 w-12 h-12 rounded-full bg-white hover:bg-emerald-800 text-slate-800 hover:text-white border border-slate-200 shadow-lg items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* 3D Card Swap Stack Stage using CSS Grid Overlap so height adapts naturally */}
              <div
                className="relative grid grid-cols-1 place-items-center w-full py-4 select-none touch-pan-y"
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
              >
                {filteredPrograms.map((program, idx) => {
                  const offset = getRelativeOffset(idx);
                  const isActive = offset === 0;
                  const isNext = offset === 1;
                  const isPrev = offset === -1;
                  const isVisible = Math.abs(offset) <= 1;

                  // Compute 3D Swap Transform
                  let transformStyle = 'translate3d(0px, 0px, 0px) scale(1) rotate(0deg)';
                  let zIndex = 30;
                  let opacity = 1;

                  if (isActive) {
                    const rotateDeg = dragX * 0.025;
                    transformStyle = `translate3d(${dragX}px, 0px, 0px) scale(1) rotate(${rotateDeg}deg)`;
                    zIndex = 30;
                    opacity = 1;
                  } else if (isNext) {
                    // Peeking card on the left
                    transformStyle = `translate3d(calc(-38% + ${dragX * 0.2}px), 14px, 0px) scale(0.88) rotate(-3deg)`;
                    zIndex = 20;
                    opacity = 0.55;
                  } else if (isPrev) {
                    // Peeking card on the right
                    transformStyle = `translate3d(calc(38% + ${dragX * 0.2}px), 14px, 0px) scale(0.88) rotate(3deg)`;
                    zIndex = 20;
                    opacity = 0.55;
                  } else {
                    transformStyle = `translate3d(${offset > 0 ? '-55%' : '55%'}, 28px, 0px) scale(0.76)`;
                    zIndex = 10;
                    opacity = 0;
                  }

                  return (
                    <div
                      key={program.id}
                      onClick={() => {
                        if (!isActive && isVisible) {
                          setActiveIndex(idx);
                        }
                      }}
                      style={{
                        transform: transformStyle,
                        zIndex,
                        opacity,
                        transition: isDragging
                          ? 'none'
                          : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                      className={`col-start-1 row-start-1 w-full max-w-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${
                        isActive
                          ? 'bg-white border-2 border-emerald-700 shadow-2xl ring-4 ring-emerald-700/10 cursor-grab active:cursor-grabbing'
                          : 'bg-white/95 border border-slate-200 shadow-lg cursor-pointer hover:opacity-80'
                      }`}
                    >
                      <div>
                        {/* Top status row: Highlight badge + Slide index pill */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          {program.highlight ? (
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              <span>البرنامج الأكثر طلباً واختياراً</span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                              {program.categoryLabel}
                            </span>
                          )}

                          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50/70 px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{program.duration}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                          {program.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-xs sm:text-sm text-emerald-800 font-semibold mb-4 leading-relaxed">
                          {program.tagline}
                        </p>

                        {/* Recommended For */}
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                          <span className="font-bold text-slate-900">مناسب لـ: </span>
                          {program.recommendedFor}
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 mb-8">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                            ماذا يشمل البرنامج:
                          </span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {program.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal">
                                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProgram(program);
                        }}
                        className="w-full py-4 px-5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-emerald-800 hover:bg-emerald-900 text-white shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                      >
                        <span>احجز هذه الباقة وتواصل مع العيادة</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Next Button (Left side in RTL) */}
              {total > 1 && (
                <button
                  onClick={handleNext}
                  aria-label="البرنامج التالي"
                  className="hidden md:flex absolute -left-4 lg:-left-8 z-40 w-12 h-12 rounded-full bg-white hover:bg-emerald-800 text-slate-800 hover:text-white border border-slate-200 shadow-lg items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Interactive Navigation Controls (Mobile Arrows + Quick Selector Pills) */}
            {total > 1 && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="md:hidden w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 active:scale-95"
                    aria-label="السابق"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots / Pill Indicators */}
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-xs">
                    {filteredPrograms.map((prog, idx) => (
                      <button
                        key={prog.id}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={prog.title}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          activeIndex === idx
                            ? 'w-8 h-2.5 bg-emerald-800'
                            : 'w-2.5 h-2.5 bg-slate-300 hover:bg-emerald-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="md:hidden w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 active:scale-95"
                    aria-label="التالي"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Jump Program Titles Bar */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-3xl">
                  {filteredPrograms.map((prog, idx) => (
                    <button
                      key={prog.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        activeIndex === idx
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-white/70 text-slate-500 hover:text-slate-800 border border-slate-200/60'
                      }`}
                    >
                      {idx + 1}. {prog.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: FULL GRID VIEW */}
        {viewMode === 'grid' && (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  program.highlight
                    ? 'bg-white border-2 border-emerald-700 shadow-xl relative ring-4 ring-emerald-700/5'
                    : 'bg-white border border-slate-200/80 hover:border-emerald-700/30 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {program.highlight && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-3">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>البرنامج الأكثر طلباً واختياراً</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
                    <span>{program.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                    {program.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-800 font-medium mb-4 leading-normal">
                    {program.tagline}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-6 leading-relaxed">
                    <span className="font-bold text-slate-800">مناسب لـ: </span>
                    {program.recommendedFor}
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-slate-900 block">
                      ماذا يشمل البرنامج:
                    </span>
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectProgram(program)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    program.highlight
                      ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-md'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900'
                  }`}
                >
                  <span>احجز هذه الباقة وتواصل مع العيادة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { CLINICAL_PROGRAMS, Program } from '../data/doctorData';
import { Check, ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { gsap } from '../utils/gsapSetup';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredPrograms = CLINICAL_PROGRAMS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  // Animate grid cards when filter changes
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="programs" className="relative py-16 lg:py-24 bg-[#F8FAF8] overflow-hidden">
      {/* Subtle organic decorative healthy ingredients backdrop (Imagen generated) */}
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
        <div className="text-center max-w-3xl mx-auto mb-10">
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

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/50 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Grid with GSAP Ref */}
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
                
                {/* Highlight ribbon if featured */}
                {program.highlight && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-3">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>البرنامج الأكثر طلباً واختياراً</span>
                  </div>
                )}

                {/* Category & Duration unboxed */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
                  <span>{program.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1 text-emerald-800 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{program.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                  {program.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-emerald-800 font-medium mb-4 leading-normal">
                  {program.tagline}
                </p>

                {/* Recommended For */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-6 leading-relaxed">
                  <span className="font-bold text-slate-800">مناسب لـ: </span>
                  {program.recommendedFor}
                </div>

                {/* Features List */}
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

              {/* Action Button */}
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

      </div>
    </section>
  );
};

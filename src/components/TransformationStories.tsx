import React, { useState, useEffect, useRef } from 'react';
import { TRANSFORMATION_STORIES } from '../data/doctorData';
import { Star, TrendingDown, Sparkles } from 'lucide-react';
import { gsap } from '../utils/gsapSetup';

interface TransformationStoriesProps {
  onOpenBooking: () => void;
}

export const TransformationStories: React.FC<TransformationStoriesProps> = ({ onOpenBooking }) => {
  const [selectedStory, setSelectedStory] = useState(TRANSFORMATION_STORIES[0]);
  const storyCardRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storyCardRef.current) {
      gsap.fromTo(
        storyCardRef.current,
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [selectedStory]);

  useEffect(() => {
    if (floatingBadgeRef.current) {
      gsap.to(floatingBadgeRef.current, {
        y: -6,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <section id="transformations" className="py-16 lg:py-24 bg-white border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-emerald-800 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>نتائج حقيقية موثقة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            قصص تحول وتجارب نجاح مراجعي العيادة
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            وراء كل رقم صحة جديدة ونمط حياة مستدام. استمع لتجارب حقيقية غيرت مسار حياة أصحابها مع د. ياسمين المناوي.
          </p>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Visual Showcase (Photo + Floating Metric) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-emerald-50 border border-emerald-900/10 shadow-lg">
              <img
                src="/src/assets/images/wellness_lifestyle_transformation_1792189375918.jpg"
                alt="قصة تحول صحية مع د. ياسمين المناوي"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 right-5 left-5 text-white">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>تغيير حقيقي ومستدام</span>
                </div>
                <div className="text-lg font-bold">
                  أكثر من 4,500 مراجع استعادوا ثقتهم وصحتهم
                </div>
              </div>
            </div>

            {/* Quick Proof Badge with ambient GSAP levitation */}
            <div ref={floatingBadgeRef} className="absolute -bottom-5 -left-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 will-change-transform">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900">معدل نزول دهون صافي</span>
                <span className="text-[11px] text-slate-500 font-medium">بدون ترهلات أو فقدان عضلات</span>
              </div>
            </div>
          </div>

          {/* Detailed Selected Story Highlight */}
          <div ref={storyCardRef} className="lg:col-span-7 bg-[#F8FAF8] rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm flex flex-col justify-between">
            <div>
              {/* Patient header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedStory.name} ({selectedStory.age} سنة)
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {selectedStory.goal}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(selectedStory.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quantified Metrics Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80">
                  <span className="block text-xs text-slate-500 font-medium">النتيجة المحققة:</span>
                  <span className="text-xl font-black text-emerald-800 tabular-nums">
                    {selectedStory.weightLoss}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">خلال {selectedStory.duration}</span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80">
                  <span className="block text-xs text-slate-500 font-medium">التحسن الطبي والتحاليل:</span>
                  <span className="text-xs font-bold text-slate-800 block mt-1 leading-snug">
                    {selectedStory.medicalImprovement}
                  </span>
                </div>
              </div>

              {/* Story Quote */}
              <div className="p-4 rounded-2xl bg-white border border-slate-100 relative mb-6">
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{selectedStory.story}"
                </p>
              </div>
            </div>

            {/* Quick action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
              <span className="text-xs text-slate-600 font-medium">
                جاهز لتكون قصة النجاح التالية؟
              </span>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm transition-all"
              >
                ابدأ رحلتك الصحية الآن
              </button>
            </div>
          </div>

        </div>

        {/* Stories Switcher Carousel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRANSFORMATION_STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className={`p-4 rounded-2xl border text-right transition-all duration-200 ${
                selectedStory.id === story.id
                  ? 'bg-emerald-50/70 border-emerald-700 shadow-sm ring-2 ring-emerald-700/10'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">
                  {story.name}
                </span>
                <span className="text-xs font-extrabold text-emerald-800 tabular-nums">
                  {story.weightLoss}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {story.goal}
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

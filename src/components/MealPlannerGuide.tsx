import React, { useState } from 'react';
import { DAILY_MEAL_PLAN, NUTRITION_TIPS } from '../data/doctorData';
import { Utensils, Clock, Shuffle, BookOpen, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

export const MealPlannerGuide: React.FC = () => {
  const [activeMealIndex, setActiveMealIndex] = useState<number>(2); // Default to Lunch
  const [expandedTip, setExpandedTip] = useState<string | null>('tip-1');

  const selectedMeal = DAILY_MEAL_PLAN[activeMealIndex];

  return (
    <section id="meal-guide" className="py-16 lg:py-24 bg-[#F8FAF8] border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-emerald-800 mb-2">
            تغذية متوازنة بدون حرمان
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            نموذج يوم غذائي صحي ونظام البدائل الذكية
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            الدايت الناجح هو الذي تستطيع الاستمرار عليه طوال حياتك. استكشف كيف تبني وجبات متكاملة وشهية مع نظام مرن للتبديل بين الأطعمة.
          </p>
        </div>

        {/* Meal Explorer Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Visual Showcase (Gourmet Clinical Meal Plate) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-emerald-50 border border-emerald-900/10 shadow-lg">
              <img
                src="/src/assets/images/healthy_clinical_meal_plate_1792189376363.jpg"
                alt="طبق تغذية علاجية متوازن وصحي"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-emerald-950/10">
                <span className="text-xs font-bold text-emerald-800 block mb-0.5">
                  قاعدة الصحن الصحي المعتمدة:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  نصف الصحن خضروات ملونة وألياف، ربع بروتين نقي، وربع نشويات معقدة بطيئة الامتصاص.
                </p>
              </div>
            </div>

            {/* Time schedule quick indicator */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>تنظيم مواعيد الوجبات يرفع الحرق بنسبة 20%</span>
              </div>
              <span className="text-emerald-800 font-bold">كل 3-4 ساعات</span>
            </div>
          </div>

          {/* Interactive Meal Selector & Details */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
            
            {/* Meal Time Selector Tabs */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 mb-6">
              {DAILY_MEAL_PLAN.map((meal, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMealIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeMealIndex === idx
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {meal.title.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Selected Meal Details */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedMeal.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedMeal.time}</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 text-sm text-slate-700 leading-relaxed mb-5">
                {selectedMeal.description}
              </div>

              <div className="text-xs font-bold text-slate-500 mb-4">
                القيمة التقديرية: <span className="text-emerald-800 font-bold">{selectedMeal.calories}</span>
              </div>

              {/* Swaps & Alternatives */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-3">
                  <Shuffle className="w-4 h-4 text-emerald-700" />
                  <span>خيارات البدائل الذكية المسموحة:</span>
                </h4>
                <div className="space-y-2">
                  {selectedMeal.swaps.map((swap, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{swap}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Nutrition Tips & Clinical Articles Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <h3 className="text-xl font-bold text-slate-900">
              إرشادات ومقالات توعوية من د. ياسمين المناوي
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NUTRITION_TIPS.map((tip) => {
              const isOpen = expandedTip === tip.id;
              return (
                <div
                  key={tip.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    isOpen
                      ? 'bg-emerald-50/40 border-emerald-700/50 shadow-sm'
                      : 'bg-[#F8FAF8] border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs text-slate-400 font-medium mb-2">
                    {tip.readTime}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tip.summary}
                  </p>

                  <button
                    onClick={() => setExpandedTip(isOpen ? null : tip.id)}
                    className="text-xs font-bold text-emerald-800 flex items-center gap-1 hover:text-emerald-950 transition-colors"
                  >
                    <span>{isOpen ? 'إخفاء التفاصيل' : 'قراءة الإرشادات الطبية'}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-emerald-900/10 space-y-2 text-xs text-slate-700 animate-in fade-in duration-200">
                      {tip.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

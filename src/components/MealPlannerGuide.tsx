import React, { useState } from 'react';
import { DAILY_MEAL_PLAN } from '../data/doctorData';
import { Clock, Shuffle, Sparkles } from 'lucide-react';

export const MealPlannerGuide: React.FC = () => {
  const [activeMealIndex, setActiveMealIndex] = useState<number>(2); // Default to Lunch
  const selectedMeal = DAILY_MEAL_PLAN[activeMealIndex];

  return (
    <section id="meal-guide" className="py-14 lg:py-20 bg-[#F8FAF8] border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>تغذية متوازنة بدون حرمان</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            نموذج يوم غذائي والبدائل الذكية
          </h2>
        </div>

        {/* Meal Explorer Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Showcase (Gourmet Clinical Meal Plate) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-emerald-50 border border-emerald-900/10 shadow-lg">
              <img
                src="/images/healthy_clinical_meal_plate_1792189376363.jpg"
                alt="طبق تغذية علاجية متوازن وصحي"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-950/10">
                <span className="text-xs font-bold text-emerald-800 block mb-0.5">
                  قاعدة الصحن الصحي:
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  نصف الصحن خضروات، ربع بروتين، وربع نشويات صحية.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Meal Selector & Details */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-emerald-900/10 shadow-sm">
            
            {/* Meal Time Selector Tabs */}
            <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 pb-4 border-b border-slate-100 mb-5">
              {DAILY_MEAL_PLAN.map((meal, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMealIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeMealIndex === idx
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {meal.title}
                </button>
              ))}
            </div>

            {/* Selected Meal Details */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedMeal.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {selectedMeal.calories}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{selectedMeal.time}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                {selectedMeal.description}
              </div>

              {/* Swaps & Alternatives */}
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                  <Shuffle className="w-4 h-4 text-emerald-700" />
                  <span>البدائل المسموحة:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

      </div>
    </section>
  );
};


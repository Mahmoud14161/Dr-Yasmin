import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calculator, ArrowLeft, RefreshCw, CheckCircle, Flame, Droplets, Scale, Sparkles } from 'lucide-react';
import { gsap } from '../utils/gsapSetup';

interface HealthCalculatorProps {
  onBookWithResults: (results: {
    bmi: string;
    weight: number;
    height: number;
    goal: string;
    tdee: number;
  }) => void;
}

export const HealthCalculator: React.FC<HealthCalculatorProps> = ({ onBookWithResults }) => {
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(78);
  const [height, setHeight] = useState<number>(165);
  const [activity, setActivity] = useState<number>(1.2);
  const [goal, setGoal] = useState<'loss' | 'maintain' | 'gain'>('loss');

  // Animated displayed numbers via GSAP
  const [displayedBmi, setDisplayedBmi] = useState<number>(28.7);
  const [displayedCalories, setDisplayedCalories] = useState<number>(1850);
  const gaugeNeedleRef = useRef<HTMLDivElement>(null);
  const resultsCardRef = useRef<HTMLDivElement>(null);

  // Scientific calculation using Mifflin-St Jeor
  const calculation = useMemo(() => {
    const heightInMeters = height / 100;
    const bmiVal = weight / (heightInMeters * heightInMeters);
    const bmi = parseFloat(bmiVal.toFixed(1));

    // Ideal weight bounds (BMI 19 to 24)
    const minIdealWeight = Math.round(19 * heightInMeters * heightInMeters);
    const maxIdealWeight = Math.round(24 * heightInMeters * heightInMeters);

    // BMR (Mifflin-St Jeor)
    let bmrVal = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') {
      bmrVal += 5;
    } else {
      bmrVal -= 161;
    }
    const bmr = Math.round(bmrVal);
    const tdee = Math.round(bmr * activity);

    // Target Calories
    let targetCalories = tdee;
    if (goal === 'loss') {
      targetCalories = Math.max(1200, Math.round(tdee - 500));
    } else if (goal === 'gain') {
      targetCalories = Math.round(tdee + 400);
    }

    // Daily Water
    const waterLiters = (weight * 0.035).toFixed(1);

    // BMI Category
    let category = 'وزن طبيعي ومثالي';
    let categoryColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let description = 'مؤشر كتلة جسمك يقع ضمن النطاق الصحي الموصى به طبياً.';

    if (bmi < 18.5) {
      category = 'نقص في الوزن (نحافة)';
      categoryColor = 'text-amber-700 bg-amber-50 border-amber-200';
      description = 'تحتاج إلى برنامج تغذية علاجي لزيادة الكتلة العضلية وتحسين امتصاص الغذاء بطريقة متوازنة.';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'زيادة في الوزن (Overweight)';
      categoryColor = 'text-orange-700 bg-orange-50 border-orange-200';
      description = 'يمكنك استعادة وزنك المثالي بسهولة عبر تنظيم وجباتك وعجز سعرات صحي بدون حرمان.';
    } else if (bmi >= 30 && bmi < 35) {
      category = 'سمنة من الدرجة الأولى';
      categoryColor = 'text-rose-700 bg-rose-50 border-rose-200';
      description = 'يُوصى ببدء برنامج غذائي متخصص للوقاية من مقاومة الإنسولين وحماية المفاصل وصحة القلب.';
    } else if (bmi >= 35) {
      category = 'سمنة مفرطة تحتاج رعاية طبية';
      categoryColor = 'text-rose-800 bg-rose-100 border-rose-300';
      description = 'حالتك تتطلب متابعة سريرية دقيقة مع تحاليل طبية شاملة لإنقاص الوزن بأمان تام.';
    }

    return {
      bmi,
      category,
      categoryColor,
      description,
      minIdealWeight,
      maxIdealWeight,
      bmr,
      tdee,
      targetCalories,
      waterLiters
    };
  }, [gender, age, weight, height, activity, goal]);

  // Smooth GSAP Tween when calculation updates
  useEffect(() => {
    const animatedObj = {
      bmi: displayedBmi,
      calories: displayedCalories
    };

    gsap.to(animatedObj, {
      bmi: calculation.bmi,
      calories: calculation.targetCalories,
      duration: 0.75,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayedBmi(parseFloat(animatedObj.bmi.toFixed(1)));
        setDisplayedCalories(Math.round(animatedObj.calories));
      }
    });

    // Animate gauge needle percent (15 to 40 BMI range clamped 0% to 100%)
    const clampedBmi = Math.min(40, Math.max(15, calculation.bmi));
    const percentage = ((clampedBmi - 15) / (40 - 15)) * 100;

    if (gaugeNeedleRef.current) {
      gsap.to(gaugeNeedleRef.current, {
        left: `${percentage}%`,
        duration: 0.85,
        ease: 'elastic.out(1, 0.6)'
      });
    }

  }, [calculation.bmi, calculation.targetCalories]);

  const handleApplyToBooking = () => {
    let goalLabel = 'خسارة دهون ورشاقة';
    if (goal === 'maintain') goalLabel = 'تثبيت الوزن الحالي';
    if (goal === 'gain') goalLabel = 'علاج نحافة وبناء عضلات';

    onBookWithResults({
      bmi: `${calculation.bmi} (${calculation.category})`,
      weight,
      height,
      goal: goalLabel,
      tdee: calculation.targetCalories,
    });
  };

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-white border-t border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-emerald-800 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>فحص أولي مجاني ودقيق</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            حاسبة مؤشر كتلة الجسم (BMI) واحتياج السعرات اليومية
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            احسب وزنك المثالي ومعدل حرق جسمك والسعرات المستهدفة لتحقيق هدفك بطريقة علمية ومعتمدة طبياً.
          </p>
        </div>

        {/* Main Grid: Inputs vs Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-[#F8FAF8] rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-800" />
              <span>البيانات الجسدية ونمط النشاط</span>
            </h3>

            <div className="space-y-6">
              
              {/* Gender Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الجنس
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-200/60 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                      gender === 'female'
                        ? 'bg-white text-emerald-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    أنثى
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                      gender === 'male'
                        ? 'bg-white text-emerald-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ذكر
                  </button>
                </div>
              </div>

              {/* Age, Weight, Height Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    العمر (بالسنوات)
                  </label>
                  <input
                    type="number"
                    min="12"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value) || 20)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums text-center text-lg"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الوزن الحالي (كجم)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="250"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value) || 50)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums text-center text-lg"
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الطول (سم)
                  </label>
                  <input
                    type="number"
                    min="120"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value) || 150)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums text-center text-lg"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  مستوى النشاط البدني اليومي
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { value: 1.2, label: 'قليل الحركة (عمل مكتبي، دون رياضة)' },
                    { value: 1.375, label: 'نشاط خفيف (تمرين 1-3 أيام أسبوعياً)' },
                    { value: 1.55, label: 'نشاط متوسط (تمرين 3-5 أيام أسبوعياً)' },
                    { value: 1.725, label: 'نشيط جداً (تمارين يومية أو عمل شاق)' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setActivity(item.value)}
                      className={`p-3 rounded-xl border text-right transition-all font-medium ${
                        activity === item.value
                          ? 'bg-emerald-50 border-emerald-700 text-emerald-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  الهدف الصحي المطلوب
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'loss', label: 'خسارة دهون' },
                    { key: 'maintain', label: 'تثبيت الوزن' },
                    { key: 'gain', label: 'زيادة وزن وعضلات' },
                  ].map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setGoal(g.key as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        goal === g.key
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Results Column */}
          <div ref={resultsCardRef} className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/15 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                التقرير والتحليل الصحي الفوري
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>حساب طبي معتمد</span>
              </div>
            </div>

            {/* BMI Prominent Box with GSAP Animated Counter & Visual Gauge */}
            <div className="mb-6 p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 text-center">
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                مؤشر كتلة الجسم (BMI)
              </span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-900 tabular-nums tracking-tight mb-2">
                {displayedBmi}
              </div>
              <div className={`inline-block px-3.5 py-1 rounded-lg text-xs font-bold border ${calculation.categoryColor} mb-3`}>
                {calculation.category}
              </div>

              {/* Dynamic Visual Gauge Bar */}
              <div className="relative pt-2 pb-1 px-1">
                <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 via-50% to-rose-400 overflow-hidden shadow-inner" />
                {/* Pointer Needle */}
                <div
                  ref={gaugeNeedleRef}
                  className="absolute top-0 w-3.5 h-3.5 -mt-0.5 -ml-1.75 bg-slate-900 border-2 border-white rounded-full shadow-md will-change-transform"
                  style={{ left: '50%' }}
                />
                <div className="flex justify-between text-[10px] text-slate-600 mt-1.5 px-0.5">
                  <span>نحافة (18.5)</span>
                  <span>مثالي (24.9)</span>
                  <span>زيادة (29.9)</span>
                  <span>سمنة (35+)</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed px-2 mt-3">
                {calculation.description}
              </p>
            </div>

            {/* Metrics Grid with GSAP animated target calories */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              
              {/* Daily Target Calories */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-1">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <span>السعرات المستهدفة</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {displayedCalories} <span className="text-xs font-normal text-slate-600">سعرة/يوم</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  معدل الحرق الإجمالي: {calculation.tdee}
                </div>
              </div>

              {/* Ideal Weight Range */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold mb-1">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>الوزن المثالي المقترح</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {calculation.minIdealWeight} - {calculation.maxIdealWeight} <span className="text-xs font-normal text-slate-600">كجم</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  حسب معايير منظمة الصحة
                </div>
              </div>

              {/* Water Requirement */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sky-600" />
                  <div>
                    <span className="block text-xs font-bold text-slate-800">الاحتياج اليومي من الماء</span>
                    <span className="text-[11px] text-slate-500">لتحسين الهضم وسرعة حرق الدهون</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-sky-800 tabular-nums">
                  {calculation.waterLiters} <span className="text-xs font-normal">لتر</span>
                </div>
              </div>

            </div>

            {/* Action Button: Book with these results */}
            <button
              onClick={handleApplyToBooking}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span>احجز نظامك الغذائي المخصص بناءً على نتائجك</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-400 text-center mt-3">
              * النتائج استرشادية، وتتطلب خطة علاجية مخصصة بناءً على الفحوصات والتحاليل المخبرية.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

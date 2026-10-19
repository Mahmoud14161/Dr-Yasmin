import React from 'react';
import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { MealPlannerGuide } from '../components/MealPlannerGuide';
import { Utensils, Shuffle, CheckCircle, Apple, Clock, Coffee } from 'lucide-react';

interface MealGuidePageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
}

export const MealGuidePage: React.FC<MealGuidePageProps> = ({
  onGoHome,
  onOpenBooking
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Header with Back Button */}
      <PageHeader
        title="دليل الوجبات الصحي ونظام البدائل الغذائية المرنة"
        subtitle="نموذج عملي ليوم متوازن مع جدول ذكي للتبديل بين الأطعمة لتناول ما تحب دون الخروج عن مسارك الصحي أو التضحية بنتائجك."
        badge="تغذية مرنة بدون حرمان"
        icon={<Utensils className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="طلب جدول غذائي أسبوعي مخصص"
      />

      {/* Main Meal Planner Component */}
      <MealPlannerGuide />

      {/* Detailed Food Swap Quick Guide for this Landing Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              جدول التبديل الذكي (Food Swaps Quick Guide)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              قائمة سريعة للبدائل المتكافئة سعرياً وغذائياً لاستبدال أي صنف في خطتك اليومية بسهولة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Carbs Swaps */}
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-xs font-extrabold text-emerald-800 block mb-2">
                بدائل حصة النشويات (تساوي رغيف بلدي صغير)
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>5-6 ملاعق أرز بني أو بسمتي مطبوخ</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>5 ملاعق مكرونة قمح كامل أو كينوا</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>حبة بطاطا مشوية متوسطة (150 جم)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>4 ملاعق كبيرة شوفان حبة كاملة</span>
                </li>
              </ul>
            </div>

            {/* Protein Swaps */}
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-xs font-extrabold text-emerald-800 block mb-2">
                بدائل حصة البروتين (تساوي 100 جم دجاج مشوي)
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>120 جم سمك فيليه مشوي أو تونة مصفاة</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>150 جم جبن قريش طبيعي</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>بيضتان كاملتان + بياض بيضة واحدة</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>كوب ونصف عدس مطبوخ أو فول مدمس</span>
                </li>
              </ul>
            </div>

            {/* Healthy Fats Swaps */}
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-xs font-extrabold text-emerald-800 block mb-2">
                بدائل الدهون الصحية (حوالي 45-50 سعرة)
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>ملعقة صغيرة زيت زيتون بكر ممتاز</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>6 حبات لوز نيء أو 3 حبات جوز (عين جمل)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>شريحة ربع ثمرة أفوكادو متوسطة (30 جم)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>8-10 حبات زيتون أسود أو أخضر مخلل منزلي</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="دليل الوجبات والبدائل الغذائية"
      />

    </div>
  );
};

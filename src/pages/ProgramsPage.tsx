import React from 'react';
import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { ProgramsSection } from '../components/ProgramsSection';
import { Program } from '../data/doctorData';
import { Sparkles, Check, ShieldCheck, HeartPulse, Clock, ArrowLeft } from 'lucide-react';

interface ProgramsPageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
  onSelectProgram: (program: Program) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onGoHome,
  onOpenBooking,
  onSelectProgram
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Header with Back Button */}
      <PageHeader
        title="البرامج العلاجية وباقات المتابعة المتخصصة"
        subtitle="أنظمة تغذية سريرية قائمة على الدليل العلمي ومصممة بدقة حسب تحاليلك ونمط حياتك لتحقيق نتائج مستدامة دون ارتداد الوزن."
        badge="باقات فردية متكاملة"
        icon={<Sparkles className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="استشارة لتحديد الباقة الأنسب"
      />

      {/* Main Programs Component */}
      <ProgramsSection onSelectProgram={onSelectProgram} />

      {/* Comparison & Values Section for this Landing Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              ما الذي يميز برامج د. ياسمين المناوي عن الحميات التقليدية؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              مقارنة واضحة توضح الفارق بين التغذية العلاجية المتخصصة ودايت الحرمان العشوائي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block mb-2">
                نهج عيادة د. ياسمين المناوي
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-emerald-950 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>خطة مخصصة تماماً بناءً على كيمياء جسمك ونسبة الدهون والعضلات.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>تحديث دوري كل أسبوعين لمنع ثبات الوزن وتجنب الشعور بالملل.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>متابعة خاصة للأمراض المصاحبة (مقاومة إنسولين، سكر، ضغط، تكيس مبايض).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>خطة تثبيت علمية متقدمة تضمن بقاء الوزن المثالي مدى الحياة.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                الأنظمة الكيميائية والدايت العشوائي
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>ورقة دايت مكررة وموحدة لجميع الحالات دون مراعاة الفروق الفردية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>حرمان قاسي وتجويع يسبب هبوط معدل الحرق وفقدان الكتلة العضلية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>تجاهل التحاليل والخلل الهرموني مما يؤدي لانتكاس الحالة سريعاً.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>استعادة سريعة ومضاعفة للوزن بمجرد التوقف عن النظام.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Quick CTA */}
          <div className="pt-4 flex items-center justify-between flex-col sm:flex-row gap-4 border-t border-slate-100">
            <span className="text-xs sm:text-sm text-slate-700 font-bold">
              هل تحتار أي البرامج هو الأنسب لحالتك الصحية الحالية؟
            </span>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all"
            >
              تواصل مع فريق العيادة للمساعدة في الاختيار
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="البرامج العلاجية"
      />

    </div>
  );
};

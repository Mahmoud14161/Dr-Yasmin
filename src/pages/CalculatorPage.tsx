import React from 'react';
import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { HealthCalculator } from '../components/HealthCalculator';
import { Calculator, Scale, Flame, AlertCircle, CheckCircle2, Droplets, HeartHandshake } from 'lucide-react';

interface CalculatorPageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
  onBookWithResults: (results: {
    bmi: string;
    weight: number;
    height: number;
    goal: string;
    tdee: number;
  }) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onGoHome,
  onOpenBooking,
  onBookWithResults
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Dedicated Page Header with Back Button */}
      <PageHeader
        title="حاسبة مؤشر كتلة الجسم (BMI) واحتياج السعرات اليومية"
        subtitle="أداة فحص سريري مبسطة ومعتمدة لحساب معدل حرق جسمك الأساسي (BMR) واحتياج السعرات الإجمالي (TDEE) ونطاق الوزن المثالي الموصى به طبياً."
        badge="أداة طبية تفاعلية"
        icon={<Calculator className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="حجز خطة تغذية مخصصة لنتائجك"
      />

      {/* Main Interactive Tool Container */}
      <div className="py-8">
        <HealthCalculator onBookWithResults={onBookWithResults} />
      </div>

      {/* Deep Dive Educational Guide for this landing page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              دليل فهم الأرقام والنتائج الطبية لحاسبة السعرات
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              إرشادات سريرية من د. ياسمين عصام المناوي لمساعدتك على قراءة أرقام جسمك بشكل صحيح.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                مؤشر كتلة الجسم (BMI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                مقياس عالمي معتمد يحدد تناسب وزنك مع طولك. المؤشر الطبيعي يقع بين 18.5 و 24.9، وما زاد عن ذلك يصنف كوزن زائد أو سمنة بدرجاتها المختلفة التي تتطلب تدخلاً علاجياً.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                معدل الحرق الأساسي (BMR & TDEE)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                معادلة Mifflin-St Jeor تحسب الحد الأدنى من الطاقة التي يحتاجها جسمك للبقاء حياً وتنظيم العمليات الحيوية، بينما الـ TDEE يشمل نشاطك الحركي لتحديد عجز السعرات الآمن دون تجويع.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                الماء وهندسة الحرق
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                يحتاج كل كيلوجرام من وزنك حوالي 35 مل من الماء يومياً. قلة شرب الماء تقلل من كفاءة تفكيك الدهون داخل الكبد وتؤدي لاحتباس السوائل وبطء استجابة الميزان.
              </p>
            </div>

          </div>

          {/* Quick Notice */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">تنبيه سريري هام من د. ياسمين:</span>
              <span>
                الأرقام الناتجة عن الحاسبة هي مؤشر استرشادي عام. التقييم الدقيق يتطلب فحص مكونات الجسم (InBody) لمعرفة نسبة الدهون الحشوية والكتلة العضلية ومراجعة تحاليل الغدة والسكر التراكمي في العيادة.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="حاسبة كتلة الجسم والسعرات"
      />

    </div>
  );
};

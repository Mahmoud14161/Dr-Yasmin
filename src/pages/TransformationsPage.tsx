import React from 'react';
import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { TransformationStories } from '../components/TransformationStories';
import { Award, TrendingDown, HeartPulse, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface TransformationsPageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
}

export const TransformationsPage: React.FC<TransformationsPageProps> = ({
  onGoHome,
  onOpenBooking
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Header with Back Button */}
      <PageHeader
        title="قصص التحول وتجارب نجاح مراجعي العيادة"
        subtitle="شاهد كيف ساعدت دكتورة ياسمين المناوي آلاف الحالات على التخلص من السمنة، علاج مقاومة الإنسولين، واكتساب الوزن الصحي بأمان تام."
        badge="نتائج حقيقية موثقة"
        icon={<Award className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="ابدأ قصة تحولك الآن"
      />

      {/* Main Transformation Stories */}
      <TransformationStories onOpenBooking={onOpenBooking} />

      {/* Trust & Methodology Behind Transformations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              كيف نضمن تحقيق نتائج تحول مستدامة بدون ترهلات؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              القواعد الطبية الصارمة التي تتبعها د. ياسمين في إدارة نزول وزيادة الوزن.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-2xl font-extrabold text-emerald-800 block mb-1">
                دهون صافية
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                حماية الكتلة العضلية بنسبة 100%
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                النزول الصحي يركز على الخلايا الدهنية المخزونة. عندما تحافظ على عضلاتك يظل معدل حرقك مرتفعاً ومشدوداً ولا تعاني من ترهلات الجلد.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-2xl font-extrabold text-emerald-800 block mb-1">
                تحسن مخبري
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                ضبط السكر والدهون الثلاثية
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                النجاح لا يقاس فقط بالميزان؛ بل بتحسن تحاليل السكر التراكمي، تراجع مقاومة الإنسولين، وانتظام الدورة الشهرية، وعودة النشاط اليومي الكامل.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-2xl font-extrabold text-emerald-800 block mb-1">
                صفر حرمان
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                مرونة كاملة في خيارات الطعام
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                برامجنا لا تلزمك بوجبات معقدة أو مكلفة. نعتمد على ما يتوفر في منزلك مع بدائل ذكية تناسب العزومات والمناسبات ونمط حياتك الاجتماعي.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="قصص النجاح والتحول"
      />

    </div>
  );
};

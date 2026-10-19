import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { ClinicBranchesSection } from '../components/ClinicBranchesSection';
import { DOCTOR_INFO } from '../data/doctorData';
import { MapPin, Building, Clock, Calendar, CheckCircle, Info, PhoneCall } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface BranchesPageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
  onSelectBranch: (branchKey: 'aden' | 'jihan' | 'salamon' | 'online') => void;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({
  onGoHome,
  onOpenBooking,
  onSelectBranch
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Header with Back Button */}
      <PageHeader
        title="فروع عيادة د. ياسمين المناوي ومواعيد الكشف"
        subtitle="نسعد باستقبالكم في فروع المنصورة بميديكال عدن وشارع جيهان، وفرع سلامون، أو عبر الاستشارات الأونلاين لجميع المحافظات والدول."
        badge="المواعيد الرسمية"
        icon={<Building className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="حجز موعد بالعيادة الآن"
      />

      {/* Main Branches Cards Component */}
      <ClinicBranchesSection onSelectBranch={onSelectBranch} />

      {/* Instructions Before Clinic Visit on this Landing Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              تعليمات هامة قبل الحضور لجلسة الكشف بالعيادة
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              لضمان دقة فحص جهاز قياس مكونات الجسم (InBody) والخروج بأعلى فائدة سريرية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-xs font-extrabold text-emerald-800 block mb-2">
                1. الصيام قبل فحص الـ InBody
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                يُفضل الصيام عن الطعام والشراب لمدة تتراوح بين ساعتين إلى 3 ساعات قبل موعد الكشف للحصول على أدق قراءة لنسبة الدهون والكتلة العضلية.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-xs font-extrabold text-emerald-800 block mb-2">
                2. إحضار التحاليل الطبية السابقة
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                في حال وجود تحاليل حديثة (سكر تراكمي، وظائف غدة درقية، صورة دم، دهون ثلاثية، أو فيتامين د)، يُرجى إحضارها لمراجعتها مع الدكتورة.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80">
              <span className="text-xs font-extrabold text-emerald-800 block mb-2">
                3. التثبيت المسبق للموعد
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                نظراً لكثافة الحالات والحرص على عدم الانتظار، يتم الدخول وفق أسبقية الحجز المسبق عبر واتساب العيادة الرسمي.
              </p>
            </div>

          </div>

          {/* Quick Contact Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-700">
              <span>هاتف وواتساب الحجز المباشر: </span>
              <strong className="text-emerald-900 font-mono text-sm" dir="ltr">{DOCTOR_INFO.phoneDisplay}</strong>
            </div>

            <a
              href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم د. ياسمين المناوي 🌿، أود الاستفسار عن فروع العيادة وأقرب موعد متاح.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors"
            >
              <WhatsAppIcon size={16} />
              <span>تواصل لتأكيد الموعد عبر واتساب</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="فروع العيادة والمواعيد"
      />

    </div>
  );
};

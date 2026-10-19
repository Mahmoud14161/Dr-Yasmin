import React from 'react';
import { MapPin, Clock, Calendar, Sparkles, Building, ArrowLeft, PhoneCall } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ClinicBranchesSectionProps {
  onSelectBranch: (branchKey: 'aden' | 'jihan' | 'salamon' | 'online') => void;
}

export const ClinicBranchesSection: React.FC<ClinicBranchesSectionProps> = ({ onSelectBranch }) => {
  const branches = [
    {
      key: 'aden' as const,
      city: 'المنصورة',
      title: 'عيادة عدن',
      facility: 'مركز تجميل د. أحمد الشريفة',
      day: 'يوم الثلاثاء',
      time: 'من 6:00 مساءً إلى 9:00 مساءً',
      badge: 'المنصورة',
      highlight: true
    },
    {
      key: 'jihan' as const,
      city: 'المنصورة',
      title: 'عيادة جيهان',
      facility: 'عيادة د. محمد عنان لجراحات السمنة',
      day: 'يوم الأحد',
      time: 'من 4:00 مساءً إلى 7:00 مساءً',
      badge: 'شارع جيهان',
      highlight: false
    },
    {
      key: 'salamon' as const,
      city: 'الدقهلية',
      title: 'فرع سلامون',
      facility: 'عيادة سلامون التخصصية',
      day: 'يوم الأربعاء',
      time: 'من 4:00 مساءً إلى 11:00 مساءً',
      badge: 'سلامون',
      highlight: false
    },
    {
      key: 'online' as const,
      city: 'جميع المحافظات والدول',
      title: 'استشارات أونلاين VIP',
      facility: 'متابعة فردية عبر زووم وواتساب',
      day: 'طوال أيام الأسبوع',
      time: 'بمواعيد مسبقة تناسب فارق التوقيت',
      badge: 'عن بُعد',
      highlight: false
    }
  ];

  return (
    <section id="branches" className="py-16 lg:py-24 bg-white border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold text-emerald-800 mb-2 flex items-center justify-center gap-1.5">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>مواقع العيادات ومواعيد الاستقبال</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            فروع عيادة د. ياسمين المناوي ومواعيد الكشف
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            نسعد باستقبالكم في فروع المنصورة وسلامون بمواعيد أسبوعية منتظمة، أو عبر الاستشارات الأونلاين أينما كنتم.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
          {branches.map((b) => (
            <div
              key={b.key}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                b.highlight
                  ? 'bg-[#F8FAF8] border-2 border-emerald-700 shadow-lg ring-4 ring-emerald-700/5'
                  : 'bg-[#F8FAF8] border border-slate-200/80 hover:border-emerald-700/30 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                
                {/* Location indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
                  <div className="flex items-center gap-1 text-emerald-800 font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{b.city}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                    {b.badge}
                  </span>
                </div>

                {/* Branch Name */}
                <h3 className="text-xl font-bold text-slate-900 mb-1.5 leading-snug">
                  {b.title}
                </h3>

                {/* Facility / Clinic Host */}
                <p className="text-xs font-semibold text-emerald-900 mb-5 bg-white p-2.5 rounded-xl border border-slate-200/70 leading-normal">
                  {b.facility}
                </p>

                {/* Day & Time Spec */}
                <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-slate-900">{b.day}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium leading-relaxed">{b.time}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectBranch(b.key)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  b.highlight
                    ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm'
                    : 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-900/15'
                }`}
              >
                <span>حجز موعد بهذا الفرع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

        {/* Clinic Appointment Notice Banner */}
        <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-emerald-950 font-medium text-center sm:text-right">
            <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              <strong>تنبيه هام:</strong> الكشف والحضور يتم بأسبقية الحجز المسبق لضمان عدم الانتظار وتوفير الوقت الكافي للفحص السريري وتحليل الـ InBody.
            </span>
          </div>

          <a
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم د. ياسمين، أود الاستفسار عن أقرب موعد متاح في العيادة.')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shrink-0 transition-colors shadow-sm"
          >
            <WhatsAppIcon size={16} />
            <span>تأكيد موعدك عبر واتساب: {DOCTOR_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

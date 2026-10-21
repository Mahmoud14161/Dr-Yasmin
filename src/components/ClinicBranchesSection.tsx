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
    <section id="branches" className="py-14 lg:py-20 bg-white border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center justify-center gap-1.5">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>مواقع العيادات والمواعيد</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            فروع العيادة ومواعيد الكشف
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {branches.map((b) => (
            <div
              key={b.key}
              className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                b.highlight
                  ? 'bg-[#F8FAF8] border-2 border-emerald-700 shadow-lg ring-4 ring-emerald-700/5'
                  : 'bg-[#F8FAF8] border border-slate-200/80 hover:border-emerald-700/30 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                
                {/* Location indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2.5">
                  <div className="flex items-center gap-1 text-emerald-800 font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{b.city}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                    {b.badge}
                  </span>
                </div>

                {/* Branch Name */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 leading-snug">
                  {b.title}
                </h3>

                {/* Facility / Clinic Host */}
                <p className="text-xs font-semibold text-emerald-900 mb-4 bg-white p-2.5 rounded-xl border border-slate-200/70 leading-normal">
                  {b.facility}
                </p>

                {/* Day & Time Spec */}
                <div className="space-y-2 mb-5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-slate-900">{b.day}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">{b.time}</span>
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
                <span>حجز موعد بالفرع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


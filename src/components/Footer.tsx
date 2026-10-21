import React from 'react';
import { DOCTOR_INFO } from '../data/doctorData';
import { DoctorLogo } from './DoctorLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MapPin, Phone, MessageSquare, Mail, Calendar, ShieldCheck, ArrowLeft } from 'lucide-react';
import { PageView } from './Navbar';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
  const landingPages: { label: string; page: PageView }[] = [
    { label: 'الرئيسية الشاملة', page: 'home' },
    { label: 'حاسبة مؤشر كتلة الجسم والسعرات', page: 'calculator' },
    { label: 'البرامج والباقات العلاجية', page: 'programs' },
    { label: 'قصص النجاح والتحولات', page: 'transformations' },
    { label: 'دليل الوجبات والبدائل المرنة', page: 'meal-guide' },
    { label: 'فروع العيادة ومواعيد الكشف', page: 'branches' },
    { label: 'الأسئلة الشائعة والأجوبة الطبية', page: 'faq' },
    { label: 'السيرة المهنية لدكتورة ياسمين', page: 'about' },
  ];

  const handleNav = (page: PageView) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-emerald-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Doctor bio column */}
          <div className="lg:col-span-4 flex flex-col items-start text-right">
            <div className="mb-4">
              <DoctorLogo size={52} variant="compact-inline" className="[&_span]:text-white [&_div]:border-emerald-600 [&_div]:bg-slate-800" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              العيادة التخصصية للدكتورة ياسمين المناوي. تغذية علاجية متقدمة، برامج متخصصة لعلاج السمنة والنحافة، وتنظيم الحميات لأصحاب الأمراض المزمنة بأسلوب علمي مستدام.
            </p>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>طلب حجز استشارة أو كشف</span>
            </button>
          </div>

          {/* Dedicated Landing Pages Links */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>صفحات المنصة المستقلة</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {landingPages.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="hover:text-emerald-400 transition-colors text-right flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Branches */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>فروع العيادة والمواعيد</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              {DOCTOR_INFO.clinicAddresses.map((addr, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-0.5">
                    {addr.city}
                  </span>
                  <p className="text-slate-400 text-[11px] mb-1 leading-relaxed">
                    {addr.details}
                  </p>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {addr.days}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>التواصل السريع</span>
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/40 text-emerald-300 transition-colors"
              >
                <WhatsAppIcon size={18} className="shrink-0 text-[#25D366]" />
                <div className="flex flex-col">
                  <span className="font-bold">واتساب العيادة المباشر</span>
                  <span className="text-[11px] text-emerald-400/80 font-mono" dir="ltr">{DOCTOR_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={`tel:+${DOCTOR_INFO.whatsappNumber}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold">الاتصال الهاتفي</span>
                  <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{DOCTOR_INFO.phoneDisplay}</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Medestra Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-right">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} د. ياسمين المناوي
          </div>
          <div dir="ltr" className="font-sans text-xs text-slate-400">
            Website designed by{' '}
            <a
              href="https://medestra.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4 transition-colors"
            >
              Medestra ®
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

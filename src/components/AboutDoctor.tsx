import React from 'react';
import { DOCTOR_INFO } from '../data/doctorData';
import { DoctorLogo } from './DoctorLogo';
import { Award, GraduationCap, Stethoscope, HeartHandshake, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AboutDoctorProps {
  onOpenBooking: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ onOpenBooking }) => {
  return (
    <section id="about-doctor" className="py-16 lg:py-24 bg-white border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Side: Clinic Desk + Logo Stamp */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-emerald-50 border border-emerald-900/10 shadow-xl aspect-[4/3]">
              <img
                src="/photos/alibrary.webp"
                alt="عيادة د. ياسمين عصام المناوي للتغذية العلاجية"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-emerald-950/15 to-transparent" />
              
              <div className="absolute bottom-4 right-5 left-24 text-white text-right">
                <span className="text-xs font-bold text-emerald-300 block mb-0.5">
                  رعاية سريرية مبنية على الدليل العلمي
                </span>
                <p className="text-sm font-semibold">
                  خطط تغذية علاجية مصممة خصيصاً لكل حالة
                </p>
              </div>
            </div>

            {/* Official Logo Emblem floating badge positioned on bottom-left so it never overlaps RTL caption */}
            <div className="absolute -bottom-5 left-2 sm:-bottom-6 sm:-left-6 z-20 bg-white p-1.5 sm:p-2 rounded-full shadow-2xl border border-emerald-100 scale-80 sm:scale-100 origin-bottom-left">
              <DoctorLogo size={90} variant="full-badge" />
            </div>
          </div>

          {/* Text & Credentials Side */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>المسيرة الأكاديمية والخبرة الإكلينيكية</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
              عن دكتورة ياسمين عصام المناوي
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              أخصائية التغذية العلاجية وإدارة السمنة والنحافة، ومحاضرة ومدربة معتمدة. تجمع بين الفهم العميق لكيمياء الجسم الحيوية (Biochemistry) والخبرة السريرية لأكثر من 8 سنوات لتقديم أنظمة غذائية آمنة ومستدامة تحقق أهدافك دون حرمان قاسي.
            </p>

            {/* 3 Core Highlight Pillars from CV */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
              <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 text-right">
                <span className="text-xs font-extrabold text-emerald-800 block">ماجستير كيمياء حيوية</span>
                <span className="text-[11px] text-slate-500 font-medium">كلية الصيدلة، جامعة الأزهر</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 text-right">
                <span className="text-xs font-extrabold text-emerald-800 block">دبلوم التغذية الإكلينيكية</span>
                <span className="text-[11px] text-slate-500 font-medium">كلية الصيدلة، جامعة المنصورة</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-slate-200/80 text-right">
                <span className="text-xs font-extrabold text-emerald-800 block">+8 سنوات خبرة</span>
                <span className="text-[11px] text-slate-500 font-medium">سمنة وتكميم وتجميل ورياضيين</span>
              </div>
            </div>

            {/* Philosophy Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-900/15 mb-6 text-slate-800 w-full">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>فلسفة د. ياسمين في العلاج:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{DOCTOR_INFO.philosophy}"
              </p>
            </div>

            {/* Core Credentials Checklist (concise & high-impact) */}
            <div className="space-y-2.5 mb-8 w-full">
              {DOCTOR_INFO.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 shadow-md transition-all active:scale-[0.98]"
              >
                <Stethoscope className="w-4 h-4 text-emerald-200" />
                <span>احجز استشارتك مع د. ياسمين</span>
              </button>

              <a
                href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم د. ياسمين عصام المناوي 🌿، أود الاستفسار عن تفاصيل الحجز والمتابعة.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-700 bg-[#F8FAF8] hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <WhatsAppIcon size={18} className="text-[#25D366]" />
                <span>استفسار واتساب مباشر</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

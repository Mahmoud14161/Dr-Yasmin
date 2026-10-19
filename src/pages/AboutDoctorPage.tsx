import React from 'react';
import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { AboutDoctor } from '../components/AboutDoctor';
import { GraduationCap, Award, BookOpen, Stethoscope, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

interface AboutDoctorPageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
}

export const AboutDoctorPage: React.FC<AboutDoctorPageProps> = ({
  onGoHome,
  onOpenBooking
}) => {
  const milestones = [
    {
      year: '2024',
      title: 'ماجستير في الكيمياء الحيوية (Master of Science in Biochemistry)',
      place: 'كلية الصيدلة (بنات)، جامعة الأزهر',
      desc: 'بحث متخصص في المسارات الأيضية والكيمياء الحيوية لتنظيم التمثيل الغذائي وهرمونات الحرق والجوع.'
    },
    {
      year: '2024 - الآن',
      title: 'أخصائية تغذية ما بعد جراحات التجميل ونحت القوام',
      place: 'عيادات د. أحمد الشريفة',
      desc: 'تطبيق بروتوكولات غذائية سريرية متطورة لتسريع التئام الأنسجة وتصريف السوائل ومنع عودة الدهون الموضعية.'
    },
    {
      year: '2022 - الآن',
      title: 'أخصائية تغذية جراحات السمنة والتكميم (Bariatric Nutrition)',
      place: 'عيادات د. محمد عنان لجراحات السمنة',
      desc: 'إدارة مراحل التغذية المتدرجة (السوائل، المهروس، الأكل الصلب)، الوقاية من نقص الفيتامينات، وتثبيت الوزن.'
    },
    {
      year: '2020 - الآن',
      title: 'محاضرة ومدربة معتمدة في التغذية العلاجية',
      place: 'مؤتمرات ومنصات تدريب طبية معتمدة',
      desc: 'تدريب أكثر من 5,000 متخصص في الرعاية الصحية والصيادلة على التغذية الإكلينيكية وإدارة السمنة.'
    },
    {
      year: '2019',
      title: 'دبلوم التغذية الإكلينيكية والعلاجية (Clinical Nutrition Diploma)',
      place: 'كلية الصيدلة، جامعة المنصورة',
      desc: 'تخصص معتمد في التغذية الوريدية والمعوية وتغذية الأمراض المزمنة والأطفال والرياضيين.'
    },
    {
      year: '2014',
      title: 'بكالوريوس العلوم الصيدلية (Bachelor of Pharmacy)',
      place: 'كلية الصيدلة، جامعة الأزهر',
      desc: 'التخرج بتقدير تراكمي ممتاز مع مرتبة الشرف، مما أسس لفهم دوائي وعلاجي عميق لتفاعلات الغذاء مع الأدوية.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Header with Back Button */}
      <PageHeader
        title="دكتورة ياسمين عصام المناوي | السيرة المهنية والأكاديمية"
        subtitle="أخصائية التغذية العلاجية وإدارة السمنة والنحافة، باحثة في الكيمياء الحيوية، ومدربة معتمدة لأكثر من 5,000 كادر صحي."
        badge="السيرة الذاتية الرسمية"
        icon={<GraduationCap className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="طلب استشارة مع د. ياسمين"
      />

      {/* Main About Component */}
      <AboutDoctor onOpenBooking={onOpenBooking} />

      {/* Professional Milestones Timeline for this Dedicated Landing Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-8">
          
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              المحطات الأكاديمية والمهنية البارزة
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              تسلسل زمني موثق لمسيرة د. ياسمين عصام المناوي في الصيدلة الإكلينيكية والكيمياء الحيوية والتغذية العلاجية.
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:right-3.5 before:w-0.5 before:bg-emerald-100">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pr-1">
                <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">
                  {idx + 1}
                </div>

                <div className="flex-1 bg-[#F8FAF8] p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {m.title}
                    </h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg shrink-0 w-fit">
                      {m.year}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 block mb-2">
                    {m.place}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-slate-700 font-bold">
              هل تبحث عن خطة علاجية مخصصة تجمع بين العلم والخبرة العملية؟
            </span>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98"
            >
              احجز موعد كشفك مع د. ياسمين الآن
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="عن دكتورة ياسمين المناوي"
      />

    </div>
  );
};

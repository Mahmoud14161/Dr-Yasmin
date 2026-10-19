import React from 'react';
import { PageHeader, PageBottomReturn } from '../components/PageHeader';
import { FAQSection } from '../components/FAQSection';
import { HelpCircle, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface FAQPageProps {
  onGoHome: () => void;
  onOpenBooking: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onGoHome,
  onOpenBooking
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      
      {/* Header with Back Button */}
      <PageHeader
        title="مركز الأسئلة الشائعة والاستفسارات الطبية"
        subtitle="كل ما يدور في ذهنك حول التغذية العلاجية، أسباب ثبات الوزن، علاج مقاومة الإنسولين، وتفاصيل الحجز والكشف بالعيادة أو أونلاين."
        badge="دليل الإجابات الشامل"
        icon={<HelpCircle className="w-3.5 h-3.5 text-emerald-700" />}
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        bookingButtonLabel="حجز موعد استشارة"
      />

      {/* Main FAQ Component */}
      <FAQSection onOpenBooking={onOpenBooking} />

      {/* Direct Question Box if not answered */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            لم تجد إجابة على سؤالك أو حالتك الخاصة؟
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            يمكنك إرسال استفسارك الطبي أو تفاصيل حالتك الصحية مباشرة إلى فريق د. ياسمين المناوي عبر واتساب وسيتم الرد عليك في أقرب وقت.
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم د. ياسمين المناوي 🌿، لدي استفسار طبي بخصوص حالتي الصحية.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
            >
              <WhatsAppIcon size={18} />
              <span>إرسال استفسارك الطبي عبر واتساب العيادة</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Home Return Section */}
      <PageBottomReturn
        onGoHome={onGoHome}
        onOpenBooking={onOpenBooking}
        pageTitle="الأسئلة الشائعة"
      />

    </div>
  );
};

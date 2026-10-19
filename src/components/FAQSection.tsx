import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'من هي الدكتورة ياسمين المناوي وما هي مؤهلاتها العلمية؟',
    answer: 'دكتورة ياسمين المناوي هي أخصائية التغذية العلاجية وعلاج السمنة والنحافة، حاصلة على دبلوم التغذية العلاجية والإكلينيكية المعتمد من المعهد القومي للتغذية، وعضو الجمعية المصرية لدراسة السمنة (EMASO) والجمعية الأوروبية للتغذية السريرية والتمثيل الغذائي (ESPEN)، بخبرة تتجاوز 8 سنوات وأكثر من 4,500 حالة نجاح موثقة.',
    category: 'عن الدكتورة'
  },
  {
    question: 'كيف تساعد التغذية العلاجية في علاج مقاومة الإنسولين وتكيس المبايض (PCOS)؟',
    answer: 'يعتمد برنامج التغذية العلاجية لمقاومة الإنسولين على تنظيم حساسية مستقبلات الخلايا للإنسولين عبر أنظمة غذائية منخفضة المؤشر الجلايسيمي (Low Glycemic Index)، وتوزيع مدروس للنشويات المعقدة والألياف والدهون الصحية مع الصيام المتقطع الطبي. هذا الأسلوب يخفض السكر التراكمي (HbA1c) ومحيط الخصر، ويساعد على إعادة انتظام الهرمونات والتبويض لمرضى تكيس المبايض.',
    category: 'التغذية العلاجية'
  },
  {
    question: 'ما الفرق بين كشف العيادة والاستشارات الأونلاين (عن بُعد)؟',
    answer: 'كشف العيادة يتضمن فحصاً تفصيلياً بجهاز قياس مكونات الجسم (InBody Analysis) واستشارة شخصية مباشرة في فروع المنصورة (عيادة عدن، عيادة جيهان) وفرع سلامون. أما الاستشارات الأونلاين VIP، فتوفر جلسات فيديو مطولة عبر زووم، وتناسب المقيمين بجميع محافظات مصر أو المغتربين بالخارج، مع متابعة أسبوعية مستمرة عبر واتساب وتعديل الأنظمة دورياً بنفس الكفاءة والدقة.',
    category: 'الاستشارات والمواعيد'
  },
  {
    question: 'أين توجد فروع عيادات د. ياسمين المناوي وما هي مواعيد الكشف؟',
    answer: 'تستقبلكم د. ياسمين في المواعيد التالية: (1) المنصورة - عيادة عدن (مركز تجميل د. أحمد الشريفة) يوم الثلاثاء من 6:00 إلى 9:00 مساءً. (2) المنصورة - عيادة جيهان (عيادة د. محمد عنان لجراحات السمنة) يوم الأحد من 4:00 إلى 7:00 مساءً. (3) فرع سلامون يوم الأربعاء من 4:00 إلى 11:00 مساءً. بالإضافة للمتابعة الأونلاين طوال أيام الأسبوع بمواعيد حجز مسبقة.',
    category: 'الفروع والمواعيد'
  },
  {
    question: 'كم كيلو جراماً يمكن خسارته شهرياً بأمان وبدون حرمان قاسي؟',
    answer: 'المعدل الطبي والصحي عالمياً لنزول الوزن المستدام هو بين 4 إلى 8 كيلوجرامات شهرياً (دهون صافية)، مع الحفاظ على الكتلة العضلية وتجنب ترهل الجلد أو إبطاء معدل الحرق الأيضي. البرامج مع د. ياسمين تعتمد على عجز سعرات ذكي مرن يمنحك الطاقة والشبع التام دون تجويع.',
    category: 'خسارة الوزن'
  },
  {
    question: 'هل توجد خطة تثبيت وزن تضمن عدم استعادة الكيلوغرامات المفقودة؟',
    answer: 'نعم، مرحلة التثبيت (Weight Maintenance) ركن أساسي في خطة د. ياسمين العلاجية؛ حيث يتم رفع السعرات تدريجياً لضبط نقطة التوازن الوزني (Set Point) وتدريب الجسم على حرق السعرات الإضافية ليتحول نمط الحياة الصحي إلى عادة دائمة.',
    category: 'تثبيت الوزن'
  },
  {
    question: 'كيف يمكن حجز موعد استشارة مع د. ياسمين المناوي؟',
    answer: 'يمكنك الحجز مباشرة عبر الموقع بالضغط على زر "احجز استشارتك الآن" واختيار نوع الكشف، حيث يتم إرسال بياناتك فوراً عبر واتساب العيادة لتأكيد الموعد بأسرع وقت، أو من خلال الاتصال هاتفياً على الرقم الرسمي للعيادة.',
    category: 'الحجز والتواصل'
  }
];

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-emerald-950/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-emerald-800 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>إجابات معتمدة طبياً</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            الأسئلة الشائعة حول التغذية العلاجية وعيادة د. ياسمين المناوي
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            كل ما يهمك معرفته حول برامج علاج السمنة والنحافة، إدارة مقاومة الإنسولين، وآلية المتابعة والكشف.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-12">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F8FAF8] border-emerald-700/40 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] font-semibold text-emerald-800">
                      التصنيف: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Booking CTA Box inside FAQ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              لديك استفسار خاص بحالتك الصحية؟
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              فريق د. ياسمين المناوي جاهز للرد على كافة استفساراتك وتحديد الخطة الأنسب لك.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-emerald-950 bg-white hover:bg-emerald-50 transition-colors shadow-md shrink-0 active:scale-98"
          >
            تواصل واحجز كشفك الآن
          </button>
        </div>

      </div>
    </section>
  );
};

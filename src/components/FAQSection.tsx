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
    question: 'كيف تساعد التغذية العلاجية في علاج مقاومة الإنسولين وتكيس المبايض؟',
    answer: 'من خلال نظام متوازن منخفض المؤشر الجلايسيمي يحسن حساسية الخلايا للإنسولين، يخفض التراكمي، ويعيد انتظام الهرمونات بدون حرمان.',
    category: 'التغذية العلاجية'
  },
  {
    question: 'ما الفرق بين كشف العيادة والمتابعة الأونلاين؟',
    answer: 'كشف العيادة يشمل فحص InBody واستشارة مباشرة في فروع المنصورة وسلامون، بينما المتابعة الأونلاين تتم عبر زووم وواتساب أسبوعياً بنفس الدقة لجميع المحافظات والدول.',
    category: 'المواعيد'
  },
  {
    question: 'كم كيلو يمكن خسارته شهرياً بأمان؟',
    answer: 'المعدل الصحي الآمن هو من 4 إلى 8 كجم دهون صافية شهرياً مع الحفاظ على الكتلة العضلية ومنع الترهلات.',
    category: 'خسارة الوزن'
  },
  {
    question: 'هل توجد خطة لتثبيت الوزن بعد الوصول للهدف؟',
    answer: 'نعم، تشمل البرامج مرحلة تثبيت متكاملة لتدريب الجسم على الحفاظ على الوزن الجديد مدى الحياة.',
    category: 'تثبيت الوزن'
  }
];

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 lg:py-20 bg-white border-b border-emerald-950/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>إجابات سريعة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            الأسئلة الشائعة
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
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
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


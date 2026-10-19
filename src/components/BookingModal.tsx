import React, { useState, useEffect } from 'react';
import { DOCTOR_INFO, Program } from '../data/doctorData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Calendar, MessageSquare, CheckCircle, Clock, User, Phone, Scale, Copy, Check, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledData?: {
    bmi?: string;
    weight?: number;
    height?: number;
    goal?: string;
    tdee?: number;
    programTitle?: string;
    branch?: 'aden' | 'jihan' | 'salamon' | 'online';
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledData
}) => {
  const [consultationType, setConsultationType] = useState<'clinic' | 'online'>('clinic');
  const [clinicLocation, setClinicLocation] = useState<'aden' | 'jihan' | 'salamon'>('aden');
  const [programType, setProgramType] = useState<string>('برنامج الرشاقة ونحت القوام المكثف');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [preferredDay, setPreferredDay] = useState<string>('حسب موعد الفرع');
  const [preferredTime, setPreferredTime] = useState<string>('الفترة المحددة للعيادة');
  const [healthNotes, setHealthNotes] = useState<string>('');
  
  const [copied, setCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Sync prefilled data if passed
  useEffect(() => {
    if (prefilledData) {
      if (prefilledData.programTitle) {
        setProgramType(prefilledData.programTitle);
      }
      if (prefilledData.weight) {
        setWeight(String(prefilledData.weight));
      }
      if (prefilledData.height) {
        setHeight(String(prefilledData.height));
      }
      if (prefilledData.goal) {
        setHealthNotes(`الهدف المحسوب من الحاسبة: ${prefilledData.goal} | مؤشر الكتلة: ${prefilledData.bmi || ''}`);
      }
      if (prefilledData.branch) {
        if (prefilledData.branch === 'online') {
          setConsultationType('online');
        } else {
          setConsultationType('clinic');
          setClinicLocation(prefilledData.branch);
        }
      }
    }
  }, [prefilledData]);

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    let branchDetails = '';
    if (clinicLocation === 'aden') {
      branchDetails = 'المنصورة: عيادة عدن (مركز تجميل د. أحمد الشريفة) - الثلاثاء من 6 إلى 9 م';
    } else if (clinicLocation === 'jihan') {
      branchDetails = 'المنصورة: عيادة جيهان (عيادة د. محمد عنان لجراحات السمنة) - الأحد من 4 إلى 7 م';
    } else if (clinicLocation === 'salamon') {
      branchDetails = 'فرع سلامون - الأربعاء من 4 إلى 11 م';
    }

    const consultationText = consultationType === 'clinic'
      ? `كشف حضوري بالعيادة [${branchDetails}]`
      : 'استشارة أونلاين VIP (عبر زووم وواتساب)';

    return `السلام عليكم د. ياسمين المناوي 🌿
أود تأكيد حجز موعد استشارة تغذية علاجية:

📋 بيانات الحجز:
• الاسم: ${fullName || 'لم يُحدد'}
• رقم الهاتف: ${phone || 'لم يُحدد'}
• نوع ومكان الاستشارة: ${consultationText}
• البرنامج المطلوب: ${programType}

🩺 البيانات الجسدية:
• العمر: ${age ? `${age} سنة` : 'غير محدد'}
• الوزن الحالي: ${weight ? `${weight} كجم` : 'غير محدد'}
• الطول: ${height ? `${height} سم` : 'غير محدد'}
${prefilledData?.bmi ? `• مؤشر كتلة الجسم المحسوب: ${prefilledData.bmi}` : ''}
${healthNotes ? `• ملاحظات وتاريخ صحي: ${healthNotes}` : ''}

🗓 الموعد المفضل:
• اليوم: ${preferredDay}
• التوقيت: ${preferredTime}

شاكر جداً وفي انتظار تأكيد الموعد النهائي من فريق العيادة.`;
  };

  const handleConfirmAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encoded}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-950/15 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 mb-1">
              <Calendar className="w-4 h-4" />
              <span>نظام الحجز الذكي المباشر</span>
            </div>
            <h3 className="text-xl font-bold">
              حجز موعد استشارة مع د. ياسمين المناوي
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="إغلاق النافذة"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold text-slate-900">
              تم تجهيز طلب الحجز بنجاح!
            </h4>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              تم تحويلك إلى تطبيق واتساب لإرسال بيانات الحجز مباشرة إلى فريق د. ياسمين المناوي لتأكيد الموعد فوراً.
            </p>

            {/* Copy button fallback */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم نسخ الرسالة!' : 'نسخ نص الحجز'}</span>
              </button>

              <button
                type="button"
                onClick={() => { setSubmitted(false); onClose(); }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-800 hover:bg-emerald-900 transition-colors"
              >
                إغلاق والعودة للموقع
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleConfirmAndSend} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Consultation Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. نوع الاستشارة المطلوبة
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('clinic')}
                  className={`p-3.5 rounded-2xl border text-right transition-all font-semibold text-xs flex flex-col justify-between gap-1 ${
                    consultationType === 'clinic'
                      ? 'bg-emerald-50 border-emerald-700 text-emerald-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-sm">كشف بالعيادة (حضوري)</span>
                  <span className="text-[11px] text-slate-500">فحص InBody + استشارة وجه لوجه</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('online')}
                  className={`p-3.5 rounded-2xl border text-right transition-all font-semibold text-xs flex flex-col justify-between gap-1 ${
                    consultationType === 'online'
                      ? 'bg-emerald-50 border-emerald-700 text-emerald-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-sm">استشارة أونلاين VIP</span>
                  <span className="text-[11px] text-slate-500">زووم وواتساب (للمحافظات والدول)</span>
                </button>
              </div>

              {/* Clinic Branch if clinic selected */}
              {consultationType === 'clinic' && (
                <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 block">اختر الفرع والموعد الأنسب لك:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setClinicLocation('aden')}
                      className={`p-2.5 rounded-xl font-bold text-right transition-all flex flex-col justify-between ${
                        clinicLocation === 'aden'
                          ? 'bg-emerald-800 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">المنصورة (عيادة عدن)</span>
                      <span className={`text-[10px] mt-1 font-medium ${clinicLocation === 'aden' ? 'text-emerald-100' : 'text-slate-500'}`}>
                        مركز د. أحمد الشريفة · الثلاثاء 6-9م
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setClinicLocation('jihan')}
                      className={`p-2.5 rounded-xl font-bold text-right transition-all flex flex-col justify-between ${
                        clinicLocation === 'jihan'
                          ? 'bg-emerald-800 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">المنصورة (عيادة جيهان)</span>
                      <span className={`text-[10px] mt-1 font-medium ${clinicLocation === 'jihan' ? 'text-emerald-100' : 'text-slate-500'}`}>
                        د. محمد عنان · الأحد 4-7م
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setClinicLocation('salamon')}
                      className={`p-2.5 rounded-xl font-bold text-right transition-all flex flex-col justify-between ${
                        clinicLocation === 'salamon'
                          ? 'bg-emerald-800 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs">فرع سلامون</span>
                      <span className={`text-[10px] mt-1 font-medium ${clinicLocation === 'salamon' ? 'text-emerald-100' : 'text-slate-500'}`}>
                        عيادة سلامون · الأربعاء 4-11م
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Program Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                2. البرنامج العلاجي المطلوب
              </label>
              <select
                value={programType}
                onChange={(e) => setProgramType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm"
              >
                <option value="برنامج الرشاقة ونحت القوام المكثف">برنامج الرشاقة ونحت القوام المكثف</option>
                <option value="برنامج التغذية العلاجية لمقاومة الإنسولين والسكر">برنامج التغذية العلاجية لمقاومة الإنسولين والسكر</option>
                <option value="برنامج علاج النحافة وزيادة الوزن الصحية">برنامج علاج النحافة وزيادة الوزن الصحية</option>
                <option value="برنامج تغذية الحوامل والمرضعات والأطفال">برنامج تغذية الحوامل والمرضعات والأطفال</option>
                <option value="باقة المتابعة أونلاين VIP الدولية">باقة المتابعة أونلاين VIP الدولية</option>
              </select>
            </div>

            {/* Step 3: Patient Info */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                3. بيانات المراجع
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="الاسم ثلاثي *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="رقم الواتساب للتأكيد *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                  />
                </div>
              </div>

              {/* Age, Weight, Height Grid */}
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="العمر"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-center text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                />
                <input
                  type="number"
                  placeholder="الوزن (كجم)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-center text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                />
                <input
                  type="number"
                  placeholder="الطول (سم)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-center text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                />
              </div>

              {/* Notes */}
              <textarea
                rows={2}
                placeholder="ملاحظات صحية (أمراض مزمنة، أدوية، عمليات سابقة إن وجدت)..."
                value={healthNotes}
                onChange={(e) => setHealthNotes(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
              />
            </div>

            {/* Step 4: Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اليوم المفضل
                </label>
                <input
                  type="text"
                  value={preferredDay}
                  onChange={(e) => setPreferredDay(e.target.value)}
                  placeholder="مثال: السبت القادم"
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الفترة الزمنية
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="الفترة الصباحية (11 ص - 3 م)">الفترة الصباحية (11 ص - 3 م)</option>
                  <option value="الفترة المسائية (5 م - 9 م)">الفترة المسائية (5 م - 9 م)</option>
                  <option value="أي وقت متاح بالعيادة">أي وقت متاح بالعيادة</option>
                </select>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-emerald-800 hover:bg-emerald-900 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={22} className="text-[#25D366] shrink-0" />
                <span>تأكيد الحجز وإرسال التفاصيل عبر واتساب فوراً</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <span>يتم الرد والتأكيد خلال ساعات العمل بواسطة فريق العيادة</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

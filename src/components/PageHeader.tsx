import React from 'react';
import { ArrowRight, Home, Calendar } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon?: React.ReactNode;
  onGoHome: () => void;
  onOpenBooking?: () => void;
  bookingButtonLabel?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  icon,
  onGoHome,
  onOpenBooking,
  bookingButtonLabel = 'حجز موعد استشارة'
}) => {
  return (
    <div className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-[#F3F7F3] via-[#F8FAF8] to-white border-b border-emerald-950/10 overflow-hidden">
      {/* Decorative backdrop blur */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation & Breadcrumbs Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          
          {/* Prominent Back Button to Return to Home */}
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200/80 shadow-sm transition-all duration-200 font-bold text-xs sm:text-sm active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-600"
            title="الرجوع إلى الصفحة الرئيسية"
          >
            <ArrowRight className="w-4 h-4 text-emerald-700 transition-transform duration-200 group-hover:translate-x-1" />
            <span>العودة للصفحة الرئيسية</span>
          </button>

          {/* Clean Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 text-slate-600 hover:text-emerald-800 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-900 font-bold">{title}</span>
          </nav>

        </div>

        {/* Title, Badge & Subtitle */}
        <div className="max-w-3xl text-right">
          {badge && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-lg mb-3">
              {icon}
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 text-balance">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {/* Quick Action Button if provided */}
          {onOpenBooking && (
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-800 hover:bg-emerald-900 shadow-md transition-all active:scale-98"
              >
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span>{bookingButtonLabel}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

interface PageBottomReturnProps {
  onGoHome: () => void;
  onOpenBooking?: () => void;
  pageTitle?: string;
}

export const PageBottomReturn: React.FC<PageBottomReturnProps> = ({
  onGoHome,
  onOpenBooking,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-700/30">
        <div className="text-center md:text-right">
          <span className="text-xs font-semibold text-emerald-300 block mb-1">
            العيادة التخصصية د. ياسمين المناوي
          </span>
          <h3 className="text-lg sm:text-xl font-bold">
            هل ترغب في العودة لتصفح الصفحة الرئيسية؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            يمكنك الرجوع للصفحة الرئيسية لمشاهدة بقية الأقسام والحاسبات التفاعلية أو حجز موعد مباشر.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <ArrowRight className="w-4 h-4 text-emerald-800 transition-transform group-hover:translate-x-1" />
            <span>العودة للصفحة الرئيسية</span>
          </button>

          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 border border-emerald-500/40 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>طلب حجز استشارة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

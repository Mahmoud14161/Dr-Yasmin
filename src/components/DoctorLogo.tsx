import React from 'react';

interface DoctorLogoProps {
  className?: string;
  size?: number;
  variant?: 'full-badge' | 'compact-inline';
}

export const DoctorLogo: React.FC<DoctorLogoProps> = ({
  className = '',
  size = 56,
  variant = 'full-badge'
}) => {
  if (variant === 'compact-inline') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 select-none ${className}`}>
        <div 
          className="relative rounded-full flex items-center justify-center bg-white border border-emerald-900/10 shadow-sm shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <img
            src="/photos/logo.webp"
            alt="لوجو د. ياسمين المناوي"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col text-right shrink-0 whitespace-nowrap">
          <span className="font-bold text-slate-900 text-sm sm:text-base md:text-lg tracking-tight leading-tight">
            د. ياسمين المناوي
          </span>
          <span className="text-[11px] sm:text-xs text-emerald-800 font-medium tracking-wide">
            أخصائية التغذية العلاجية والسمنة
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-full select-none overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      title="Dr. Yassmin Elmenawy · Clinical Nutritionist"
    >
      <img
        src="/photos/logo.webp"
        alt="شعار د. ياسمين المناوي - أخصائية التغذية العلاجية"
        className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-[1.03]"
      />
    </div>
  );
};

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
          className="relative rounded-full flex items-center justify-center bg-[#FAF7F2] border-2 border-[#2F5233] shadow-sm shrink-0"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full p-1" aria-hidden="true">
            {/* Outer rings */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="#2F5233" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#2F5233" strokeWidth="1" strokeDasharray="3 2" />
            {/* Stethoscope & Leaf Motif */}
            <path
              d="M50 24 C50 24, 62 34, 62 48 C62 56, 56 62, 50 62 C44 62, 38 56, 38 48 C38 34, 50 24, 50 24 Z"
              fill="#2F5233"
              opacity="0.9"
            />
            <path
              d="M50 30 L50 56 M44 42 L56 42"
              stroke="#FAF7F2"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Target icon accents */}
            <circle cx="20" cy="50" r="4" fill="#2F5233" />
            <circle cx="80" cy="50" r="4" fill="#2F5233" />
          </svg>
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
      className={`relative rounded-full select-none ${className}`}
      style={{ width: size, height: size }}
      title="Dr. Yassmin Elmenawy · Clinical Nutritionist"
    >
      <svg 
        viewBox="0 0 300 300" 
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
        aria-label="شعار د. ياسمين المناوي - أخصائية التغذية العلاجية"
      >
        <defs>
          {/* Top text arc */}
          <path
            id="textPathTop"
            d="M 50,150 A 100,100 0 1,1 250,150"
            fill="none"
          />
          {/* Bottom text arc */}
          <path
            id="textPathBottom"
            d="M 250,150 A 100,100 0 0,1 50,150"
            fill="none"
          />
          <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCFAF6" />
            <stop offset="100%" stopColor="#F5EFE6" />
          </linearGradient>
        </defs>

        {/* Outer Circular Base */}
        <circle cx="150" cy="150" r="144" fill="url(#badgeBg)" stroke="#355E3B" strokeWidth="5" />
        <circle cx="150" cy="150" r="136" fill="none" stroke="#355E3B" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="88" fill="none" stroke="#355E3B" strokeWidth="3.5" />

        {/* Top Text: DR. YASSMIN ELMENAWY */}
        <text
          fill="#2C4C30"
          fontSize="18"
          fontWeight="800"
          letterSpacing="4"
          textAnchor="middle"
        >
          <textPath href="#textPathTop" startOffset="50%">
            DR. YASSMIN ELMENAWY
          </textPath>
        </text>

        {/* Bottom Text: CLINICAL NUTRITIONIST */}
        <text
          fill="#2C4C30"
          fontSize="17"
          fontWeight="800"
          letterSpacing="3.5"
          textAnchor="middle"
        >
          <textPath href="#textPathBottom" startOffset="50%">
            CLINICAL NUTRITIONIST
          </textPath>
        </text>

        {/* Side Accents: Target / Goal Bullseye Icons */}
        <g transform="translate(26, 150)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#355E3B" strokeWidth="2" />
          <circle cx="0" cy="0" r="7" fill="none" stroke="#355E3B" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#355E3B" />
          <path d="M-15 0 L15 0 M0 -15 L0 15" stroke="#355E3B" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>
        <g transform="translate(274, 150)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#355E3B" strokeWidth="2" />
          <circle cx="0" cy="0" r="7" fill="none" stroke="#355E3B" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#355E3B" />
          <path d="M-15 0 L15 0 M0 -15 L0 15" stroke="#355E3B" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        {/* Central Core Emblem: Balanced Health Leaf & Caduceus Cadre */}
        <circle cx="150" cy="150" r="80" fill="#FFFFFF" fillOpacity="0.85" />
        <g transform="translate(150, 150)">
          {/* Stylized organic leaf & medical cross */}
          <path
            d="M0 -55 C25 -30 35 5 18 35 C6 55 -25 50 -32 28 C-38 6 -20 -28 0 -55 Z"
            fill="#355E3B"
            opacity="0.95"
          />
          <path
            d="M0 -42 C-2 -20 -6 10 0 35"
            stroke="#FCFAF6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M-14 -12 L14 -12 M-18 6 L18 6"
            stroke="#FCFAF6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Subtle star / precision point */}
          <circle cx="0" cy="46" r="3" fill="#355E3B" />
        </g>
      </svg>
    </div>
  );
};

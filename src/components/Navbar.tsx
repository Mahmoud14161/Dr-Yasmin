import React, { useState } from 'react';
import { DoctorLogo } from './DoctorLogo';
import { Menu, X, Calendar, ArrowRight, Home } from 'lucide-react';

export type PageView =
  | 'home'
  | 'calculator'
  | 'programs'
  | 'transformations'
  | 'meal-guide'
  | 'branches'
  | 'faq'
  | 'about';

interface NavbarProps {
  currentPage?: PageView;
  onNavigate?: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'الرئيسية', page: 'home' },
    { label: 'حاسبة السعرات', page: 'calculator' },
    { label: 'البرامج العلاجية', page: 'programs' },
    { label: 'قصص النجاح', page: 'transformations' },
    { label: 'جدول الوجبات', page: 'meal-guide' },
    { label: 'الفروع والمواعيد', page: 'branches' },
    { label: 'الأسئلة الشائعة', page: 'faq' },
    { label: 'عن الدكتورة', page: 'about' },
  ];

  const handleLinkClick = (page: PageView) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    } else {
      const element = document.getElementById(page === 'home' ? 'home' : page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isSubPage = currentPage !== 'home';

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAF8]/95 backdrop-blur-md border-b border-emerald-950/10 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        
        {/* Zone 1: Brand & Logo (Always shrink-0 to prevent overlap) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <button 
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 sm:gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl p-0.5 sm:p-1 text-right transition-transform active:scale-[0.98]"
            title="الصفحة الرئيسية - د. ياسمين المناوي"
          >
            <DoctorLogo size={40} variant="compact-inline" />
          </button>

          {/* Quick Subpage Home Return Button on large screens */}
          {isSubPage && (
            <button
              onClick={() => handleLinkClick('home')}
              className="hidden lg:inline-flex xl:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-xs text-xs font-bold transition-all active:scale-95 group shrink-0"
              title="الرجوع إلى الصفحة الرئيسية"
            >
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700 transition-transform group-hover:translate-x-1" />
              <span>العودة للرئيسية</span>
            </button>
          )}
        </div>

        {/* Zone 2: Navigation Links (Shown on XL screens to guarantee zero overlap) */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 text-sm font-semibold text-slate-700 shrink-0">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                type="button"
                onClick={() => handleLinkClick(link.page)}
                className={`relative px-2.5 py-1.5 rounded-xl text-xs 2xl:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-950 bg-emerald-100/90 border border-emerald-300 shadow-xs'
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/80'
                }`}
              >
                {link.page === 'home' && (
                  <Home className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-800' : 'text-slate-400'}`} />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions & Mobile/Tablet Menu */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Quick Home Return on mobile & tablet when inside a subpage */}
          {isSubPage && (
            <button
              onClick={() => handleLinkClick('home')}
              className="inline-flex lg:hidden items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs shadow-xs active:scale-95 transition-all"
              title="العودة للصفحة الرئيسية"
            >
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
              <span>الرئيسية</span>
            </button>
          )}

          {/* Compact Booking Button on Mobile + Full on Desktop */}
          {!isSubPage && (
            <button
              onClick={onOpenBooking}
              className="inline-flex sm:hidden items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs text-white bg-emerald-800 active:scale-95 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-200" />
              <span>احجز</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm transition-all duration-200 whitespace-nowrap shrink-0 hover:shadow active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <Calendar className="w-4 h-4 text-emerald-200" />
            <span>احجز استشارتك الآن</span>
          </button>

          {/* Menu Button for screens below XL */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200/80 transition-colors focus:outline-none active:scale-95"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-emerald-950/10 px-4 pt-3 pb-6 shadow-xl max-h-[calc(100dvh-4rem)] overflow-y-auto animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => handleLinkClick(link.page)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors text-right flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {link.page === 'home' && <Home className="w-4 h-4 text-emerald-700" />}
                    <span>{link.label}</span>
                  </div>
                  {isActive && (
                    <span className="text-xs bg-emerald-700 text-white px-2 py-0.5 rounded-md font-semibold">
                      الحالية
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>حجز موعد كشف أو أونلاين</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

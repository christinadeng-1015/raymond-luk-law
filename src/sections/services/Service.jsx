import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ServicesTabs from './ServicesTabs';
import OptimizedImage from '../../components/OptimizedImage';

export function Service() {
  const { pathname } = useLocation();
  const { t } = useTranslation('services');
  const services = t('services', { returnObjects: true });
  const scrollContainerRef = useRef(null);

  if (!Array.isArray(services)) return null;

  const service = services.find((s) => s.path === pathname);

  if (!service) {
    return null;
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-16 antialiased font-sans text-slate-800">
      <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
        <OptimizedImage
          src="assets/banner/law.jpg"
          alt={service.title || 'Service Banner'}
          originalFormat="jpg"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
            {service.title}
          </h1>
          <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
        </div>
      </div>

      <nav className="sticky top-0  bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto relative flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-40 flex items-center justify-start pl-2 pointer-events-none">
            <button
              onClick={() => scroll('left')}
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-white border border-slate-200 text-slate-600 rounded-full shadow-md transition-all hover:bg-slate-50 hover:text-amber-600 focus:outline-none pointer-events-auto"
              aria-label="Scroll Left"
            >
              <FiChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-1 py-3 md:py-4 w-full overflow-x-auto whitespace-nowrap scrollbar-none snap-x px-12 md:px-20"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((item) => {
              const isActive = pathname === item.path;
              return (
                <div
                  key={item.path}
                  className="relative flex-shrink-0 snap-center"
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 md:px-5 py-2.5 rounded-xl text-sm md:text-[15px] font-semibold text-center transition-all duration-200 block ${
                      isActive
                        ? 'text-[#10284e] bg-slate-100/80'
                        : 'text-slate-500 hover:text-[#10284e] hover:bg-slate-50'
                    }`}
                  >
                    {item.title}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-amber-500 rounded-full" />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-40 flex items-center justify-end pr-2 pointer-events-none">
            <button
              onClick={() => scroll('right')}
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-white border border-slate-200 text-slate-600 rounded-full shadow-md transition-all hover:bg-slate-50 hover:text-amber-600 focus:outline-none pointer-events-auto"
              aria-label="Scroll Right"
            >
              <FiChevronRight className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
      </nav>

      {service.desc && (
        <div className="max-w-7xl mx-auto my-12 px-4 sm:px-8 lg:px-12">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_-4px_rgba(16,40,78,0.04)] p-8 md:p-12 flex flex-col-reverse md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 flex-1 text-left max-w-4xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-sans block mb-1">
                  Overview
                </span>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#10284e] tracking-tight">
                  {service.title}
                </h2>
              </div>
              <p className="text-[15px] md:text-base leading-relaxed text-slate-600 font-normal">
                {service.desc}
              </p>
            </div>

            {service.icon && (
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-4 border border-slate-100 shadow-sm">
                <OptimizedImage
                  src={`assets/icons/${service.icon}`}
                  alt={`${service.title} icon`}
                  originalFormat="png"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {service.tabs && service.tabs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-4">
          <ServicesTabs tabs={service.tabs} />
        </div>
      )}
    </div>
  );
}

export default Service;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Testimonials = () => {
  const { t } = useTranslation('main');
  const reviews = t('reviews', { returnObjects: true }) || [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!reviews.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (!reviews.length) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="relative w-full min-h-[35vh] flex flex-col justify-center py-16 bg-gradient-to-b from-slate-900 to-[#10284e] antialiased text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_50%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-black/[0.15] pointer-events-none z-0" />

      <div className="w-full px-4 md:px-12 relative z-10 mx-auto">
        <div className="relative w-full flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 p-3 rounded-full bg-white/[0.02] border border-white/5 text-white/40 hover:text-amber-400 hover:bg-white/[0.06] hover:border-white/10 transition-all focus:outline-none backdrop-blur-xs shadow-sm z-20"
            aria-label="Previous slide"
          >
            <HiOutlineChevronLeft className="text-xl md:text-2xl" />
          </button>

          <div className="grid w-full max-w-4xl mx-auto px-12 md:px-24">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out
                  ${
                    index === activeIndex
                      ? 'opacity-100 pointer-events-auto scale-100'
                      : 'opacity-0 pointer-events-none scale-95'
                  }`}
              >
                <span
                  className="text-5xl md:text-6xl font-serif text-amber-500/70 select-none leading-none mb-2"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  “
                </span>

                <p
                  className="text-sm md:text-base font-serif italic text-slate-100 leading-relaxed max-w-2xl"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {review.review}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-amber-500/60" />
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-amber-400/90">
                    {review.author}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 p-3 rounded-full bg-white/[0.02] border border-white/5 text-white/40 hover:text-amber-400 hover:bg-white/[0.06] hover:border-white/10 transition-all focus:outline-none backdrop-blur-xs shadow-sm z-20"
            aria-label="Next slide"
          >
            <HiOutlineChevronRight className="text-xl md:text-2xl" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-1.5 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none
                ${index === activeIndex ? 'bg-amber-500 scale-110' : 'bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import ContactForm from '../contact/ContactForm';

const Header = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { t } = useTranslation('navbar');
  const navbar = t('navbar', { returnObjects: true });
  const slides = navbar.slides || [];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (!slides.length) return null;

  return (
    <header
      id="header"
      className="relative w-full h-screen overflow-hidden bg-[#10284e] antialiased"
    >
      <div
        className="absolute top-1/2 left-1/2 w-full h-full bg-cover bg-no-repeat bg-[85%_center] md:bg-center -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage: `url(/assets/home/background.png)`,
          transform: `translate(-50%, -50%) translateY(${offsetY * 0.4}px)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/75 via-[#10284e]/40 to-transparent pointer-events-none z-10" />

      <div className="absolute inset-0 z-20 flex items-center px-2 md:px-16 lg:px-24">
        <div className="w-full max-w-4xl flex items-center justify-between gap-8">
          <button
            onClick={handlePrev}
            className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 transform active:scale-95 flex-shrink-0 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <IoIosArrowBack size={22} />
          </button>

          <div className="flex-1 text-left max-w-lg py-8">
            <div key={currentSlide} className="space-y-5">
              <div className="space-y-3">
                <h1
                  data-aos="fade-up"
                  className="text-white font-serif font-bold text-xl md:text-3xl lg:text-4xl tracking-tight leading-snug"
                  style={{
                    fontFamily:
                      'Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {slides[currentSlide].title}
                </h1>

                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              </div>

              <p
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-slate-200/90 tracking-normal text-sm md:text-base font-normal leading-relaxed max-w-md"
              >
                {slides[currentSlide].subtitle}
              </p>

              <div data-aos="fade-up" data-aos-delay="200" className="pt-2">
                <button
                  onClick={() =>
                    window.open(slides[currentSlide].url, '_blank')
                  }
                  className="inline-flex items-center text-xs md:text-sm font-semibold bg-white rounded-lg px-6 py-3 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  style={{ color: '#10284e' }}
                >
                  {slides[currentSlide].linkTitle}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 transform active:scale-95 flex-shrink-0 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <IoIosArrowForward size={22} />
          </button>
        </div>
      </div>

      <div
        className={`z-50 fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {isDrawerOpen && (
          <div className="relative p-8 h-full flex flex-col justify-center overflow-y-auto">
            <button
              onClick={handleDrawerToggle}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-lg"
              aria-label="Close form"
            >
              <IoMdClose size={28} />
            </button>
            <div className="w-full mt-8">
              <ContactForm />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

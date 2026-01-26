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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { t } = useTranslation('navbar');
  const navbar = t('navbar', { returnObjects: true });

  const slides = navbar.slides;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header id="header" className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 w-full h-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(/assets/home/home.jpg)`,
          transform: `translate(-50%, -50%) translateY(${offsetY * 0.5}px)`,
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full lg:w-2/3 h-full flex justify-between items-center px-4 md:px-20 mt-10">
        <button
          onClick={handlePrev}
          className="text-white hover:text-gray-300 transition duration-300 text-3xl md:text-4xl"
          aria-label="Previous slide"
        >
          <IoIosArrowBack />
        </button>
        <div className="relative w-full lg:w-1/2 text-center">
          <h1
            data-aos="zoom-out"
            className="text-white tracking-wide font-medium uppercase text-2xl md:text-3xl"
          >
            {slides[currentSlide].title}
          </h1>
          <hr className="h-px my-6 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-200 to-transparent opacity-100" />
          <h2
            data-aos="zoom-out"
            className="text-white tracking-wide text-base w-full px-6"
          >
            {slides[currentSlide].subtitle}
          </h2>
          <div className="pt-4">
            <button
              onClick={() => window.open(slides[currentSlide].url, '_blank')}
              className="text-md border-2 bg-white rounded-lg p-4 font-medium shadow-md transition-transform transform hover:scale-105 hover:shadow-lg mt-6"
              style={{ color: '#10284e' }}
            >
              {slides[currentSlide].linkTitle}
            </button>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="text-white hover:text-gray-300 transition duration-300 text-3xl md:text-4xl"
          aria-label="Next slide"
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div
        className={`z-40 fixed top-0 md:top-auto left-0 md:left-auto w-full md:w-1/4 h-full md:h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${isDrawerOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}
        md:right-0`}
      >
        {isDrawerOpen && (
          <div className="relative p-6 flex flex-col justify-center items-center h-full">
            <button
              onClick={handleDrawerToggle}
              className="z-50 absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
            >
              <IoMdClose />
            </button>
            <ContactForm />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

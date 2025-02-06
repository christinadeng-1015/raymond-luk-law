import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
  });

  const { t } = useTranslation('navbar');
  const navbar = t('navbar', { returnObjects: true });

  const slides = [
    { title: navbar.title, subtitle: navbar.subtitle },
    { title: 'Slide 2 Title', subtitle: 'Slide 2 Subtitle' },
    { title: 'Slide 3 Title', subtitle: 'Slide 3 Subtitle' },
  ];

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
          backgroundImage:
            'url(https://res.cloudinary.com/dyozsy6wx/image/upload/v1736993194/homepage_uvcqdg.jpg)',
          transform: `translate(-50%, -50%) translateY(${offsetY * 0.5}px)`,
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full lg:w-2/3 h-full flex justify-between items-center px-4 md:px-20 mt-10">
        <button
          onClick={handlePrev}
          className="text-white hover:text-gray-300 transition duration-300 text-3xl md:text-4xl"
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
              href="#"
              onClick={handleDrawerToggle}
              className="text-md border-2 bg-white rounded-lg p-4 font-medium shadow-md transition-transform transform hover:scale-105 hover:shadow-lg mt-6"
              style={{ color: '#10284e' }}
            >
              {navbar.googleDoc.title}
            </button>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="text-white hover:text-gray-300 transition duration-300 text-3xl md:text-4xl"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div
        className={`fixed bottom-0 md:bottom-auto md:right-0 w-full md:w-1/4 h-1/2 md:h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen
            ? 'translate-y-0 md:translate-x-0'
            : 'translate-y-full md:translate-x-full'
        }`}
      >
        <div className="relative p-4 flex flex-col justify-center items-center h-full">
          <button
            onClick={handleDrawerToggle}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
          <h5 className="text-xl font-medium text-gray-900 mb-4">
            Get in Touch
          </h5>
        </div>
      </div>
    </header>
  );
};

export default Header;

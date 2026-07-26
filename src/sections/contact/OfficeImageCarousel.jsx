import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../../components/OptimizedImage';

const OfficeImageCarousel = () => {
  const { t } = useTranslation('contact');
  const officeImages = t('officeImages', { returnObjects: true });
  const carouselRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrameId;

    const scroll = () => {
      if (!isHoveredRef.current && carousel) {
        carousel.scrollLeft += 0.8;
        // Seamless loop reset when scrolling past the first set of duplicated items
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!Array.isArray(officeImages) || officeImages.length === 0) {
    return null;
  }

  // Duplicate items for continuous seamless loop
  const displayImages = [...officeImages, ...officeImages];

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        ref={carouselRef}
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={() => (isHoveredRef.current = false)}
        className="flex overflow-x-auto space-x-4 w-full no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-64 sm:h-72 md:h-80 cursor-pointer overflow-hidden rounded-xl shadow-md group"
          >
            <OptimizedImage
              src={image}
              alt={`Office view ${(index % officeImages.length) + 1}`}
              originalFormat="jpg"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeImageCarousel;

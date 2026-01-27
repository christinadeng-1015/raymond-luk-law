import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const OfficeImageCarousel = () => {
  const { t } = useTranslation('contact');
  const officeImages = t('officeImages', { returnObjects: true });
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const startAutoScroll = () => {
      if (carousel) {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        const autoScroll = () => {
          scrollAmount += 0.8;
          if (scrollAmount >= maxScrollLeft) {
            carousel.scrollLeft = 0;
            scrollAmount = 0;
          } else {
            carousel.scrollLeft = scrollAmount;
          }
        };

        const interval = setInterval(autoScroll, 20);
        return () => clearInterval(interval);
      }
    };

    const stopAutoScroll = startAutoScroll();
    return stopAutoScroll;
  }, []);

  return (
    <div className="relative w-full md:w-3/5 lg:w-2/3 flex items-center justify-center overflow-hidden">
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden space-x-4 w-full max-w-screen-2xl scrollbar-hide"
      >
        {officeImages.concat(officeImages).map((image, index) => (
          <div key={index} className="flex-shrink-0 w-96 h-96 cursor-pointer">
            <img
              loading="lazy"
              src={image}
              alt={`Office ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeImageCarousel;

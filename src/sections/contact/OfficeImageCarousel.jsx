import React, { useRef, useEffect } from 'react';
import officeImage from '../../assets/office/office.jpeg';
import officeHourImage from '../../assets/office/office-hour.jpg';
import office1Image from '../../assets/office/office-1.jpg';
import office2Image from '../../assets/office/office-2.jpg';
import office3Image from '../../assets/office/office-3.jpeg';

const OfficeImageCarousel = () => {
  const lists = ['office-hour', 'office-1', 'office-2', 'office', 'office-3'];
  const images = {
    office: officeImage,
    'office-hour': officeHourImage,
    'office-1': office1Image,
    'office-2': office2Image,
    'office-3': office3Image,
  };

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
        {lists.concat(lists).map((image, index) => (
          <div key={index} className="flex-shrink-0 w-96 h-96 cursor-pointer">
            <img
              src={images[image]}
              alt={index}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeImageCarousel;

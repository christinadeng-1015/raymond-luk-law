import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import officeImage from "../../assets/office/office.jpeg";
import officeHourImage from "../../assets/office/office-hour.jpg";
import office1Image from "../../assets/office/office-1.jpg";
import office2Image from "../../assets/office/office-2.jpg";
import office3Image from "../../assets/office/office-3.jpeg";

const OfficeImageCarousel = () => {
  const lists = ["office-hour", "office-1", "office-2", "office", "office-3"];
  const images = {
    office: officeImage,
    "office-hour": officeHourImage,
    "office-1": office1Image,
    "office-2": office2Image,
    "office-3": office3Image,
  };

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full md:w-3/5 lg:w-2/3 flex items-center justify-center">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 p-2 bg-white text-gray-700 rounded-full shadow-md focus:outline-none hover:bg-gray-100"
      >
        <FaArrowLeft size={20} />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 w-full max-w-screen-2xl scrollbar-hide ml-4"
      >
        {lists.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-96 h-96 cursor-pointer"
          >
            <img
              src={images[image]}
              alt={index}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 bg-white text-gray-700 rounded-full shadow-md focus:outline-none hover:bg-gray-100"
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default OfficeImageCarousel;

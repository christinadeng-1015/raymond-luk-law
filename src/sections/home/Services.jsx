import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineRight } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import realEstate from "../../assets/service/real-estate.jpg";
import familyLaw from "../../assets/service/family-law.png";
import will from "../../assets/service/will.jpg";
import personalInjury from "../../assets/service/personal-injury.png";
import immigration from "../../assets/service/immigration.png";
import corporateLaw from "../../assets/service/corporate-law.jpg";
import otherServices from "../../assets/service/other-services.jpg";

const images = {
  "real-estate.jpg": realEstate,
  "family-law.png": familyLaw,
  "will.jpg": will,
  "personal-injury.png": personalInjury,
  "immigration.png": immigration,
  "corporate-law.jpg": corporateLaw,
  "other-services.jpg": otherServices,
};

const Services = () => {
  const { t } = useTranslation("services");
  const services = t("services", { returnObjects: true });

  return (
    <section className="bg-gray-50" id="services">
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src='https://res.cloudinary.com/dyozsy6wx/image/upload/v1736993741/law-background_wuqi3p.jpg'
          alt='banner'
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Areas of Practice
            </h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-32">
        {/* Grid Layout for Larger Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <a
              href={service.path}
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col sm:flex-row items-stretch h-[300px]"
            >
              {/* Image */}
              <div className="relative flex-shrink-0 sm:w-5/12 h-full p-6">
                <img
                  src={images[service.imageSrc]}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-center w-full">
                <h4 className="text-xl font-semibold text-gray-800 hover:text-indigo-600">
                  {service.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {service.tabs.slice(0, 4).map((tab, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <AiOutlineRight className="text-[#10284e] mr-2" />
                      {tab.label}
                    </li>
                  ))}
                  {service.tabs.length > 4 && (
                    <li className="flex items-center text-gray-600">
                      <FiMoreHorizontal className="text-[#10284e] mr-2" />
                      And more
                    </li>
                  )}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

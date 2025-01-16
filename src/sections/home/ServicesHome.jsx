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

const ServicesHome = () => {
  const { t } = useTranslation("services");
  const services = t("services", { returnObjects: true });

  return (
    <section className="bg-gray-50" id="services">
  <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-32">
    <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16 text-black">
      Areas of Practice
    </h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {services.map((service, index) => (
        <a
          href={service.path}
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col sm:flex-row md:flex-row items-stretch"
        >
          {/* Image */}
          <div className="relative flex-shrink-0 w-full sm:w-5/12 md:w-5/12 h-[250px]">
            <img
              src={images[service.imageSrc]}
              alt={service.title}
              className="w-full h-full object-cover"
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

export default ServicesHome;

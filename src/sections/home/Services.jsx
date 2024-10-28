import React from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineHome,
  AiOutlineSolution,
  AiOutlineForm,
  AiOutlineSafety,
  AiOutlineTeam,
  AiOutlineGlobal,
  AiOutlineAppstore,
  AiOutlineRight,
} from "react-icons/ai";

const images = {
  "real-estate.jpg": <AiOutlineHome size={80} color="white" />,
  "family-law.jpg": <AiOutlineTeam size={80} color="white" />,
  "will.jpg": <AiOutlineForm size={80} color="white" />,
  "personal-injury.png": <AiOutlineSafety size={80} color="white" />,
  "immigration.jpg": <AiOutlineGlobal size={80} color="white" />,
  "corporate-law.jpg": <AiOutlineSolution size={80} color="white" />,
  "other-services.jpg": <AiOutlineAppstore size={80} color="white" />,
};

const Services = () => {
  const { t } = useTranslation("services");
  const title = t("title", { returnObjects: false });
  const services = t("services", { returnObjects: true });

  return (
    <div className="flex flex-col py-16 sm:py-24" id="services">
      <div className="max-w-screen-2xl mx-auto">
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl text-center text-gray-900 mb-4 sm:mb-6 font-semibold pb-8 sm:pb-16">
            {title}
          </h3>
        </div>

        <div className="relative px-4 sm:px-8 drop-shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 xl:gap-16">
            {services.map((service, index) => (
              <a
                href={service.path}
                key={index}
                className="block shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 bg-white"
                style={{
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-full h-40 sm:h-48 flex justify-center items-center bg-[#10284e]">
                    {images[service.imageSrc]}
                  </div>
                  <div className="py-4 px-6 sm:px-8 flex flex-col flex-grow">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {service.title}
                    </h4>
                    <ul className="text-sm mt-2 text-gray-800">
                      {service.tabs.map((tab, i) => (
                        <li
                          key={i}
                          className="tracking-wide py-1 flex flex-row items-center"
                        >
                          <AiOutlineRight size={20} />
                          <span className="pl-2">{tab.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

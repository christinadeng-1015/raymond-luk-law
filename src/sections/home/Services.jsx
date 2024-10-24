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
    <div className="flex h-auto relative z-10 flex-col py-32" id="services">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full p-8 flex flex-col justify-center">
          <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16">
            {title}
          </h3>
        </div>

        <div className="w-full relative px-8 drop-shadow-xl">
          <div className="xl:hidden flex overflow-x-auto whitespace-nowrap gap-8 px-6 py-20">
            {services.map((service, index) => (
              <a
                href={service.path}
                key={index}
                className="block w-full sm:w-96 shadow-lg flex-shrink-0 transition-transform duration-300 ease-in-out hover:-translate-y-2 bg-white"
                style={{
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-full h-52 xl:h-64 object-cover flex justify-center items-center bg-gray-200">
                    {images[service.imageSrc]}
                  </div>
                  <div className="py-4 px-8 flex flex-col flex-grow justify-between">
                    <div>
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
                </div>
              </a>
            ))}
          </div>

          <div
            className="hidden xl:grid grid-cols-2 xl:grid-cols-3 gap-12 xl:gap-16"
            data-aos="fade-left"
          >
            {services.map((service, index) => (
              <a
                href={service.path}
                key={index}
                className="block w-full shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 bg-white"
                style={{
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-full h-48 flex justify-center items-center bg-[#10284e]">
                    {images[service.imageSrc]}
                  </div>
                  <div className="py-4 px-8 flex flex-col flex-grow justify-between">
                    <div>
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

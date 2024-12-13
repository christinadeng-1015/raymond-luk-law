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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 xl:gap-16">
            {services.map((service, index) => (
              <a
                href={service.path}
                key={index}
                className="flip-card "
                style={{ perspective: "1000px" }}
              >
                <div
                  className="flip-card-inner"
                  style={{
                    position: "relative",
                    width: "300px",
                    height: "300px",
                    textAlign: "center",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "rotateY(180deg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "rotateY(0deg)")
                  }
                >
                  {/* Front Side */}
                  <div
                    className="flip-card-front"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "70%",
                      }}
                    >
                      <img
                        src={images[service.imageSrc]}
                        alt={service.title}
                        className="w-full h-full"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(16, 40, 78, 0.3)",
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        height: "50%",
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="flip-card-back"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
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

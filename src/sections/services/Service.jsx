import { useTranslation } from "react-i18next";
import ServicesTabs from "./ServicesTabs";
import realEstateLawImg from "../../assets/service/real-estate.jpg";
import familyLawImg from "../../assets/service/family-law.jpg";
import willImg from "../../assets/service/will.jpg";
import personalInjuryImg from "../../assets/service/personal-injury.png";
import immigrationImg from "../../assets/service/immigration.jpg";
import corporateLawImg from "../../assets/service/corporate-law.jpg";
import otherServicesImg from "../../assets/service/other-services.jpg";

const images = {
  "real-estate.jpg": realEstateLawImg,
  "family-law.jpg": familyLawImg,
  "will.jpg": willImg,
  "personal-injury.png": personalInjuryImg,
  "immigration.jpg": immigrationImg,
  "corporate-law.jpg": corporateLawImg,
  "other-services.jpg": otherServicesImg,
};

export function Service() {
  const path = window.location.pathname;
  const { t } = useTranslation("services");
  const services = t("services", { returnObjects: true });
  const service = services.find((service) => service.path === path);

  return (
    <div>
      {/* <div className="bg-gray-200 p-16 pt-32 flex flex-col lg:flex-row text-center">
        <div className="flex flex-col justify-center lg:w-3/5">
          <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
          <div className="lg:flex-row gap-4">
            <p className="mb-4 lg:mb-0 text-gray-700 dark:text-gray-300">
              {service.desc}
            </p>
          </div>
        </div>
        <div className="lg:w-2/5 flex justify-center">
          <img
            src={images[service.imageSrc]}
            alt={service.title}
            className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full shadow-lg mx-auto"
          />
        </div>
      </div> */}
      {service.tabs && service.tabs.length > 0 && (
        <ServicesTabs tabs={service.tabs} />
      )}
    </div>
  );
}

export default Service;

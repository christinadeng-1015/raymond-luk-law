import { useTranslation } from "react-i18next";
import ServicesTabs from "./ServicesTabs";
// import realEstateLawImg from "../../assets/service/real-estate.jpg";
// import familyLawImg from "../../assets/service/family-law.jpg";
// import willImg from "../../assets/service/will.jpg";
// import personalInjuryImg from "../../assets/service/personal-injury.png";
// import immigrationImg from "../../assets/service/immigration.jpg";
// import corporateLawImg from "../../assets/service/corporate-law.jpg";
// import otherServicesImg from "../../assets/service/other-services.jpg";

// const images = {
//   "real-estate.jpg": realEstateLawImg,
//   "family-law.jpg": familyLawImg,
//   "will.jpg": willImg,
//   "personal-injury.png": personalInjuryImg,
//   "immigration.jpg": immigrationImg,
//   "corporate-law.jpg": corporateLawImg,
//   "other-services.jpg": otherServicesImg,
// };

export function Service() {
  const path = window.location.pathname;
  const { t } = useTranslation("services");
  const services = t("services", { returnObjects: true });
  const service = services.find((service) => service.path === path);

  return (
    <div className="py-48">
      {service.tabs && service.tabs.length > 0 && (
        <ServicesTabs tabs={service.tabs} />
      )}
    </div>
  );
}

export default Service;

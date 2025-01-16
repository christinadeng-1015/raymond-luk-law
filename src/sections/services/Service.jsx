import { useTranslation } from "react-i18next";
import ServicesTabs from "./ServicesTabs";
import { Link } from "react-router-dom";
// import realEstateLawImg from "../../assets/service/real-estate.jpg";
// import familyLawImg from "../../assets/service/family-law.jpg";
// import willImg from "../../assets/service/will.jpg";
// import personalInjuryImg from "../../assets/service/personal-injury.png";
// import immigrationImg from "../../assets/service/immigration.jpg";
// import corporateLawImg from "../../assets/service/corporate-law.jpg";
// import otherServicesImg from "../../assets/service/other-services.jpg";
import lawBackgroundImg from '../../assets/banner/law-background.jpg'

// const images = {
//   "real-estate.jpg": realEstateLawImg,
//   "family-law.jpg": familyLawImg,
//   "will.jpg": willImg,
//   "personal-injury.png": personalInjuryImg,
//   "immigration.jpg": immigrationImg,
//   "corporate-law.jpg": corporateLawImg,
//   "other-services.jpg": otherServicesImg,
// };

const categoryLinks = [
  { path: "/real-estate-law", name: "Real Estate Law" },
  { path: "/family-law", name: "Family Law" },
  { path: "/wills-and-estates", name: "Wills and Estates" },
  { path: "/personal-injury-law", name: "Personal Injury Law" },
  { path: "/immigration-law", name: "Immigration Law" },
  { path: "/corporate-law", name: "Corporate Law" },
  { path: "/other-services", name: "Other Services" },
];

export function Service() {
  const path = window.location.pathname;
  const { t } = useTranslation("services");
  const services = t("services", { returnObjects: true });
  const service = services.find((service) => service.path === path);

  if (!service) {
    return null;
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src={lawBackgroundImg}
          alt={service ? service.title : "Service Banner"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          {service && (
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {service.title}
            </h1>
          )}
        </div>
      </div>

      <nav className="bg-gray-100 p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-2 sm:gap-4 md:flex-row md:justify-center md:gap-4">
          {categoryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg font-medium ${
                path.startsWith(link.path)
                  ? "text-purple-600 bg-purple-100"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>


      {/* Tabs Section */}
      <div>
        {service && service.tabs && service.tabs.length > 0 && (
          <ServicesTabs tabs={service.tabs} />
        )}
      </div>
    </div>
  );
}

export default Service;
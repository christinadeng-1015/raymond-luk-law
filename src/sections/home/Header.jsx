import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import homepage from "../../assets/homepage.jpg";

const Header = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { t } = useTranslation("navbar");
  const navbar = t("navbar", { returnObjects: true });

  return (
    <header id="header" className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 w-full h-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${homepage})`,
          transform: `translate(-50%, -50%) translateY(${offsetY * 0.5}px)`,
        }}
      ></div>

      <div
        className="absolute top-1/2 left-1/2 w-5/6 h-2/3 flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/3
      md:w-1/2 md:h-full md:translate-x-0 md:translate-y-0 md:top-0 md:left-0"
      >
        <div className="text-center">
          <h1
            data-aos="zoom-out"
            className="text-white p-4 tracking-wide font-medium uppercase"
          >
            {navbar.title}
          </h1>
          <h2
            data-aos="zoom-out"
            className="text-white pb-8 tracking-wide text-sm md:text-lg"
          >
            {navbar.subtitle}
          </h2>
          <p data-aos="fade-up" className="text-white italic font-base ">
            {navbar.desc}
          </p>
          <div className="pt-10" data-aos="fade-up">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={navbar.googleDoc.url}
              className="text-md border-2 bg-white rounded-lg p-4 text-white font-medium shadow-md transition-transform transform hover:scale-110 hover:shadow-lg"
              style={{ color: "#3C5B6F" }}
            >
              {navbar.googleDoc.title}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

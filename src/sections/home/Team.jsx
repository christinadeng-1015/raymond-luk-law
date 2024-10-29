import { useTranslation } from "react-i18next";
import TeamCard from "./TeamCard";
import chinese from "../../assets/language/china.png";
import english from "../../assets/language/canada.png";
import vietnamese from "../../assets/language/vietnam.png";
import korean from "../../assets/language/south-korea.png";
import farsi from "../../assets/language/iran.png";
import ukrainian from "../../assets/language/ukraine.png";
import russian from "../../assets/language/russia.png";

const Team = () => {
  const { t } = useTranslation("team");
  const title = t("title", { returnObjects: false });
  const team = t("team", { returnObjects: true });

  // Array of language names and corresponding flag images
  const languages = [
    { name: "English", flag: english },
    { name: "Cantonese & Mandarin", flag: chinese },
    { name: "Vietnamese", flag: vietnamese },
    { name: "Korean", flag: korean },
    { name: "Farsi", flag: farsi },
    { name: "Ukrainian", flag: ukrainian },
    { name: "Russian", flag: russian },
  ];

  return (
    <div
      className="flex py-24 relative flex-col max-w-screen-2xl mx-auto"
      id="team"
    >
      {/* Team Section */}
      <div className="w-full p-8 flex flex-col justify-center">
        <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16">
          {title}
        </h3>
      </div>

      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto"
        data-aos="fade-right"
      >
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>

      <div className="w-full p-8 mt-32 flex flex-col justify-center items-center">
        <h5 className="text-xl text-center text-gray-900 mb-8 font-semibold italic">
          We provide legal services in:
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {languages.map((language) => (
            <div
              key={language.name}
              className="flex flex-col items-center w-40 px-4 py-4 text-gray-800 font-medium"
            >
              <span className="mb-4 text-center whitespace-nowrap">
                {language.name}
              </span>
              <img
                src={language.flag}
                alt={`${language.name} flag`}
                className="w-20 h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

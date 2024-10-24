import { useTranslation } from "react-i18next";
import { HiOutlineAcademicCap } from "react-icons/hi";
import raymondLukImg from "../../assets/team/raymond-luk.jpg";
import eimanSharifpourImg from "../../assets/team/eiman-sharifpour.jpg";
import christineGuanImg from "../../assets/team/christine-guan.jpg";
import rebeccaTsuiImg from "../../assets/team/rebecca-tsui.jpg";
import mandyZhaoImg from "../../assets/team/mandy-zhao.jpg";
import emmaJaneImg from "../../assets/team/emma-jane.jpg";
import jessicaChenImg from "../../assets/team/jessica-chen.jpg";
import angelaTsuiImg from "../../assets/team/angela-tsui.jpg";
import rachelChanImg from "../../assets/team/rachel-chan.jpg";
import camilaSuImg from "../../assets/team/camila-su.jpg";

const TeamAbout = () => {
  const { t } = useTranslation("team");
  const title = t("title", { returnObjects: false });
  const subtitle = t("subtitle", { returnObjects: false });
  const team = t("team", { returnObjects: true });
  const heading = t("heading", { returnObjects: true });

  const images = {
    "raymond-luk": raymondLukImg,
    "eiman-sharifpour": eimanSharifpourImg,
    "christine-guan": christineGuanImg,
    "rebecca-tsui": rebeccaTsuiImg,
    "mandy-zhao": mandyZhaoImg,
    "emma-jane": emmaJaneImg,
    "jessica-chen": jessicaChenImg,
    "angela-tsui": angelaTsuiImg,
    "rachel-chan": rachelChanImg,
    "camila-su": camilaSuImg,
  };

  return (
    <div className="flex flex-col items-stretch pt-40 shadow-lg">
      <h3 className="text-2xl text-center text-gray-800 mb-2 font-semibold">
        {title}
      </h3>
      <p className="italic mt-4 text-center text-gray-800 mb-4 pb-16 px-10">
        {subtitle}
      </p>
      {team.map((member, index) => (
        <div
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center md:items-start border border-gray-200 overflow-hidden shadow-lg w-full md:m-2`}
          style={{
            background: "#3C5B6F",
          }}
          key={member.name}
        >
          <img
            src={images[member.image]}
            alt={member.name}
            className="w-full md:w-1/2 lg:w-1/3 object-contain"
            loading="lazy"
          />

          <div className="w-full md:w-1/2 lg:w-2/3 p-6 md:p-12 text-gray-200">
            <h4 className="text-xl md:text-2xl font-bold mb-4 text-gray-200">
              {member.name}
            </h4>
            <h5 className="font-semibold mb-4 underline text-gray-200">
              {member.position}
            </h5>
            <div
              className="text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: member.description }}
            />
            {member.education && member.education.length > 0 && (
              <div className="w-full mt-4">
                <h5 className="font-semibold flex items-center text-white">
                  <HiOutlineAcademicCap className="inline mr-2" />{" "}
                  {heading.education}
                </h5>
                <ul className="text-sm md:text-base mt-2">
                  {member.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamAbout;

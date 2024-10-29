import { useTranslation } from "react-i18next";
import { useState } from "react";
import { HiOutlineAcademicCap } from "react-icons/hi";
import raymondLukImg from "../../assets/team/raymond-luk.jpg";
import eimanSharifpourImg from "../../assets/team/eiman-sharifpour.jpeg";
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

  // Set the first member as the default selected member
  const [selectedMember, setSelectedMember] = useState(team[0]);

  const handleMemberClick = (member) => {
    // If the same member is clicked, hide the detail section by setting it to null
    if (selectedMember && selectedMember.name === member.name) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  return (
    <div className="flex flex-col items-center py-48 lg:py-72 w-full">
      <h3 className="text-2xl sm:text-3xl text-center text-gray-900 mb-4 sm:mb-6 font-semibold pb-8 sm:pb-16">
        {title}
      </h3>

      {selectedMember && (
        <div
          className={`flex flex-col md:flex-row items-center md:items-start border border-gray-200 overflow-hidden shadow-lg w-full max-w-screen-2xl mb-8 bg-[#10284e]`}
        >
          <img
            src={images[selectedMember.image]}
            alt={selectedMember.name}
            className="w-full md:w-1/2 lg:w-1/3 object-contain"
            loading="lazy"
          />

          <div className="w-full md:w-1/2 lg:w-2/3 p-6 md:p-12 text-gray-200">
            <h4 className="text-xl md:text-2xl font-bold mb-4 text-gray-200">
              {selectedMember.name}
            </h4>
            <h5 className="font-semibold mb-4 underline text-gray-200">
              {selectedMember.position}
            </h5>
            <div
              className="text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: selectedMember.description }}
            />
            {selectedMember.education &&
              selectedMember.education.length > 0 && (
                <div className="w-full mt-4">
                  <h5 className="font-semibold flex items-center text-white">
                    <HiOutlineAcademicCap className="inline mr-2" />{" "}
                    {heading.education}
                  </h5>
                  <ul className="text-sm md:text-base mt-2">
                    {selectedMember.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}

      <div className="flex overflow-x-auto space-x-6 w-full max-w-screen-2xl">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex-shrink-0 w-72 h-72 cursor-pointer"
            onClick={() => handleMemberClick(member)}
          >
            <img
              src={images[member.image]}
              alt={member.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamAbout;

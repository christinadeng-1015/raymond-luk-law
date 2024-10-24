import { useState } from "react";
import { Modal } from "flowbite-react";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";
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

const TeamCard = ({ member }) => {
  const { t } = useTranslation("team");
  const heading = t("heading", { returnObjects: true });

  const [openModal, setOpenModal] = useState(false);

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
    <div className="text-center p-4 relative group">
      <button
        onClick={() => setOpenModal(!openModal)}
        rel="noopener noreferrer"
      >
        <div className="relative text-center w-52 h-52 mx-auto">
          <img
            src={images[member.image]}
            alt={member.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
            <span className="text-white text-lg font-semibold">
              {heading.meet} {member.name.split(" ")[0]}
            </span>
          </div>
        </div>
        <h4 className="mt-4 mb-2 font-semibold tracking-wide">{member.name}</h4>
        <p className="text-sm text-gray-500 tracking-tight italic font-light underline">
          {member.position}
        </p>
      </button>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        className="backdrop-blur-lg max-w-full overflow-hidden"
      >
        <Modal.Header className="shadow-2xl">
          {heading.meet} {member.name.split(" ")[0]}
        </Modal.Header>
        <Modal.Body className="flex justify-center shadow-2xl rounded-lg p-4 max-h-screen overflow-y-auto w-full">
          <div className="w-full max-w-full md:max-w-[500px] border border-blue-500 rounded-lg p-4">
            <div className="flex flex-col items-center pb-4">
              <img
                className="w-3/4 h-3/4 md:w-1/3 md:h-1/3 mb-3 rounded-full shadow-lg border-2 border-white"
                src={images[member.image]}
                alt={member.name}
              />
              <h5 className="mb-1 text-lg md:text-xl font-medium text-center">
                {member.name}
              </h5>
              <span className="text-sm italic underline text-center">
                {member.position}
              </span>
              <div
                className="text-sm p-4 text-center break-words"
                dangerouslySetInnerHTML={{ __html: member.description }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
                {member.education && member.education.length > 0 && (
                  <div className="w-full">
                    <h5 className="font-semibold flex items-center underline">
                      <HiOutlineAcademicCap className="inline mr-2" />{" "}
                      {heading.education}
                    </h5>
                    <ul className="list-disc pl-5 text-sm mt-2 break-words">
                      {member.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="w-full">
                  <h5 className="font-semibold flex items-center underline">
                    <HiOutlineIdentification className="inline mr-2" />{" "}
                    {heading.contact}
                  </h5>
                  {member.phone?.length > 0 && (
                    <p className="text-sm flex items-center mb-3">
                      <HiOutlinePhone className="inline mr-2" />
                      <a
                        href={`tel:${member.phone[0]}`}
                        className="underline break-words"
                      >
                        {member.phone.join(", ")}
                      </a>
                    </p>
                  )}
                  {member.email && (
                    <p className="text-sm flex items-center">
                      <HiOutlineMail className="inline mr-2" />
                      <a
                        href={`mailto:${member.email}`}
                        className="underline break-words"
                      >
                        {member.email}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamCard;

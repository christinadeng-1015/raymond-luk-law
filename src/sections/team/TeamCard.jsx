import { useState } from 'react';
import { Modal } from 'flowbite-react';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../../components/OptimizedImage';

const TeamCard = ({ member }) => {
  const { t } = useTranslation('team');
  const heading = t('heading', { returnObjects: true });

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="text-center p-4 relative group">
      <button
        onClick={() => setOpenModal(!openModal)}
        rel="noopener noreferrer"
        aria-label={`View details for ${member.name}`}
      >
        <div className="relative text-center w-64 h-64 md:w-52 md:h-52 lg:w-64 lg:h-64 mx-auto">
          <OptimizedImage
            src={member.image}
            alt={member.name}
            originalFormat="jpg"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
            <span className="text-white text-lg font-semibold">
              {heading.meet} {member.name.split(' ')[0]}
            </span>
          </div>
        </div>
        <h4 className="mt-4 mb-2 font-semibold tracking-wide">{member.name}</h4>
        <p className="text-sm text-gray-500 tracking-tight font-light w-2/3 mx-auto">
          {member.position}
        </p>
      </button>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        size="7xl"
        className="flex items-center pt-0 md:pt-6"
      >
        <Modal.Header className="shadow-lg bg-[#10284e]">
          <p className="text-white text-xl font-bold uppercase tracking-wide">
            {heading.meet} {member.name.split(' ')[0]}
          </p>
        </Modal.Header>
        <Modal.Body className="p-6 bg-gray-50 shadow-xl rounded-lg max-h-[90vh] overflow-y-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center md:shadow-md md:bg-white md:p-6 md:rounded-lg">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
              <OptimizedImage
                src={member.image}
                alt={member.name}
                originalFormat="jpg"
                className="w-64 h-64 rounded-full shadow-lg border-4 border-blue-500 object-cover"
              />
            </div>

            <div className="w-full md:w-2/3 pl-0 md:pl-8">
              <h5 className="text-3xl font-bold text-gray-900 text-center md:text-left">
                {member.name}
              </h5>
              <p className="text-xl text-gray-900 text-center md:text-left">
                {member.position}
              </p>
              <div
                className="text-md text-gray-900 my-6 md:my-12"
                dangerouslySetInnerHTML={{ __html: member.description }}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:shadow-lg md:bg-white md:p-10 md:rounded-lg mt-4">
            <div className="w-full md:w-1/3 mx-auto pb-4 md:pl-0">
              <h5 className="font-semibold flex items-center text-[#10284e] mb-2">
                <HiOutlineAcademicCap className="inline mr-2" />
                {heading.education}
              </h5>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {member.education?.map((edu, index) => (
                  <li key={index} className="overflow-visible py-1">
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/3 mx-auto">
              <h5 className="font-semibold flex items-center text-[#10284e] mb-2">
                <HiOutlineIdentification className="inline mr-2" />
                {heading.contact}
              </h5>
              <ul className="list-none text-sm text-gray-600">
                {member.phone.map((phone, index) => (
                  <li key={index} className="py-1">
                    <HiOutlinePhone className="inline mr-2 text-[#10284e]" />
                    <a href={`tel:${phone.number}`} className="underline mr-2">
                      {phone.number}
                    </a>
                    {phone.description && <span>{phone.description}</span>}
                  </li>
                ))}
              </ul>

              {member.email && (
                <p className="text-sm flex items-center mt-2 text-gray-600">
                  <HiOutlineMail className="inline mr-2 text-[#10284e]" />
                  <a
                    href={`mailto:${member.email}`}
                    className="underline break-words"
                  >
                    {member.email}
                  </a>
                </p>
              )}

              {member.desc && (
                <p className="text-xs font-light mt-4 text-gray-600">
                  {member.desc}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamCard;

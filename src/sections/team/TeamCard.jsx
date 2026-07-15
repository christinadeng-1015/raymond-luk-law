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
  const heading = t('heading', { returnObjects: true }) || {};
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full flex flex-col h-full text-left group">
      <button
        onClick={() => setOpenModal(!openModal)}
        aria-label={`View details for ${member.name}`}
        className="w-full text-left flex flex-col h-full focus:outline-none"
      >
        <div className="p-4 pb-0 w-full">
          <div className="relative w-full aspect-square overflow-hidden bg-slate-50 rounded-lg  border-slate-100/60">
            <OptimizedImage
              src={member.image}
              alt={member.name}
              originalFormat="jpg"
              className="w-full h-full object-cover object-top filter grayscale-[12%] contrast-[102%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-[#10284e]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
              <span className="text-white text-xs font-sans font-bold tracking-widest uppercase bg-[#10284e]/90 px-4 py-2 rounded-sm shadow-sm">
                {heading.meet} {member.name.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <h4
              className="text-base font-serif font-bold tracking-tight text-[#10284e] mb-1 transition-colors group-hover:text-amber-500"
              style={{
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            >
              {member.name}
            </h4>
            <p className="text-xs font-sans font-medium text-slate-400 tracking-wider uppercase">
              {member.position}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold tracking-wider text-amber-500 uppercase">
              View Profile
            </span>
            <span className="text-xs text-amber-500 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </button>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        size="5xl"
        className="flex items-center pt-0 md:pt-6"
      >
        <Modal.Header className="border-b border-slate-100 bg-white text-[#10284e]">
          <span
            className="text-lg font-serif font-bold tracking-tight text-[#10284e]"
            style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            }}
          >
            {heading.meet} {member.name}
          </span>
        </Modal.Header>

        <Modal.Body className="p-6 md:p-8 bg-slate-50/50 backdrop-blur-md max-h-[85vh] overflow-y-auto w-full">
          <div className="flex flex-col md:flex-row items-start gap-8 bg-white border border-slate-100 p-6 rounded-xl shadow-none">
            <div className="w-full md:w-1/3 aspect-square max-w-[240px] mx-auto overflow-hidden rounded-lg bg-slate-100 border border-slate-100 shadow-none">
              <OptimizedImage
                src={member.image}
                alt={member.name}
                originalFormat="jpg"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <h5
                className="text-2xl font-serif font-bold text-[#10284e] text-center md:text-left mb-1"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {member.name}
              </h5>
              <p className="text-sm font-sans font-semibold tracking-wider uppercase text-amber-500 text-center md:text-left">
                {member.position}
              </p>
              <div
                className="text-sm font-serif italic text-slate-600 leading-relaxed mt-6 pt-4 border-t border-slate-50"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
                dangerouslySetInnerHTML={{ __html: member.description }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-none">
              <h5 className="text-xs font-sans font-bold tracking-[0.15em] uppercase flex items-center text-[#10284e] mb-4">
                <HiOutlineAcademicCap className="text-base mr-2 text-amber-500" />
                {heading.education}
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {member.education?.map((edu, index) => (
                  <li
                    key={index}
                    className="leading-relaxed border-l-2 border-amber-500/40 pl-3"
                  >
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-none">
              <h5 className="text-xs font-sans font-bold tracking-[0.15em] uppercase flex items-center text-[#10284e] mb-4">
                <HiOutlineIdentification className="text-base mr-2 text-amber-500" />
                {heading.contact}
              </h5>

              <ul className="space-y-3 text-xs text-slate-600">
                {member.phone?.map((phone, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <HiOutlinePhone className="text-slate-400 text-sm flex-shrink-0" />
                    <a
                      href={`tel:${phone.number}`}
                      className="hover:text-amber-500 transition-colors underline decoration-slate-200 hover:decoration-amber-500 font-medium"
                    >
                      {phone.number}
                    </a>
                    {phone.description && (
                      <span className="text-[10px] bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded-sm">
                        {phone.description}
                      </span>
                    )}
                  </li>
                ))}

                {member.email && (
                  <li className="flex items-center gap-2 pt-1">
                    <HiOutlineMail className="text-slate-400 text-sm flex-shrink-0" />
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-amber-500 transition-colors underline decoration-slate-200 hover:decoration-amber-500 font-medium break-all"
                    >
                      {member.email}
                    </a>
                  </li>
                )}
              </ul>

              {member.desc && (
                <p className="text-[10px] font-sans text-slate-400 leading-normal mt-5 pt-4 border-t border-slate-50">
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

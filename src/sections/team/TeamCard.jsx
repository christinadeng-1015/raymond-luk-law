import { useState } from 'react';
import { Modal } from 'flowbite-react';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../../components/OptimizedImage';

const TeamCard = ({ member }) => {
  const { t } = useTranslation('team');
  const heading = t('heading', { returnObjects: true }) || {};
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full flex flex-col h-full group">
      <button
        onClick={() => setOpenModal(true)}
        aria-label={`View details for ${member.name}`}
        className="w-full text-center flex flex-col items-center h-full focus:outline-none cursor-pointer"
      >
        <div className="p-2 w-full flex justify-center">
          <div className="relative w-full aspect-square max-w-[220px] overflow-hidden rounded-full bg-slate-100">
            <OptimizedImage
              src={member.image}
              alt={member.name}
              originalFormat="jpg"
              className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
              <span className="text-white text-[11px] font-sans font-semibold tracking-widest uppercase bg-slate-900/80 px-3 py-1.5 rounded">
                {heading.meet} {member.name.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 w-full flex-1 flex flex-col justify-between items-center bg-white">
          <div className="w-full text-center">
            <h4 className="text-lg font-serif font-semibold tracking-tight text-slate-900 mb-1 transition-colors group-hover:text-amber-600">
              {member.name}
            </h4>
            <p className="text-xs font-sans font-medium text-slate-500 tracking-wider uppercase">
              {member.position}
            </p>
          </div>

          <div className="mt-4 pt-3 w-full border-t border-slate-100 flex items-center justify-center gap-1">
            <span className="text-xs font-sans font-medium tracking-wider text-slate-700 uppercase transition-colors group-hover:text-amber-600">
              View Profile
            </span>
            <HiOutlineChevronRight className="text-xs text-slate-700 transition-transform duration-300 group-hover:text-amber-600 group-hover:translate-x-0.5" />
          </div>
        </div>
      </button>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="full"
        theme={{
          content: {
            inner:
              'relative rounded-none bg-slate-50 flex flex-col h-full w-full',
            base: 'relative w-full h-full p-0 flex flex-col',
          },
          root: {
            show: {
              on: 'flex fixed inset-0 z-50 overflow-hidden justify-center items-center',
              off: 'hidden',
            },
          },
        }}
      >
        <div className="h-full w-full bg-slate-50 flex flex-col overflow-y-auto">
          <Modal.Header className="border-b border-slate-200 bg-white text-slate-900 px-6 py-4 sticky top-0 z-30 rounded-none shadow-xs">
            <span className="text-lg md:text-xl font-serif font-semibold text-slate-900">
              {heading.meet} {member.name}
            </span>
          </Modal.Header>

          <Modal.Body className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col items-start lg:sticky lg:top-24">
                <div className="w-full aspect-square max-w-[220px] mx-auto overflow-hidden rounded-lg bg-slate-100 mb-5">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    originalFormat="jpg"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-1 w-full">
                  {member.name}
                </h3>
                <p className="text-xs font-sans font-semibold tracking-wider uppercase text-amber-600 mb-6 w-full">
                  {member.position}
                </p>

                <div className="w-full pt-4 border-t border-slate-100 space-y-3">
                  <h5 className="text-xs font-sans font-bold tracking-wider uppercase flex items-center text-slate-900">
                    <HiOutlineIdentification className="text-base mr-2 text-amber-600 flex-shrink-0" />
                    {heading.contact || 'Contact'}
                  </h5>

                  <ul className="space-y-2 text-xs md:text-sm text-slate-600 flex flex-col">
                    {member.phone?.map((phone, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <HiOutlinePhone className="text-slate-400 text-sm flex-shrink-0" />
                        <a
                          href={`tel:${phone.number}`}
                          className="hover:text-amber-600 transition-colors font-medium text-slate-700"
                        >
                          {phone.number}
                        </a>
                        {phone.description && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                            {phone.description}
                          </span>
                        )}
                      </li>
                    ))}

                    {member.email && (
                      <li className="flex items-center gap-2">
                        <HiOutlineMail className="text-slate-400 text-sm flex-shrink-0" />
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-amber-600 transition-colors font-medium text-slate-700 break-all"
                        >
                          {member.email}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                {member.education && member.education.length > 0 && (
                  <div className="w-full pt-4 mt-4 border-t border-slate-100 space-y-3">
                    <h5 className="text-xs font-sans font-bold tracking-wider uppercase flex items-center text-slate-900">
                      <HiOutlineAcademicCap className="text-base mr-2 text-amber-600 flex-shrink-0" />
                      {heading.education || 'Education & Bar Admissions'}
                    </h5>

                    <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                      {member.education.map((edu, index) => (
                        <li
                          key={index}
                          className="leading-relaxed bg-slate-50 p-2.5 rounded border-l-2 border-slate-300"
                        >
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-white border border-slate-200/80 rounded-xl p-6 md:p-8 shadow-xs">
                  <h4 className="text-xs font-sans font-bold tracking-wider uppercase text-slate-900 pb-3 border-b border-slate-100 mb-5">
                    Biography
                  </h4>
                  <div
                    className="text-base font-serif text-slate-700 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: member.description }}
                  />
                </div>

                {member.desc && (
                  <p className="text-xs font-sans text-slate-400 leading-normal px-1">
                    {member.desc}
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default TeamCard;

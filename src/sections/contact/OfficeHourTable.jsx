import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegClock, FaCalendarAlt } from 'react-icons/fa';

const OfficeHourTable = () => {
  const { t } = useTranslation('contact');
  const table = t('table', { returnObjects: true });

  return (
    <div className="w-full flex items-center justify-center" data-aos="fade-up">
      <div className="w-full">
        <div className="mb-6">
          <h3 className="pb-2 text-2xl font-serif font-bold text-[#10284e]">
            <span>{table.title}</span>
          </h3>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex justify-between items-center bg-[#10284e] text-white tracking-wide uppercase text-sm py-4 px-6">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-white" />
              <span>{table.header.day}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRegClock className="text-white" />
              <span>{table.header.hours}</span>
            </div>
          </div>

          {table.daysAndHours.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-1 px-6 border-b last:border-b-0 border-gray-100"
            >
              <span className="text-slate-700 font-medium">{item.day}</span>
              <span className="text-slate-600 font-light">{item.hours}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 space-y-1 px-6">
          <p className="text-slate-500 italic text-xs">{table.note}</p>
          <p className="text-slate-500 italic text-xs">{table.holidayNote}</p>
          <p className="text-slate-500 italic text-xs">{table.holidayUpdate}</p>
        </div>
      </div>
    </div>
  );
};

export default OfficeHourTable;

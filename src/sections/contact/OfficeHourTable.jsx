import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegClock, FaCalendarAlt } from 'react-icons/fa';

const OfficeHourTable = () => {
  const { t } = useTranslation('contact');
  const table = t('table', { returnObjects: true });

  return (
    <div
      className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center py-10 px-8 bg-gray-100 shadow-lg rounded-lg"
      data-aos="fade-up"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-center pb-4 text-2xl font-serif font-bold text-[#10284e]">
            <span>{table.title}</span>
          </h3>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center bg-[#10284e] text-white font-medium tracking-wide uppercase text-sm py-4 px-4">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-amber-500" />
              <span>{table.header.day}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRegClock className="text-amber-500" />
              <span>{table.header.hours}</span>
            </div>
          </div>

          {table.daysAndHours.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3.5 px-4 border-b last:border-b-0 border-gray-100"
            >
              <span className="text-slate-700 font-medium">{item.day}</span>
              <span className="text-slate-600 font-light">{item.hours}</span>
            </div>
          ))}
        </div>

        <div className="w-3/4 mx-auto mt-6 space-y-2">
          <p className="text-center text-slate-500 italic text-xs leading-relaxed">
            {table.note}
          </p>
          <p className="text-center text-slate-500 italic text-xs leading-relaxed">
            {table.holidayNote}
          </p>
          <p className="text-center text-slate-500 italic text-xs leading-relaxed">
            {table.holidayUpdate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfficeHourTable;

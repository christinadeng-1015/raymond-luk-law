import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegClock, FaCalendarAlt } from "react-icons/fa";

const OfficeHour = () => {
  const { t } = useTranslation("contact");
  const table = t("table", { returnObjects: true });

  return (
    <div className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center py-10 px-8 bg-gray-100 shadow-lg rounded-lg">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <h3 className="text-center pb-4 text-2xl font-semibold">
            <span>{table.title}</span>
          </h3>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center bg-[#10284e] text-white font-bold rounded-t-lg">
            <div className="flex items-center space-x-2 pl-4 py-4">
              <FaCalendarAlt/>
              <span>{table.header.day}</span>
            </div>
            <div className="flex items-center space-x-2 pr-4">
              <FaRegClock/>
              <span>{table.header.hours}</span>
            </div>
          </div>

          {table.daysAndHours.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 px-4 border-b last:border-b-0 border-gray-200"
            >
              <span className="text-gray-600">{item.day}</span>
              <span className="text-gray-600">{item.hours}</span>
            </div>
          ))}
        </div>

        <div className="w-3/4 mx-auto">
            <p className="text-center text-gray-600 pt-6 italic text-xs">
            {table.note}
            </p>
            <p className="text-center text-gray-600 pt-6 italic text-xs">
            {table.holidayNote}
            </p>
            <p className="text-center text-gray-600 pt-2 italic text-xs">
            {table.holidayUpdate}
            </p>
        </div>
      </div>
    </div>
  );
};

export default OfficeHour;

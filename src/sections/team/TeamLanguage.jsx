import React from 'react';
import OptimizedImage from '../../components/OptimizedImage';

const TeamLanguage = ({ languages, language }) => {
  return (
    <div
      className="w-full px-4 flex flex-col items-center"
      data-aos="fade-up"
      data-aos-duration="1200"
      data-aos-easing="ease-in-out"
    >
      <h5 className="text-2xl text-center text-gray-800 mb-12 font-semibold flex flex-col items-center gap-3">
        <span>{language}</span>
        <div className="w-12 h-[2px] bg-amber-500 rounded-full" />
      </h5>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-10">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="group flex flex-col items-center w-32 sm:w-36 text-center p-4"
          >
            <div className="flex justify-center items-center w-20 h-20 mb-4 rounded-full bg-gray-200 overflow-hidden border border-transparent transition-all duration-300 group-hover:bg-gray-300/80 group-hover:shadow-md group-hover:scale-105">
              <OptimizedImage
                src={lang.flag}
                alt={`${lang.name} flag`}
                originalFormat="png"
                className="w-10 h-10 object-cover text-white"
              />
            </div>
            <span className="text-gray-800 font-medium text-sm transition-colors duration-300 group-hover:text-amber-600">
              {lang.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamLanguage;

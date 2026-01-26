import React from 'react';
import { useTranslation } from 'react-i18next';
import Videos from './Videos';

const ResourceContainer = () => {
  const { t } = useTranslation('resources');

  return (
    <div>
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src="assets/banner/resources.jpg"
          alt="Legal resources and information from Luk & Associates"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('title')}
          </h1>
        </div>
      </div>

      <div className="shadow-lg relative z-10">
        <Videos />
      </div>
    </div>
  );
};

export default ResourceContainer;

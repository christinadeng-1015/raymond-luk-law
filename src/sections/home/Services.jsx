import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineRight } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import OptimizedImage from '../../components/OptimizedImage';

const Services = () => {
  const { t } = useTranslation('services');
  const services = t('services', { returnObjects: true });

  return (
    <section className="bg-gray-50" id="services">
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16 text-black">
          {t('title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:px-16">
          {services.map((service, index) => (
            <a
              href={service.path}
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col sm:flex-col lg:flex-row items-stretch"
            >
              <div className="relative w-full lg:w-4/6 p-3 h-56 lg:h-60">
                <OptimizedImage
                  src={service.imageSrc}
                  alt={service.title}
                  originalFormat="jpg"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="p-6 flex flex-col justify-center w-full">
                <h4 className="text-xl font-semibold text-gray-800 hover:text-indigo-600">
                  {service.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {service.tabs.slice(0, 4).map((tab, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <AiOutlineRight className="text-[#10284e] mr-2" />
                      {tab.label}
                    </li>
                  ))}
                  {service.tabs.length > 4 && (
                    <li className="flex items-center text-gray-600">
                      <FiMoreHorizontal className="text-[#10284e] mr-2" />
                      {t('more')}
                    </li>
                  )}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

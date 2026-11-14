import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import OptimizedImage from '../../components/OptimizedImage';
import { localizedPath } from '../../utils/localizedPath';

const Services = () => {
  const { t, i18n } = useTranslation('services');
  const services = t('services', { returnObjects: true });

  return (
    <section className="bg-white py-20" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-sans font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            Areas of Expertise
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#10284e] mb-6">
            {t('title')}
          </h3>
          <div className="w-20 h-[1px] bg-amber-500/50 mx-auto" />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          data-aos="zoom-in-right"
          data-aos-duration="1000"
        >
          {services.map((service, index) => (
            <a
              href={localizedPath(service.path, i18n.language)}
              key={index}
              className="group flex flex-col bg-white border border-slate-100 hover:border-slate-200 transition-all duration-300"
            >
              <div className="p-3">
                <div className="relative h-56 overflow-hidden">
                  <OptimizedImage
                    src={service.imageSrc}
                    alt={service.title}
                    originalFormat="jpg"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-blue-900/20 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <h4 className="absolute bottom-6 left-6 right-6 text-xl font-serif font-bold text-white leading-tight z-10">
                    {service.title}
                  </h4>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex justify-between items-start flex-grow">
                <ul className="space-y-2 pr-4 flex-grow">
                  {service.tabs.slice(0, 3).map((tab, i) => (
                    <li
                      key={i}
                      className="flex items-center text-slate-500 text-[13px] font-light"
                    >
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-3 flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </li>
                  ))}

                  {service.tabs.length > 3 && (
                    <li className="text-slate-400 text-[11px] font-medium italic pt-1 pl-4">
                      {`+ ${service.tabs.length - 3} more services`}
                    </li>
                  )}
                </ul>

                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import { useTranslation } from 'react-i18next';
import ServicesTabs from './ServicesTabs';
import { Link } from 'react-router-dom';

export function Service() {
  const path = window.location.pathname;
  const { t } = useTranslation('services');
  const services = t('services', { returnObjects: true });
  const service = services.find((service) => service.path === path);

  if (!service) {
    return null;
  }

  return (
    <div>
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src="assets/banner/law.jpg"
          alt={service ? service.title : 'Service Banner'}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          {service && (
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {service.title}
            </h1>
          )}
        </div>
      </div>

      <nav
        className="p-4 shadow-md"
        data-aos="flip-down"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-8 md:flex-row justify-center p-6">
          {services.map((service) => (
            <div key={service.path} className="relative">
              <Link
                to={service.path}
                className={`px-4 py-2 rounded-lg text-base font-semibold ${
                  path.startsWith(service.path)
                    ? 'text-blue-500'
                    : 'text-gray-700 hover:text-blue-500'
                }`}
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {service.desc && (
        <div className="p-16 shadow-lg hidden md:flex items-center bg-[#10284e]">
          <div className="w-1/4 h-full rounded-l-lg flex justify-end items-center">
            {service.icon && (
              <img
                src={`assets/icons/${service.icon}`}
                alt="service-icon"
                className="w-24 h-24"
              />
            )}
          </div>
          <p className="w-1/2 hidden md:flex mx-24 pt-6 text-base text-white">
            {service.desc}
          </p>
        </div>
      )}

      {service && service.tabs && service.tabs.length > 0 && (
        <ServicesTabs tabs={service.tabs} />
      )}
    </div>
  );
}

export default Service;

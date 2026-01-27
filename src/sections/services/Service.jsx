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
    <div className="mb-8">
      <div className="relative w-full h-64 md:h-1/2">
        <img
          loading="lazy"
          width="1200"
          height="400"
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
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-1 md:flex md:flex-row md:justify-center md:items-center p-2 md:p-6">
          {services.map((service) => (
            <div key={service.path} className="relative flex justify-center">
              <Link
                to={service.path}
                className={`relative px-4 py-2 rounded-lg text-sm md:text-base font-semibold text-center transition-all duration-300 ${
                  path.startsWith(service.path)
                    ? 'text-blue-600 after:scale-x-100'
                    : 'text-gray-700 hover:text-blue-600 hover:after:scale-x-100'
                } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 after:transition-transform after:origin-left`}
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
                loading="lazy"
                width="96"
                height="96"
                src={`assets/icons/${service.icon}`}
                alt={`${service.title} service icon`}
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

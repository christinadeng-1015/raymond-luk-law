import { useState, useEffect } from 'react';
import { iconMap } from './constants';
import OptimizedImage from '../../components/OptimizedImage';

export function ServicesTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveTab(tabs?.[0]?.key || '');
  }, [tabs]);

  return (
    <div className="md:p-8 max-w-screen-2xl mx-auto pt-8 md:pt-12">
      <div className="md:hidden relative px-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full text-left bg-[#e6f0ff] text-[#10284e] font-medium py-2 px-4 rounded-lg flex justify-between items-center"
        >
          <div className="flex items-center">
            <div className="mr-2 text-base">
              {iconMap[tabs.find((tab) => tab.key === activeTab)?.icon]}
            </div>
            <span>
              {tabs.find((tab) => tab.key === activeTab)?.label || 'Select Tab'}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-full">
            {tabs.map((item) => (
              <li
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setIsDropdownOpen(false);
                }}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#e6f0ff] ${
                  activeTab === item.key ? 'bg-[#e6f0ff] text-[#10284e]' : ''
                }`}
              >
                <div className="mr-4">{item.icon && iconMap[item.icon]}</div>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hidden md:flex justify-center gap-8" data-aos="zoom-in">
        {tabs.map((item) => (
          <div
            key={item.key}
            className={`flex flex-col items-center text-center w-36 h-36 rounded-lg py-8 justify-start ${
              activeTab === item.key
                ? 'bg-blue-100 text-[#10284e]'
                : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveTab(item.key)}
          >
            <div className="text-5xl">{iconMap[item.icon]}</div>
            <span className="text-sm font-medium mt-2">{item.label}</span>
          </div>
        ))}
      </div>

      {tabs.map(
        (item) =>
          activeTab === item.key && (
            <div key={item.key}>
              <h2 className="text-white pb-8 font-bold text-3xl bg-[#10284e] p-10 shadow-lg md:rounded-t-lg mt-10">
                {item.label}
              </h2>
              <div className="grid grid-cols-1 gap-y-16 px-4 md:px-12 shadow-lg rounded-lg bg-white py-10">
                {item.desc && (
                  <div
                    className="service__subtitle text-base text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: item.desc,
                    }}
                  />
                )}
                {item.content?.map((content, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      content.imageSrc ? 'md:flex-row gap-6' : 'gap-4'
                    } items-start ${
                      content.imageSrc && index % 2 !== 0
                        ? 'md:flex-row-reverse'
                        : ''
                    }`}
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-easing="ease-in-out"
                  >
                    {content.imageSrc && (
                      <div className="flex-shrink-0 w-full md:w-2/5">
                        <OptimizedImage
                          src={content.imageSrc}
                          alt={content.title}
                          originalFormat="jpg"
                          className="rounded-lg h-auto object-cover max-h-96 md:px-8"
                        />
                      </div>
                    )}

                    <div
                      className={`flex flex-col ${
                        content.imageSrc ? 'w-full md:w-3/5' : 'w-full'
                      }`}
                    >
                      {content.title && (
                        <h3 className="font-black text-2xl pb-2">
                          {content.title}
                        </h3>
                      )}
                      {content.desc && (
                        <div
                          className="service__content text-base text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: content.desc,
                          }}
                        />
                      )}
                      {content.subtitle?.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {content.subtitle.map((subtitle, subtitleIndex) => (
                            <div key={subtitleIndex} className="py-4">
                              <h4 className="font-extrabold text-lg mb-2 uppercase">
                                {subtitle.title}
                              </h4>
                              <div
                                className="service__subtitle text-base text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: subtitle.desc,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {content.disclaimer && (
                        <p className="italic font-light pt-6">
                          {content.disclaimer}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default ServicesTabs;

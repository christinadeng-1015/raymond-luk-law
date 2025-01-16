import { useState, useEffect } from "react";
import { images, iconMap } from "./constants";

export function ServicesTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveTab(tabs?.[0]?.key || "");
  }, [tabs]);

  
  return (
    <div className="md:p-8 max-w-screen-2xl mx-auto pt-8 md:pt-32">
      {/* Dropdown for Mobile */}
      <div className="md:hidden relative overflow-visible px-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full text-left bg-[#e6f0ff] text-[#10284e] font-medium py-2 px-4 rounded-lg flex justify-between items-center"
        >
          <div className="flex items-center">
            <div className="mr-2 text-base">
              {iconMap[tabs.find((tab) => tab.key === activeTab)?.icon]}
            </div>
            <span>{tabs.find((tab) => tab.key === activeTab)?.label || "Select Tab"}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
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
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-full">
          {tabs.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setIsDropdownOpen(false);
              }}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#e6f0ff] ${
                activeTab === item.key ? "bg-[#e6f0ff] text-[#10284e]" : ""
              }`}
            >
              <div className="mr-4">{item.icon && iconMap[item.icon]}</div>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        )}
      </div>

      {/* Tabs for Desktop */}
      <div className="hidden md:flex justify-center gap-4 pb-8 border-b">
        {tabs.map((item) => (
          <div
            key={item.key}
            className={`flex flex-col items-center text-center cursor-pointer w-40 p-4 rounded-lg transition-all duration-300 ${
              activeTab === item.key
                ? "bg-[#e6f0ff] text-[#10284e]"
                : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveTab(item.key)}
          >
            <div className="text-5xl">{iconMap[item.icon]}</div>
            <span className="text-sm font-medium mt-2">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      {tabs.map(
        (item) =>
          activeTab === item.key && (
            <div
              key={item.key}
              className="px-6 py-10 md:p-16 shadow-lg rounded-lg bg-white mb-8"
            >
              <h2 className="text-gray-900 pb-8 font-sans font-bold text-3xl">
                {item.label}
              </h2>
              <div className="grid grid-cols-1 gap-y-16">
                {item.content?.map((content, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      content.imageSrc ? "md:flex-row gap-6" : "gap-4"
                    } items-start ${
                      content.imageSrc && index % 2 !== 0
                        ? "md:flex-row-reverse"
                        : ""
                    }`}
                  >
                    {/* Image Section */}
                    {content.imageSrc && images[content.imageSrc] && (
                      <div className="flex-shrink-0 w-full md:w-2/5">
                        <img
                          src={images[content.imageSrc]}
                          alt={content.title}
                          className="rounded-lg h-auto object-cover"
                        />
                      </div>
                    )}

                    {/* Text Content Section */}
                    <div
                      className={`flex flex-col ${
                        content.imageSrc ? "w-full md:w-3/5" : "w-full"
                      }`}
                    >
                      {content.title && (
                        <h3 className="text-black font-sans font-bold text-2xl mb-4">
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
                            <div
                              key={subtitleIndex}
                              className="p-4 mb-4 border-l-4 border-purple-600"
                            >
                              <h4 className="font-semibold text-lg mb-2">
                                {subtitle.title}
                              </h4>
                              <div
                                className="service__subtitle text-gray-700 text-base leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: subtitle.desc,
                                }}
                              />
                            </div>
                          ))}
                        </div>
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

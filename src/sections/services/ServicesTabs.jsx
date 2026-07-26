import { useState, useEffect } from 'react';
import { iconMap } from './constants';
import { FiChevronDown } from 'react-icons/fi';
import OptimizedImage from '../../components/OptimizedImage';

export function ServicesTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveTab(tabs?.[0]?.key || '');
  }, [tabs]);

  const currentTabObj = tabs?.find((tab) => tab.key === activeTab);

  return (
    <div className="max-w-7xl mx-auto py-8 antialiased font-sans text-slate-900 tracking-normal selection:bg-[#10284e]/10">
      <div className="md:hidden relative px-6">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full text-left bg-white border border-slate-200/80 text-[#10284e] font-medium py-3.5 px-5 rounded-2xl flex justify-between items-center transition-all duration-200 shadow-sm active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3.5">
            {currentTabObj?.icon && iconMap[currentTabObj.icon] && (
              <span className="text-xl text-amber-500">
                {iconMap[currentTabObj.icon]}
              </span>
            )}
            <span className="text-[14px] font-semibold tracking-tight">
              {currentTabObj?.label || 'Select Category'}
            </span>
          </div>
          <FiChevronDown
            className={`h-5 w-5 text-[#10284e]/70 transition-transform duration-300 ease-out ${
              isDropdownOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {isDropdownOpen && (
          <ul className="absolute left-6 right-6 bg-white border border-slate-100 rounded-2xl shadow-xl mt-2 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-200">
            {tabs?.map((item) => (
              <li
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setIsDropdownOpen(false);
                }}
                className={`flex items-center space-x-4 px-5 py-3.5 cursor-pointer transition-all ${
                  activeTab === item.key
                    ? 'bg-amber-50/60 text-[#10284e] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.icon && iconMap[item.icon] && (
                  <span
                    className={`text-lg transition-opacity ${activeTab === item.key ? 'text-amber-500 opacity-100' : 'opacity-0'}`}
                  >
                    {iconMap[item.icon]}
                  </span>
                )}
                <span className="text-[13.5px] font-medium tracking-tight">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hidden md:block w-full max-w-4xl mx-auto px-6 mb-12">
        <div className="flex w-full border-b border-slate-200">
          {tabs?.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex-1 relative pb-4 pt-2 transition-all duration-300 ease-out flex flex-col items-center group ${
                  isActive
                    ? 'text-[#10284e]'
                    : 'text-slate-500 hover:text-[#10284e]'
                }`}
              >
                <span
                  className={`text-[22px] mb-2.5 transition-transform duration-300 ${
                    isActive
                      ? 'text-amber-500 scale-110'
                      : 'group-hover:text-amber-500/80 group-hover:-translate-y-1'
                  }`}
                >
                  {item.icon && iconMap[item.icon] ? iconMap[item.icon] : null}
                </span>
                <span
                  className={`text-[11px] uppercase tracking-widest text-center ${isActive ? 'font-bold' : 'font-semibold'}`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-amber-500 rounded-full animate-in fade-in zoom-in-50 duration-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 px-4">
        {tabs?.map((item) => {
          if (activeTab !== item.key) return null;

          return (
            <div
              key={item.key}
              className="animate-in fade-in-50 duration-700 slide-in-from-bottom-4"
            >
              <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
                {item.desc && (
                  <div className="mb-12 pb-10 border-b border-slate-100">
                    <div className="max-w-3xl mx-auto text-center">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-3">
                        Overview
                      </span>
                      <div
                        className="text-[13px] text-slate-700 font-normal leading-relaxed prose prose-slate max-w-none mx-auto text-center last:[&>p]:mb-0 "
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {item.content?.map((content, index) => {
                    const hasImage = !!content.imageSrc;
                    const isEven = index % 2 === 0;
                    const totalSubtitles = content.subtitle?.length || 0;
                    const isHorizontal = content.isHorizontal || false;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col md:flex-row gap-8 service__content ${
                          hasImage && !isEven ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        {hasImage && (
                          <div className="w-full md:w-[38%] shrink-0">
                            <div className="w-full rounded-2xl overflow-hidden relative aspect-[4/3] shadow-md border border-slate-100 group">
                              <OptimizedImage
                                src={content.imageSrc}
                                alt={content.title || item.label}
                                originalFormat="jpg"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
                            </div>
                          </div>
                        )}

                        <div className="text-left flex-1 w-full">
                          {content.title && (
                            <div className="mb-6">
                              <h3 className="font-sans font-bold text-xl md:text-2xl text-[#10284e] tracking-tight leading-snug mb-3">
                                {content.title}
                              </h3>
                              <div className="w-10 h-[3px] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                            </div>
                          )}

                          {content.desc && (
                            <div
                              className="text-[14.5px] text-slate-700 font-normal leading-relaxed service__details mb-6 [&_li::marker]:text-amber-500"
                              dangerouslySetInnerHTML={{ __html: content.desc }}
                            />
                          )}

                          {totalSubtitles > 0 && (
                            <div
                              className={`grid gap-6 ${
                                isHorizontal
                                  ? 'grid-cols-1 md:grid-cols-2'
                                  : 'grid-cols-1'
                              }`}
                            >
                              {content.subtitle.map((sub, subIdx) => {
                                return (
                                  <div
                                    key={subIdx}
                                    className="relative pl-4 border-l-[3px] border-amber-200 transition-colors duration-300 hover:border-amber-500 break-inside-avoid"
                                  >
                                    <h4 className="font-sans font-bold text-[12px] uppercase tracking-wider text-[#10284e] mb-2">
                                      {sub.title}
                                    </h4>
                                    <div
                                      className="
                                        text-[14.5px] leading-relaxed text-slate-600 font-normal service__subtitle
                                        [&_ul]:list-outside [&_ul]:mt-2 [&_ul]:list-disc
                                        [&_li]:text-slate-600 [&_li::marker]:text-amber-500 
                                      "
                                      dangerouslySetInnerHTML={{
                                        __html: sub.desc,
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentTabObj?.whyChooseUs && (
        <div className="mt-20 px-4 sm:px-6 animate-in fade-in duration-700 slide-in-from-bottom-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-10">
              <h2 className="font-sans font-bold text-2xl text-[#10284e] tracking-tight">
                {currentTabObj.whyChooseUs.title || 'Why Choose Us'}
              </h2>
              <div className="w-10 h-[3px] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mx-auto" />
              {currentTabObj.whyChooseUs.description && (
                <p className="max-w-xl mx-auto text-slate-600 font-normal text-[14.5px] leading-relaxed pt-1">
                  {currentTabObj.whyChooseUs.description}
                </p>
              )}
            </div>

            {currentTabObj.whyChooseUs.items &&
              currentTabObj.whyChooseUs.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
                  {currentTabObj.whyChooseUs.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center hover:shadow-md transition-all duration-300"
                    >
                      {item.icon && iconMap[item.icon] && (
                        <div className="w-10 h-10 bg-amber-50/80 rounded-full flex items-center justify-center mb-3">
                          <span className="text-[18px] text-amber-500 flex items-center justify-center">
                            {iconMap[item.icon]}
                          </span>
                        </div>
                      )}
                      <h3 className="text-[15px] font-bold text-[#10284e] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[13.5px] text-slate-600 font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            {currentTabObj.whyChooseUs.disclaimer && (
              <div className="mt-10 pt-6 border-t border-slate-200/60">
                <div className="text-center max-w-3xl mx-auto">
                  <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                    {currentTabObj.whyChooseUs.disclaimer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesTabs;

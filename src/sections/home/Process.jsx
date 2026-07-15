import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  HiOutlineCalendar,
  HiOutlineLightBulb,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

const Process = () => {
  const { t } = useTranslation('main');
  const process = t('process', { returnObjects: true });
  const steps = process.steps || [];

  const iconMap = {
    HiOutlineCalendar,
    HiOutlineLightBulb,
    HiOutlineClipboardList,
    HiOutlineCheckCircle,
  };

  if (!steps.length) return null;

  return (
    <section className="py-24 bg-slate-50" id="process">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-sans font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            Our Approach
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#10284e] mb-6">
            {process.title}
          </h3>
          <div className="w-20 h-[1px] bg-amber-500/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon];

            return (
              <div
                key={index}
                className="bg-white border border-slate-100 relative flex flex-col items-center text-center pb-12 transition-all hover:border-amber-200"
              >
                <div className="absolute -top-2 w-20 h-24 bg-gradient-to-b from-[#10284e] to-[#2a4570] flex flex-col items-center text-white pt-4 shadow-lg">
                  <span className="text-[10px] uppercase opacity-80 tracking-widest">
                    Step
                  </span>
                  <span className="text-2xl font-bold font-serif">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-24 mb-6 p-4 border border-amber-100 text-amber-500 bg-amber-50/50">
                  {IconComponent && <IconComponent className="w-8 h-8" />}
                </div>

                <h4 className="text-lg font-serif font-bold text-[#10284e] mb-4 px-4">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed px-6">
                  {step.description}
                </p>

                <div className="absolute -bottom-4 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-amber-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;

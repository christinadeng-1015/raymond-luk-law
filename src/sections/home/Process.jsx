import React, { useState, useEffect } from 'react';
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
  const steps = process.steps;

  const iconMap = {
    HiOutlineCalendar: HiOutlineCalendar,
    HiOutlineLightBulb: HiOutlineLightBulb,
    HiOutlineClipboardList: HiOutlineClipboardList,
    HiOutlineCheckCircle: HiOutlineCheckCircle,
  };

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <section className="w-full py-20 bg-[#10284e] text-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
        <h3 className="text-3xl text-center font-bold mb-16 tracking-wide text-white">
          {process.title}
        </h3>
        <div
          className="hidden lg:flex relative items-center justify-between"
          data-aos="flip-down"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#1b375f] z-0"></div>
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon];
            return (
              <div
                key={index}
                className="relative flex flex-col items-center w-1/4 group transition-transform duration-300"
                onClick={() => handleStepClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className={`relative z-10 p-6 rounded-full mb-6 shadow-lg flex items-center justify-center 
                    ${activeStep === index ? 'bg-blue-600' : ''} transition-colors duration-300 bg-blue-400`}
                >
                  {IconComponent && <IconComponent className="text-2xl" />}
                </div>
                <h4 className="text-xl font-bold mb-4 text-white text-center">
                  {step.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed text-center text-white transition-opacity duration-300 ${
                    activeStep === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex lg:hidden flex-col items-center relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#1b375f] z-0"></div>
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon];
            return (
              <div
                key={index}
                className="relative flex flex-col items-center w-full mb-12 group transition-transform duration-300"
                onClick={() => handleStepClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="absolute w-8 h-8 bg-[#1b375f] border-4 border-[#256199] rounded-full z-10"></div>
                <div
                  className={`relative z-10 p-6 rounded-full mb-4 shadow-lg flex items-center justify-center ${activeStep === index ? 'bg-blue-600' : ''} transition-colors duration-300 bg-blue-400`}
                >
                  {IconComponent && <IconComponent className="text-2xl" />}
                </div>
                <h4 className="text-xl font-bold mb-4 text-center text-white">
                  {step.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed text-center text-white transition-opacity duration-300 ${
                    activeStep === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;

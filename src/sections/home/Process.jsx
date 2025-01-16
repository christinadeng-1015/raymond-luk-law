import React, { useState, useEffect } from "react";
import {
  HiOutlineCalendar,
  HiOutlineLightBulb,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const Process = () => {
  const steps = [
    {
      title: "Free Initial Consultation",
      description: "Schedule a call with our staff to understand your needs.",
      icon: <HiOutlineCalendar />,
    },
    {
      title: "Appointments",
      description:
        "In-person or virtual appointments with a lawyer. *First 15 minutes free.",
      icon: <HiOutlineLightBulb />,
    },
    {
      title: "Work & Communication",
      description: "Start paperwork and provide a detailed timeline.",
      icon: <HiOutlineClipboardList />,
    },
    {
      title: "Result",
      description: "Deliver the best possible result for our customers.",
      icon: <HiOutlineCheckCircle />,
    },
  ];

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
    <div className="w-full py-20 bg-[#10284e] text-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
        <h3 className="text-4xl text-center font-bold mb-16 tracking-wide text-white">
          Our Process
        </h3>
        <div className="hidden lg:flex relative items-center justify-between">
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-[#1b375f] z-0"></div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center w-1/4 group transition-transform duration-300 ${
                activeStep === index ? "" : "opacity-50"
              }`}
              onClick={() => handleStepClick(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="relative z-10 p-6 rounded-full mb-6 shadow-lg flex items-center justify-center bg-[#1b375f] transition-colors duration-300 bg-blue-400">
                <div className="text-4xl">{step.icon}</div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-white text-center">
                {step.title}
              </h4>
              <p
                className={`text-sm leading-relaxed text-center text-white transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex lg:hidden flex-col items-center relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#1b375f] z-0"></div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center w-full mb-12 group transition-transform duration-300 ${
                activeStep === index ? "" : "opacity-50"
              }`}
              onClick={() => handleStepClick(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="absolute w-8 h-8 bg-[#1b375f] border-4 border-[#256199] rounded-full z-10"></div>
              <div className="relative z-10 p-6 rounded-full mb-4 shadow-lg flex items-center justify-center bg-[#1b375f] transition-colors duration-300 bg-blue-400">
                <div className="text-4xl">{step.icon}</div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-center text-white">
                {step.title}
              </h4>
              <p
                className={`text-sm leading-relaxed text-center text-white transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;

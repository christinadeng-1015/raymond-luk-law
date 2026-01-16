import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StepIcon = ({ index, active }) => (
  <div
    className={[
      'flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-semibold',
      active
        ? 'bg-[#10284e] text-white border-[#10284e]'
        : 'bg-white text-gray-700 border-gray-200',
    ].join(' ')}
    aria-hidden="true"
  >
    {index + 1}
  </div>
);

const HowToApply = () => {
  const { t } = useTranslation('career');
  const steps = t('howToApply.steps', { returnObjects: true });
  const title = t('howToApply.title');
  const intro = t('howToApply.intro');

  const [activeStep, setActiveStep] = useState(0);

  if (!Array.isArray(steps)) return null;

  return (
    <section className="mx-auto space-y-10">
      <div className="space-y-2 max-w-3xl text-center mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 ">{title}</h2>
        <p className="text-gray-700">{intro}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              className={[
                'text-left rounded-2xl border p-5 transition shadow-sm',
                isActive
                  ? 'border-[#10284e] ring-2 ring-[#10284e]/10'
                  : 'border-gray-200 hover:bg-gray-50',
              ].join(' ')}
            >
              <div className="flex items-start gap-4">
                <StepIcon index={index} active={isActive} />
                <div>
                  <p className="font-semibold text-gray-900">{step.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-900 mt-1">
          {steps[activeStep].title}
        </h3>
        <p className="text-gray-700 mt-2">{steps[activeStep].description}</p>

        {Array.isArray(steps[activeStep].prompts) && (
          <div className="mt-5 space-y-3">
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              {steps[activeStep].prompts.map((prompt, idx) => (
                <li key={idx}>{prompt}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(steps[activeStep].items) && (
          <div className="mt-5 space-y-3">
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              {steps[activeStep].items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowToApply;

import React from 'react';
import { useTranslation } from 'react-i18next';
import FAQs from './FAQs';
import OpenRoles from './OpenRoles';
import HowToApply from './HowToApply';

const CareerContainer = () => {
  const { t } = useTranslation('career');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 text-left">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-center">{t('subtitle')}</h1>
        <div
          className="text-base leading-relaxed text-gray-700 text-left"
          dangerouslySetInnerHTML={{ __html: t('tagline') }}
        />
      </header>

      <hr className="my-4 h-px bg-gray-500 opacity-50" />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            {t('howToApplyTitle')}
          </h2>
          <div
            className="text-gray-700 text-sm leading-relaxed text-left"
            dangerouslySetInnerHTML={{ __html: t('howToApplyDescription') }}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            {t('whatToExpectTitle')}
          </h2>
          <div
            className="text-gray-700 text-sm leading-relaxed text-left"
            dangerouslySetInnerHTML={{ __html: t('whatToExpectSteps') }}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-center">
            {t('languagesRequiredTitle')}
          </h2>
          <div
            className="text-gray-700 text-sm leading-relaxed text-left"
            dangerouslySetInnerHTML={{
              __html: t('languagesRequiredDescription'),
            }}
          />
        </div>
      </section>

      <hr className="my-4 h-px bg-gray-500 opacity-50" />

      <OpenRoles />

      <hr className="my-4 h-px bg-gray-500 opacity-50" />

      <HowToApply />

      <section className="flex justify-center py-8">
        <a
          href="https://forms.gle/APksMKmFwDW3GcxP9"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            px-8 py-3
            text-sm font-medium
            text-white
            bg-[#10284e]
            hover:bg-gray-800
            transition
            rounded-md
          "
        >
          {t('joinUsButton')}
        </a>
      </section>

      <hr className="my-4 h-px bg-gray-500 opacity-50" />

      <FAQs />
      <hr className="my-4 h-px bg-gray-500 opacity-50" />
      <section className="space-y-4 pb-10">
        <h2 className="text-2xl font-semibold text-center">
          {t('accessibilityStatementTitle')}
        </h2>
        <div
          className="text-base leading-relaxed text-gray-700 text-left"
          dangerouslySetInnerHTML={{ __html: t('accessibilityStatement') }}
        />

        <h2 className="text-2xl font-semibold text-center pt-10">
          {t('privacyNoticeTitle')}
        </h2>
        <div
          className="text-base leading-relaxed text-gray-700 text-left"
          dangerouslySetInnerHTML={{ __html: t('privacyNotice') }}
        />
      </section>
    </div>
  );
};

export default CareerContainer;

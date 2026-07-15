import React from 'react';
import { useTranslation } from 'react-i18next';
import FAQs from './FAQs';
import OpenRoles from './OpenRoles';

const CareerContainer = () => {
  const { t } = useTranslation('career');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 space-y-16 text-left font-sans antialiased text-slate-800">
      <header className="max-w-3xl space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#10284e]">
            {t('subtitle', 'Careers at Luk & Associates')}
          </h1>
          <div className="w-12 h-[3px] bg-amber-600 rounded-full" />
        </div>
        <div
          className="text-[15px] sm:text-base leading-relaxed text-slate-600 pt-1 prose prose-slate max-w-none prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t('tagline') }}
        />
      </header>

      <div className="w-full h-px bg-gray-200" />

      <section className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(16,40,78,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_25px_-2px_rgba(16,40,78,0.08)] hover:-translate-y-0.5">
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 bg-[#10284e] rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm shadow-[#10284e]/20">
                  <svg
                    className="w-4 h-4 transform rotate-45 -translate-x-0.5 translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-serif font-bold text-[#10284e] tracking-tight">
                  {t('howToApplyTitle')}
                </h3>
              </div>
              <div className="w-8 h-[1.5px] bg-amber-500/60" />
              <div
                className="text-slate-600 text-[13.5px] leading-relaxed prose prose-sm max-w-none prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('howToApplyDescription') }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(16,40,78,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_25px_-2px_rgba(16,40,78,0.08)] hover:-translate-y-0.5">
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 bg-[#10284e] rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm shadow-[#10284e]/20">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-serif font-bold text-[#10284e] tracking-tight">
                  {t('whatToExpectTitle')}
                </h3>
              </div>
              <div className="w-8 h-[1.5px] bg-amber-500/60" />
              <div
                className="text-slate-600 text-[13.5px] leading-relaxed prose prose-sm max-w-none prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('whatToExpectSteps') }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(16,40,78,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_25px_-2px_rgba(16,40,78,0.08)] hover:-translate-y-0.5">
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 bg-[#10284e] rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm shadow-[#10284e]/20">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-serif font-bold text-[#10284e] tracking-tight">
                  {t('languagesRequiredTitle')}
                </h3>
              </div>
              <div className="w-8 h-[1.5px] bg-amber-500/60" />
              <div
                className="text-slate-600 text-[13.5px] leading-relaxed prose prose-sm max-w-none prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t('languagesRequiredDescription'),
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <a
            href="https://forms.gle/APksMKmFwDW3GcxP9"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              px-8 py-3.5
              text-sm font-semibold tracking-wide
              text-white bg-[#10284e]
              hover:bg-amber-600
              transition-colors duration-250 ease-in-out
              rounded-xl shadow-md shadow-[#10284e]/10 hover:shadow-amber-600/10
            "
          >
            {t('joinUsButton')}
          </a>
        </div>
      </section>

      <div className="w-full h-px bg-gray-200" />

      <div>
        <OpenRoles />
      </div>

      <div className="w-full h-px bg-gray-200" />

      <div className="space-y-12">
        <FAQs />

        <div className="divide-y divide-gray-200 border border-gray-150 rounded-2xl px-5 text-[12.5px] text-slate-500 space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-[#10284e] tracking-tight">
              {t('accessibilityStatementTitle')}
            </h2>
            <div
              className="leading-relaxed prose prose-sm max-w-none text-slate-500/90 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('accessibilityStatement') }}
            />
          </div>

          <div className="space-y-2 pt-6">
            <h2 className="text-sm font-serif font-bold text-[#10284e] tracking-tight">
              {t('privacyNoticeTitle')}
            </h2>
            <div
              className="leading-relaxed prose prose-sm max-w-none text-slate-500/90 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('privacyNotice') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerContainer;

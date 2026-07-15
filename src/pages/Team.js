import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
import TeamContainer from '../sections/team/TeamContainer';
import OptimizedImage from '../components/OptimizedImage';

export default function TeamPage() {
  const mainRef = useRef();
  const { t } = useTranslation('team');
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca/team';

  return (
    <>
      <Helmet>
        <title>
          Our Team | Luk & Associates - Experienced Lawyers in Markham, ON
        </title>
        <meta
          name="description"
          content="Meet the experienced legal team at Luk & Associates in Markham, ON. Dedicated lawyers specializing in family law, immigration, and more. Get to know our experts."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
          <OptimizedImage
            src="assets/banner/team.jpg"
            alt="Our legal team at Luk & Associates"
            originalFormat="jpg"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 text-left">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
              {t('bannerText')}
            </h1>
            <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
          </div>
        </div>

        <TeamContainer />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

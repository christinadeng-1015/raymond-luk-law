import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
import TeamContainer from '../sections/team/TeamContainer';
import OptimizedImage from '../components/OptimizedImage';

export default function TeamPage() {
  const mainRef = useRef();
  const { t } = useTranslation('team');

  const domain = 'https://www.luklaw.ca';

  const pageTitle = t(
    'seo.title',
    'Our Team | Luk & Associates - Experienced Lawyers in Markham, ON'
  );
  const pageDescription = t(
    'seo.description',
    'Meet the experienced legal team at Luk & Associates in Markham, ON. Dedicated lawyers specializing in family law, immigration, and real estate.'
  );

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageTitle,
    url: `${domain}/team`,
    description: pageDescription,
    mainEntity: {
      '@type': 'LegalService',
      name: 'Luk & Associates',
      url: domain,
      image: `${domain}/assets/banner/team.jpg`,
      telephone: '+19053331740',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '90 Allstate Parkway, Suite 603',
        addressLocality: 'Markham',
        addressRegion: 'ON',
        postalCode: 'L3R 6H3',
        addressCountry: 'CA',
      },
    },
  };

  return (
    <>
      <SEO
        title={t('seo.pageTitle', 'Our Experienced Legal Team')}
        description={pageDescription}
        keywords={t(
          'seo.keywords',
          'Markham lawyers, law firm Markham, legal team Markham'
        )}
        path="/team"
        image="/assets/banner/team.jpg"
        schema={teamSchema}
      />

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
          <OptimizedImage
            src="/assets/banner/team.jpg"
            alt={t('bannerAlt', 'Our legal team at Luk & Associates')}
            originalFormat="jpg"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 text-left">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
              {t('bannerText')}
            </h1>
            <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
            <div
              className="text-[15px] sm:text-base leading-relaxed text-white/90 font-sans md:w-1/3 pt-6"
              dangerouslySetInnerHTML={{ __html: t('description') }}
            />
          </div>
        </div>

        <TeamContainer />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

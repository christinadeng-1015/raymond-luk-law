import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import CareerContainer from '../sections/career/CareerContainer';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import OptimizedImage from '../components/OptimizedImage';

export default function CareerPage() {
  const mainRef = useRef();
  const { t } = useTranslation('career');

  const domain = 'https://www.luklaw.ca';

  // Dynamic meta text using i18next with fallbacks
  const pageTitle = t(
    'seo.title',
    'Careers | Join Our Legal Team in Markham, ON'
  );
  const pageDescription = t(
    'seo.description',
    'Explore career opportunities at Luk & Associates. Join our experienced legal team in Markham, ON, specializing in family law, immigration, and more.'
  );

  // Schema structured specifically for a Career Page
  const careerSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageTitle,
    url: `${domain}/careers`,
    description: pageDescription,
    mainEntity: {
      '@type': 'LegalService',
      name: 'Luk & Associates',
      url: domain,
      image: `${domain}/assets/banner/career.jpg`,
      telephone: '+19053331740',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Liberty Square, 3601 Hwy 7 Unit 803',
        addressLocality: 'Markham',
        addressRegion: 'ON',
        postalCode: 'L3R 0M3',
        addressCountry: 'CA',
      },
    },
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={t(
          'seo.keywords',
          'careers law firm Markham, law jobs Markham, legal careers Ontario, legal assistant jobs Markham'
        )}
        path="/careers"
        image="/assets/banner/career.jpg"
        schema={careerSchema}
      />

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
          <OptimizedImage
            src="assets/banner/career.jpg"
            alt={t('bannerAlt', 'Career opportunities at Luk & Associates')}
            originalFormat="jpg"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight md:w-1/2">
              {t('title')}
            </h1>
            <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
            <div
              className="text-[15px] sm:text-base leading-relaxed text-white/90 font-sans md:w-1/3 pt-6"
              dangerouslySetInnerHTML={{ __html: t('description') }}
            />
          </div>
        </div>

        <CareerContainer />
        <ContactFloatIcon />
      </main>
    </>
  );
}

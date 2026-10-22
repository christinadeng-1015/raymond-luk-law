import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Services from '../sections/home/Services';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import OptimizedImage from '../components/OptimizedImage';

export default function ServicesPage() {
  const mainRef = useRef();
  const { t } = useTranslation('services');

  const domain = 'https://www.luklaw.ca';

  const pageTitle = t(
    'seo.title',
    'Legal Services | Luk & Associates - Markham, ON'
  );
  const pageDescription = t(
    'seo.description',
    'Comprehensive legal services in Markham, ON. Family law, immigration, personal injury, real estate, and wills. Trusted legal experts ready to help.'
  );

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Legal Services',
    provider: {
      '@type': 'LegalService',
      name: 'Luk & Associates',
      url: domain,
      image: `${domain}/assets/banner/law.jpg`,
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
    areaServed: {
      '@type': 'City',
      name: 'Markham',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Practice Areas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Family Law',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Real Estate Law',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wills & Estates',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Law',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Immigration Law',
          },
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={t(
          'seo.keywords',
          'law firm Markham, legal services Markham, family lawyer Markham, immigration lawyer Markham, personal injury Markham'
        )}
        path="/services"
        image="/assets/banner/law.jpg"
        schema={servicesSchema}
      />

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
          <OptimizedImage
            src="assets/banner/law.jpg"
            alt={t('bannerAlt', 'Legal services offered by Luk & Associates')}
            originalFormat="jpg"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight md:w-1/2">
              {t('bannerText')}
            </h1>
            <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
            <div
              className="text-[15px] sm:text-base leading-relaxed text-white/90 font-sans md:w-1/3 pt-6"
              dangerouslySetInnerHTML={{ __html: t('subtitle') }}
            />
          </div>
        </div>

        <Services />
        <ContactFloatIcon />
      </main>
    </>
  );
}

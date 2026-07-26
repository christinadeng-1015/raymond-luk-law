import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Service from '../sections/services/Service';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function LawPage() {
  const mainRef = useRef();
  const location = useLocation();
  const { t } = useTranslation('services');

  const domain = 'https://www.luklaw.ca';
  const currentPath = location?.pathname || '';

  // Find practice area details matching the current URL route
  const servicesList = t('services', { returnObjects: true }) || [];
  const activeService = Array.isArray(servicesList)
    ? servicesList.find((item) => item.path === currentPath)
    : null;

  // Dynamic titles and descriptions per legal service page
  const pageTitle = activeService?.title
    ? `${activeService.title}`
    : t('seo.fallbackTitle', 'Legal Practice Area');

  const pageDescription =
    activeService?.desc ||
    t(
      'seo.fallbackDesc',
      'Comprehensive legal services in Markham, ON offered by Luk & Associates.'
    );

  // Schema tailored specifically for individual practice areas
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: activeService?.title || 'Legal Service',
    description: pageDescription,
    provider: {
      '@type': 'LegalService',
      name: 'Luk & Associates',
      url: domain,
      image: `${domain}/assets/banner/law.jpg`,
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
    areaServed: {
      '@type': 'City',
      name: 'Markham',
    },
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={t(
          'seo.keywords',
          'law firm Markham, legal services Markham, family lawyer Markham, real estate lawyer Markham'
        )}
        path={currentPath}
        image="/assets/banner/law.jpg"
        schema={serviceSchema}
      />

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <Service />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

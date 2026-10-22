import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Header from '../sections/home/Header';
import TeamContainer from '../sections/team/TeamContainer';
import Process from '../sections/home/Process';
import Services from '../sections/home/Services';
import ParallaxSection from '../sections/home/ParallaxSection';
import Testimonials from '../sections/home/Testimonials';
import FAQs from '../sections/home/FAQs';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function Home() {
  const mainRef = useRef();
  const { t } = useTranslation('home');

  const domain = 'https://www.luklaw.ca';

  // Dynamic meta text using i18next with fallbacks
  const pageDescription = t(
    'seo.description',
    'Expert legal services in Markham, ON. Luk & Associates specializes in family law, immigration, personal injury, real estate, and wills. Contact us for reliable legal advice.'
  );

  // Full LegalService schema for the main homepage
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Luk & Associates',
    url: domain,
    image: `${domain}/assets/banner/home.png`,
    telephone: '+19053331740',
    description: pageDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '90 Allstate Parkway, Suite 603',
      addressLocality: 'Markham',
      addressRegion: 'ON',
      postalCode: 'L3R 6H3',
      addressCountry: 'CA',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Markham',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
    ],
  };

  return (
    <>
      <SEO
        title={t('seo.title', 'Law Firm in Markham, ON')}
        description={pageDescription}
        keywords={t(
          'seo.keywords',
          'law firm Markham, Markham law firm, legal services Markham, family lawyer Markham, real estate lawyer Markham, wills and estates Markham'
        )}
        path="/"
        image="/assets/banner/home.png"
        schema={homeSchema}
      />

      <main ref={mainRef}>
        <Header />
        <TeamContainer />
        <Testimonials />
        <Services />
        <Process />
        <ParallaxSection />
        <FAQs />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

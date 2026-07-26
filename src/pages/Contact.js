import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import ContactContainer from '../sections/contact/ContactContainer';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function ContactPage() {
  const mainRef = useRef();
  const { t } = useTranslation('contact');

  const domain = 'https://www.luklaw.ca';

  // Dynamic meta text using i18next with fallbacks
  const pageTitle = t('seo.title', 'Contact Us');
  const pageDescription = t(
    'seo.description',
    'Get in touch with Luk & Associates for expert legal advice in Markham, ON. Contact our team for family law, real estate, wills, and immigration services.'
  );

  // Schema structured specifically for a Contact Page
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageTitle,
    url: `${domain}/contact`,
    description: pageDescription,
    mainEntity: {
      '@type': 'LegalService',
      name: 'Luk & Associates',
      url: domain,
      image: `${domain}/assets/banner/contact.png`,
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
          'law firm Markham, contact law firm Markham, Markham lawyers, legal advice Markham'
        )}
        path="/contact"
        image="/assets/banner/contact.png"
        schema={contactSchema}
      />

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <ContactContainer />
        <ContactFloatIcon />
      </main>
    </>
  );
}

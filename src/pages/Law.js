import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Service from '../sections/services/Service';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function LawPage() {
  const mainRef = useRef();
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca';
  const path = window.location.pathname;
  const { t } = useTranslation('services');
  const services = t('services', { returnObjects: true });
  const service = services.find((service) => service.path === path);

  return (
    <>
      <Helmet>
        <title>
          {service
            ? `${service.title} | Luk & Associates - Markham, ON`
            : 'Legal Services | Luk & Associates - Markham, ON'}
        </title>
        <meta
          name="description"
          content={
            service
              ? service.desc
              : 'Comprehensive legal services in Markham, ON.'
          }
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <Service />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

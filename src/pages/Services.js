import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Services from '../sections/home/Services';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import OptimizedImage from '../components/OptimizedImage';

export default function ServicesPage() {
  const mainRef = useRef();
  const { t } = useTranslation('services');
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca/services';
  return (
    <>
      <Helmet>
        <title>Legal Services | Luk & Associates - Markham, ON</title>
        <meta
          name="description"
          content="Comprehensive legal services in Markham, ON. Family law, immigration, personal injury, real estate, and wills. Trusted legal experts ready to help."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-64 md:h-1/2">
          <OptimizedImage
            src="assets/banner/law.jpg"
            alt="Legal services offered by Luk & Associates"
            originalFormat="jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t('bannerText')}
            </h1>
          </div>
        </div>
        <Services />
        <ContactFloatIcon />
      </main>
    </>
  );
}

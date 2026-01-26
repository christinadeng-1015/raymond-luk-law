import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ResourceContainer from '../sections/resources/ResourceContainer';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function ResourcesPage() {
  const mainRef = useRef();
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca/resources';

  return (
    <>
      <Helmet>
        <title>Legal Resources | Luk & Associates - Markham, ON</title>
        <meta
          name="description"
          content="Access valuable legal resources, FAQs, and information from Luk & Associates in Markham, ON. Stay informed on family law, immigration, and more."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <ResourceContainer />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

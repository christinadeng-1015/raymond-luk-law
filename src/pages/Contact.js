import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import ContactContainer from '../sections/contact/ContactContainer';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function ContactPage() {
  const mainRef = useRef();
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca/contact';

  return (
    <>
      <Helmet>
        <title>Contact Us | Luk & Associates - Markham, ON</title>
        <meta
          name="description"
          content="Get in touch with Luk & Associates for expert legal advice in Markham, ON. Contact our team for family law, immigration, and more services."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <ContactContainer />
        <ContactFloatIcon />
      </main>
    </>
  );
}

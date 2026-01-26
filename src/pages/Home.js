import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
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
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca';

  return (
    <>
      <Helmet>
        <title>Luk & Associates ｜ Law firm in Markham, ON</title>
        <meta
          name="description"
          content="Expert legal services in Markham, ON. Luk & Associates specializes in family law, immigration, personal injury, real estate, and wills. Contact us for reliable legal advice."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <main ref={mainRef}>
        <Header />
        <TeamContainer />
        <Process />
        <Services />
        <Testimonials />
        <ParallaxSection />
        <FAQs />
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

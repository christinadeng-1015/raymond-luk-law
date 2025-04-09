import { useRef } from 'react';
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

  return (
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
  );
}

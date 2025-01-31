import { useRef } from "react";
import Header from "../sections/home/Header";
import Process from "../sections/home/Process";
import ServicesHome from "../sections/home/ServicesHome";
import ParallaxSection from "../sections/home/ParallaxSection";
import Testimonials from "../sections/home/Testimonials";
import FAQs from "../sections/home/FAQs";
import ContactFloatIcon from '../sections/home/ContactFloatIcon'

export default function Home() {
  const mainRef = useRef();

  return (
    <main ref={mainRef}>
      <Header />
      <ServicesHome />
      <Process />
      <ParallaxSection />
      <Testimonials />
      <FAQs />
      <ContactFloatIcon />
    </main>
  );
}

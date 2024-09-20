import Nav from "../sections/home/Navbar";
import Header from "../sections/home/Header";
import About from "../sections/about/About";
import Rates from "../sections/home/Rates";
import Services from "../sections/home/Services";
import Team from "../sections/home/Team";
import ParallaxSection from "../sections/home/ParallaxSection";
import Testimonials from "../sections/testimonials/Testimonials";
import FAQs from "../sections/home/FAQs";
import Contact from "../sections/contact/Contact";
import Footer from "../sections/footer/Footer";
import FloatingNav from "../sections/floating-nav/FloatingNav";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const mainRef = useRef();
  const [showFloatingNav, setShowFloatingNav] = useState(true);
  const [siteYPostion, setSiteYPosition] = useState(0);

  const showFloatingNavHandler = () => {
    setShowFloatingNav(true);
  };

  const hideFloatingNavHandler = () => {
    setShowFloatingNav(false);
  };

  // check if floating nav should be shown or hidden
  const floatingNavToggleHandler = () => {
    // check if we scrolled up or down at least 20px
    if (
      siteYPostion < mainRef?.current?.getBoundingClientRect().y - 20 ||
      siteYPostion > mainRef?.current?.getBoundingClientRect().y + 20
    ) {
      showFloatingNavHandler();
    } else {
      hideFloatingNavHandler();
    }

    setSiteYPosition(mainRef?.current?.getBoundingClientRect().y);
  };

  useEffect(() => {
    const checkYPosition = setInterval(floatingNavToggleHandler, 2000);

    // cleanup function
    return () => clearInterval(checkYPosition);
  }, [siteYPostion]);

  return (
    <main ref={mainRef}>
      <Header />
      <Rates />
      <Services />
      <Team />
      <FAQs />
      <ParallaxSection />
      {showFloatingNav && <FloatingNav />}
    </main>
  );
}

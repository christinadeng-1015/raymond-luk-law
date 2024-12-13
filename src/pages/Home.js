import { useRef, useState, useEffect } from "react";
import Header from "../sections/home/Header";
import Contact from "../sections/home/Contact";
import Process from "../sections/home/Process";
import Services from "../sections/home/Services";
import Team from "../sections/home/Team";
import ParallaxSection from "../sections/home/ParallaxSection";
import Testimonials from "../sections/about/Testimonials";
import FAQs from "../sections/home/FAQs";
import FloatingNav from "../sections/navigation/FloatingNav";

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

  useEffect(() => {
    const floatingNavToggleHandler = () => {
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

    const checkYPosition = setInterval(floatingNavToggleHandler, 2000);

    return () => clearInterval(checkYPosition);
  }, [siteYPostion]);

  return (
    <main ref={mainRef} style={{ overflow: "hidden" }}>
      <Header />
      <Team />
      <Testimonials />
      <ParallaxSection />
      <Services />
      <Process />
      <FAQs />
      {showFloatingNav && <FloatingNav />}
    </main>
  );
}

import { useRef } from 'react';
import Service from '../sections/services/Service';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function LawPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <Service />
      <ScrollToTop />
      <ContactFloatIcon />
    </main>
  );
}

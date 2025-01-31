import { useRef } from 'react';
import Services from '../sections/home/Services';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function ServicesPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <Services />
      <ContactFloatIcon />
    </main>
  );
}

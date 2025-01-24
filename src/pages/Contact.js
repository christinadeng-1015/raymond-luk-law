import { useRef } from 'react';
import ContactContainer from '../sections/contact/ContactContainer';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function ContactPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <ContactContainer />
      <ContactFloatIcon />
    </main>
  );
}

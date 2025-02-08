import { useRef } from 'react';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ResourceContainer from '../sections/resources/ResourceContainer';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function ResourcesPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <ResourceContainer />
      <ScrollToTop />
      <ContactFloatIcon />
    </main>
  );
}

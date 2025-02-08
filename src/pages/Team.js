import TeamContainer from '../sections/team/TeamContainer';
import { useRef } from 'react';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function TeamPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <TeamContainer />
      <ScrollToTop />
      <ContactFloatIcon />
    </main>
  );
}

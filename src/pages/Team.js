import TeamContainer from '../sections/team/TeamContainer';
import { useRef } from 'react';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function TeamPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <TeamContainer />
      <ContactFloatIcon />
    </main>
  );
}

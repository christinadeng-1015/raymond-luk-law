import { useRef } from "react";
import Contact from "../sections/contact/Contact";

export default function ContactPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: "hidden" }}>
      <Contact />
    </main>
  );
}

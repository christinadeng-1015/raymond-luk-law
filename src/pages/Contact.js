import { useRef, useState, useEffect } from "react";
import Contact from "../sections/contact/Contact";

export default function ContactPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef}>
      <Contact />
    </main>
  );
}

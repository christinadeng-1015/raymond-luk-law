import { useRef } from "react";
import Services from "../sections/home/Services";

export default function ServicesPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: "hidden" }}>
      <div className="py-48">
        <Services />
      </div>
    </main>
  );
}

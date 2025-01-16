import { useRef } from "react";
import Service from "../sections/services/Service";

export default function LawPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: "hidden" }}>
      <Service />
    </main>
  );
}

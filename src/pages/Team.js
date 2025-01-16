import Team from "../sections/home/Team";
import { useRef } from "react";

export default function TeamPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: "hidden" }}>
      <Team /> 
    </main>
  );
}

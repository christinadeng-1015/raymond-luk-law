import { useRef } from "react";
import Blogs from "../sections/others/Blogs";
import Tools from "../sections/others/Tools";

export default function ResourcesPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef}>
      <Blogs />
      <Tools />
    </main>
  );
}

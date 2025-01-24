import { useRef } from 'react';
import Tools from '../sections/others/Tools';
import Videos from '../sections/others/Videos';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function ResourcesPage() {
  const mainRef = useRef();

  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src="https://res.cloudinary.com/dyozsy6wx/image/upload/v1736993741/resources_bdi4sb.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Legal Resources
          </h1>
        </div>
      </div>
      <div className="min-h-screen max-w-screen-2xl mx-auto">
        <Tools />
        <Videos />
      </div>
      <ContactFloatIcon />
    </main>
  );
}

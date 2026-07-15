import React, { useEffect, useRef, useState } from 'react';

const ParallaxSection = () => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden h-[40vh] sm:h-[60vh] w-full"
      style={{
        clipPath: 'inset(0px 0px 0px 0px)',
      }}
    >
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: loaded ? 'url(/assets/office/office.jpg)' : 'none',
          filter: 'brightness(0.7)',
          opacity: loaded ? 1 : 0,
          transform: 'translateZ(0)',
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full"></div>
    </section>
  );
};

export default ParallaxSection;

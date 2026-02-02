import React from 'react';

const ParallaxSection = () => {
  return (
    <section className="relative overflow-hidden h-[40vh] sm:h-[60vh]">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
          window.innerWidth < 768 ? 'bg-no-repeat' : 'bg-fixed'
        }`}
        style={{
          backgroundImage: `url(/assets/office/office.jpg)`,
          height: '100%',
          filter: 'brightness(0.7)',
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full"></div>
    </section>
  );
};

export default ParallaxSection;

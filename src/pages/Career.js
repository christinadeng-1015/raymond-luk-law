import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CareerContainer from '../sections/career/CareerContainer';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';

export default function CareerPage() {
  const mainRef = useRef();
  const { t } = useTranslation('career');
  return (
    <main ref={mainRef} style={{ overflow: 'hidden' }}>
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src="assets/banner/career.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('title')}
          </h1>
        </div>
      </div>
      <CareerContainer />
      <ContactFloatIcon />
    </main>
  );
}

import React from 'react';
import ContactForm from './ContactForm';
import OfficeImageCarousel from './OfficeImageCarousel';
import OfficeHourTable from './OfficeHourTable';
import ContactInformation from './ContactInformation';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../../components/OptimizedImage';

const ContactContainer = () => {
  const { t } = useTranslation('contact');
  const title = t('title', { returnObjects: true });
  return (
    <section id="contact" className="mx-auto">
      <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
        <OptimizedImage
          src="assets/banner/contact.jpg"
          alt="Contact Luk & Associates for legal services"
          originalFormat="jpg"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
            {title}
          </h1>
          <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row relative z-20 min-h-screen shadow-lg">
        <div className="w-full md:w-2/5 lg:w-1/3 py-8 md:py-12 flex items-center justify-center bg-gray-200">
          <ContactInformation />
        </div>
        <div className="contact_section w-full md:w-3/5 lg:w-2/3 h-auto flex items-center justify-center p-6 md:p-16">
          <ContactForm />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row w-full pb-8 md:pb-0">
        <OfficeImageCarousel />
        <OfficeHourTable />
      </div>
    </section>
  );
};

export default ContactContainer;

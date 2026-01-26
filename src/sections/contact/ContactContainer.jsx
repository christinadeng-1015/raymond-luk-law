import React from 'react';
import ContactForm from './ContactForm';
import OfficeImageCarousel from './OfficeImageCarousel';
import OfficeHourTable from './OfficeHourTable';
import ContactInformation from './ContactInformation';
import { useTranslation } from 'react-i18next';

const ContactContainer = () => {
  const { t } = useTranslation('contact');
  const title = t('title', { returnObjects: true });
  return (
    <div id="contact" className="mx-auto">
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src="assets/banner/contact.jpg"
          alt="Contact Luk & Associates for legal services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
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
    </div>
  );
};

export default ContactContainer;

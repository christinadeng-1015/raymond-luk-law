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
    <section id="contact" className="mx-auto w-full">
      <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
        <OptimizedImage
          src="/assets/banner/contact.jpg"
          alt="Contact Luk & Associates for legal services"
          originalFormat="jpg"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/90 via-[#10284e]/60 to-transparent z-10" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
            {title}
          </h1>
          <div className="w-12 h-[3px] bg-amber-500 rounded-full mt-3" />
          <div
            className="text-[15px] sm:text-base leading-relaxed text-white/90 font-sans md:w-1/2 pt-6"
            dangerouslySetInnerHTML={{ __html: t('description') }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-20 space-y-24 md:space-y-32">
        <div className="flex flex-col md:flex-row items-center justify-between relative z-20 gap-y-10 md:gap-y-0">
          <div className="w-full md:w-[32%] flex items-center justify-center p-2 order-2 md:order-none">
            <ContactInformation />
          </div>

          <div className="hidden md:flex md:my-auto md:mx-8 lg:mx-12 items-center justify-center shrink-0 w-full md:w-auto">
            <div className="h-[380px] w-[1px] bg-gradient-to-b from-transparent via-slate-500/60 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.35)]" />
          </div>

          <div className="contact_section w-full md:w-[68%] h-auto flex items-center justify-center p-2 md:p-6 order-1 md:order-none">
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full items-center justify-center pb-8 md:pb-0 gap-y-10 md:gap-y-0">
          <div className="w-full md:w-[55%] flex items-center justify-center min-h-full p-4 order-3 md:order-none">
            <OfficeHourTable />
          </div>

          <div className="hidden md:flex md:my-auto md:mx-8 lg:mx-12 items-center justify-center shrink-0 w-full md:w-auto">
            <div className="h-[380px] w-[1px] bg-gradient-to-b from-transparent via-slate-500/60 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.35)]" />
          </div>

          <div className="w-full md:w-[45%] flex items-center justify-center min-h-full p-4 order-4 md:order-none">
            <OfficeImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContainer;

import { useTranslation } from 'react-i18next';
import FAQ from '../home/FAQ';

const FAQs = () => {
  const { t } = useTranslation('career');
  const faqSection = t('faq', { returnObjects: true });
  const faqs = faqSection?.faqs || [];

  return (
    <div
      className="flex flex-col items-center bg-white  max-w-screen-2xl mx-auto px-4"
      id="faqs"
    >
      <h2 className="text-2xl text-center text-gray-900 mb-2 font-semibold pb-16">
        {faqSection?.title || 'Frequently Asked Questions'}
      </h2>

      <div
        className="w-full grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-y-6 md:gap-x-8 sm:gap-4 pb-20"
        data-aos="zoom-in"
        data-aos-duration="2000"
        data-aos-easing="ease-in-out"
      >
        {faqs.map((item, index) => (
          <FAQ key={index} faq={item} isOpen={false} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;

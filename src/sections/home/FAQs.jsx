import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';

const FAQs = () => {
  const { t } = useTranslation('faqs');
  const faqs = t('faqs', { returnObjects: true });

  return (
    <section
      className="flex flex-col items-center bg-white pt-16 lg:pb-8 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
      id="faqs"
    >
      <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16">
        {t('title')}
      </h3>
      <div
        className="w-full grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-y-6 md:gap-x-8 sm:gap-4 pb-20"
        data-aos="zoom-in"
        data-aos-duration="2000"
        data-aos-easing="ease-in-out"
      >
        {faqs.map((faq, index) => (
          <FAQ key={index} faq={faq} isOpen={false} />
        ))}
      </div>
    </section>
  );
};

export default FAQs;

import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';

const FAQs = () => {
  const { t } = useTranslation('faqs');
  const faqs = t('faqs', { returnObjects: true }) || [];

  return (
    <section
      className="relative w-full py-16 bg-white overflow-hidden"
      id="faqs"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#10284e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-sans font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            Information
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#10284e] mb-6">
            {t('title')}
          </h3>
          <div className="w-20 h-[1px] bg-amber-500/50 mx-auto" />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg border border-slate-100 hover:border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FAQ faq={faq} isOpen={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;

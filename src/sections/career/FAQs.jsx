import { useTranslation } from 'react-i18next';
import FAQ from '../home/FAQ';

const FAQs = () => {
  const { t } = useTranslation('career');
  const faqSection = t('faq', { returnObjects: true });
  const faqs = faqSection?.faqs || [];

  return (
    <section className="w-full py-8" id="faqs">
      <div className="space-y-3 mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900">
          {faqSection?.title || 'Frequently Asked Questions'}
        </h2>
        <div className="w-10 h-[2px] bg-amber-600/80" />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {faqs.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white border border-slate-100 rounded-lg p-5 transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-50/10"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10284e]/5 to-transparent group-hover:via-[#10284e]/20 transition-all duration-500" />

            <FAQ faq={item} isOpen={false} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;

import React from 'react';
import { BsWhatsapp, BsInstagram, BsLinkedin, BsTiktok } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../../components/OptimizedImage';

const FooterHome = () => {
  const { t } = useTranslation('main');
  const footer = t('footer', { returnObjects: true });
  const socialIcons = {
    linkedin: BsLinkedin,
    instagram: BsInstagram,
    tiktok: BsTiktok,
    whatsapp: BsWhatsapp,
  };

  const SectionTitle = ({ title }) => (
    <h4 className="font-bold text-[14px] uppercase tracking-[0.25em] mb-6 text-white relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-amber-500"></span>
    </h4>
  );

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-[#10284e] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-8">
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
            <OptimizedImage
              src="/assets/home/logo.png"
              alt={footer.logoAlt}
              className="w-32"
            />

            <p className="text-[14px] leading-normal max-w-[240px] opacity-90 text-center md:text-left">
              {footer.description}
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-12">
            <div>
              <SectionTitle title={footer.quickLinksTitle} />
              <ul className="space-y-4 text-[16px]">
                {footer.quickLinks.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.link}
                      className="hover:text-amber-500 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle title={footer.contactsTitle} />
              <ul className="space-y-4 text-[16px]">
                {footer.contacts.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.link}
                      className="hover:text-amber-500 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <iframe
              title="raymond-luk"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.0923667192606!2d-79.34076942381263!4d43.85391417109322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5fbcc8d262d%3A0xafb130d5c8fcdacb!2sRaymond%20Luk%20Law%20Professional%20Corporation!5e0!3m2!1sen!2sca!4v1734198035841!5m2!1sen!2sca"
              className="w-full h-56 transition-all"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 text-[11px] uppercase tracking-normal italic font-light">
          <div className="flex gap-10 justify-center mt-4 opacity-90">
            {footer.socialLinks.map((s, i) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-500 transition-all transform hover:scale-110"
                >
                  {Icon && <Icon className="text-2xl" />}
                </a>
              );
            })}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p>{footer.corporation}</p>

            <div className="group relative">
              <button className="hover:text-amber-500 underline underline-offset-4 decoration-amber-500/50">
                {footer.disclaimerBtn}
              </button>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[320px] hidden group-hover:block bg-white text-slate-900 p-4 shadow-2xl transition-all duration-300 pointer-events-none text-[12px] leading-relaxed normal-case tracking-normal not-italic z-50 text-left border border-slate-200">
                {footer.disclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;

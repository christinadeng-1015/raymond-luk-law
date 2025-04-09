import { Footer, Tooltip } from 'flowbite-react';
import { BsWhatsapp, BsInstagram, BsLinkedin, BsTiktok } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const FooterHome = () => {
  const { t } = useTranslation('main');
  const footer = t('footer', { returnObjects: true });
  const socialIcons = {
    linkedin: BsLinkedin,
    instagram: BsInstagram,
    tiktok: BsTiktok,
    whatsapp: BsWhatsapp,
  };

  return (
    <Footer container className="pt-12 bg-[#10284e] text-white rounded-none">
      <div className="w-full max-w-screen-2xl mx-auto md:px-10">
        <div className="flex justify-between items-center gap-2 md:gap-8">
          <img
            src="assets/home/logo.png"
            alt={footer.logoAlt || 'Company Logo'}
            className="w-20 md:w-32"
          />
          <a
            href="https://legaldirectorate.ca/family-law-attorneys/markham-on/"
            target="_blank"
            className="border-0"
            rel="noreferrer"
          >
            <Tooltip content={footer.awardTooltip} placement="bottom">
              <img
                src="https://legaldirectorate.ca/awards/2024/2/31/3e407a83b4ab1ea59f324a758d86d312/BestOf-Markham-i250-2024.svg"
                className="w-24 md:w-40"
                alt={footer.awardAlt || 'Award Badge'}
              />
            </Tooltip>
          </a>
          <img
            src="assets/home/law.png"
            alt={footer.lawLogoAlt || 'Law Firm Logo'}
            className="w-24 md:w-40"
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row pt-10 md:py-12 justify-around">
          <div className="w-full md:w-2/5 flex md:flex-row py-4 md:py-0 text-center md:text-left items-center md:items-start">
            <div className="w-2/5 md:w-1/3">
              <Footer.Title
                title={footer.quickLinksTitle}
                className="underline text-lg text-white mb-4 font-semibold"
              />
              <Footer.LinkGroup col>
                {footer.quickLinks.map((item, index) => (
                  <a
                    href={item.link}
                    key={index}
                    className="text-white text-base hover:underline block"
                  >
                    {item.title}
                  </a>
                ))}
              </Footer.LinkGroup>
            </div>
            <div className="w-3/5 md:w-1/3">
              <Footer.Title
                title={footer.contactsTitle}
                className="underline text-lg text-white mb-4 font-semibold"
              />
              <Footer.LinkGroup col>
                {footer.contacts.map((item, index) => (
                  <a
                    href={item.link}
                    key={index}
                    className="text-white text-base hover:underline block"
                  >
                    {item.title}
                  </a>
                ))}
              </Footer.LinkGroup>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-start opacity-80 py-6 md:py-0">
            <iframe
              title="raymond-luk"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.0923667192606!2d-79.34076942381263!3d43.85391417109322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5fbcc8d262d%3A0xafb130d5c8fcdacb!2sRaymond%20Luk%20Law%20Professional%20Corporation!5e0!3m2!1sen!2sca!4v1734198035841!5m2!1sen!2sca"
              className="w-full h-48 md:h-64 rounded-md shadow-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="w-full md:w-1/6 flex flex-col items-center md:py-0">
            <Footer.Title
              title={footer.followUs}
              className="text-base text-white font-semibold"
            />
            <div className="flex flex-row md:flex-col items-center space-x-8 md:space-x-0 md:space-y-6">
              {footer.socialLinks.map((social, index) => {
                const IconComponent = socialIcons[social.icon];
                return (
                  <a
                    href={social.link}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-3xl hover:text-gray-500 hover:scale-110 transition-transform"
                  >
                    {IconComponent && <IconComponent />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="my-4 h-px bg-gray-500 opacity-50" />
        <div className="text-center text-sm font-light">
          <p>{footer.corporation}</p>
          <div className="relative group cursor-pointer">
            <button className="underline hover:no-underline">
              {footer.disclaimerBtn}
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-72 text-xs text-white bg-gray-700 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {footer.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterHome;

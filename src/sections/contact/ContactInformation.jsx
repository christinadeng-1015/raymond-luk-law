import React from 'react';
import {
  BsInstagram,
  BsLinkedin,
  BsTiktok,
  BsWhatsapp,
  BsTelephone,
  BsEnvelope,
} from 'react-icons/bs';
import { AiOutlinePrinter } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const iconMapping = {
  BsLinkedin,
  BsInstagram,
  BsTiktok,
  BsWhatsapp,
};

const ContactInformation = () => {
  const { t } = useTranslation('contact');
  const contact = t('contact', { returnObjects: true });

  const contactIcons = [
    { icon: BsTelephone, label: contact.contacts[0] },
    { icon: BsTelephone, label: contact.contacts[1] },
    { icon: BsEnvelope, label: contact.contacts[2] },
    { icon: AiOutlinePrinter, label: contact.contacts[3] },
  ];

  return (
    <div
      className="text-center w-full max-w-md px-6 py-8"
      data-aos="fade-right"
    >
      <h2 className="text-2xl font-bold text-[#10284e] mb-6">
        {contact.title}
      </h2>
      <p className="text-sm text-gray-600 mb-6">{contact.description}</p>
      <div className="mb-6">
        <iframe
          title="raymond-luk"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.0923667192606!2d-79.34076942381263!3d43.85391417109322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5fbcc8d262d%3A0xafb130d5c8fcdacb!2sRaymond%20Luk%20Law%20Professional%20Corporation!5e0!3m2!1sen!2sca!4v1734198035841!5m2!1sen!2sca"
          className="w-full h-60 md:h-80 rounded-md"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="mb-6 text-center md:w-2/3 mx-auto">
        {contactIcons.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <item.icon className="text-lg" />
            <p className="text-sm text-gray-700">{item.label}</p>
          </div>
        ))}
      </div>

      <p className="w-3/4 mx-auto text-xs italic text-gray-700 mb-6">
        {contact.note}
      </p>

      <div className="flex justify-center space-x-3">
        {contact.socialLinks.map((social, index) => {
          const Icon = iconMapping[social.icon];
          return (
            <a
              key={index}
              href={social.link}
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md border-[#10284e] bg-[#10284e] text-white hover:opacity-70 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="text-2xl" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInformation;

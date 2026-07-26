import React from 'react';
import {
  BsInstagram,
  BsLinkedin,
  BsTiktok,
  BsWhatsapp,
  BsTelephone,
  BsWechat,
  BsEnvelope,
} from 'react-icons/bs';
import { AiOutlinePrinter } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const iconMapping = { BsLinkedin, BsInstagram, BsTiktok, BsWhatsapp };

const ContactInformation = () => {
  const { t } = useTranslation('contact');
  const contact = t('contact', { returnObjects: true });

  const contactIcons = [
    { icon: BsTelephone, label: contact.contacts[0] },
    { icon: BsTelephone, label: contact.contacts[1] },
    { icon: BsEnvelope, label: contact.contacts[2] },
    { icon: AiOutlinePrinter, label: contact.contacts[3] },
    { icon: BsWechat, label: contact.contacts[4] },
  ];

  return (
    <div className="w-full" data-aos="fade-right">
      <div className="mb-6">
        <h3 className="pb-2 text-2xl font-serif font-bold text-[#10284e]">
          {contact.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {contact.description}
        </p>
      </div>

      {/* Map Embed */}
      <div className="mb-6 overflow-hidden rounded-lg shadow-sm">
        <iframe
          title="raymond-luk"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.0923667192606!2d-79.34076942381263!3d43.85391417109322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5fbcc8d262d%3A0xafb130d5c8fcdacb!2sRaymond%20Luk%20Law%20Professional%20Corporation!5e0!3m2!1sen!2sca!4v1734198035841!5m2!1sen!2sca"
          className="w-full h-56 md:h-64 border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Contact Details List */}
      <div className="space-y-3 mb-6 bg-white p-4 rounded-lg shadow-sm">
        {contactIcons.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 text-slate-700"
          >
            <div className="w-5 flex justify-center">
              <item.icon className="text-amber-500 text-lg" />
            </div>
            <span className="text-sm font-medium leading-relaxed">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-xs italic text-slate-500 mb-6 leading-relaxed border-l-2 border-amber-500 pl-4">
        {contact.note}
      </p>

      {/* Social Links */}
      <div className="flex justify-center md:justify-start space-x-3">
        {contact.socialLinks?.map((social, index) => {
          const Icon = iconMapping[social.icon];
          if (!Icon) return null;
          return (
            <a
              key={index}
              href={social.link}
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-500 text-slate-600 hover:text-white transition-all duration-300 shadow-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="text-lg" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInformation;

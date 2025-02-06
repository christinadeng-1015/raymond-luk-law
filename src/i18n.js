import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import mainEN from './locales/en/en.json';
import navbarEN from './locales/en/navbar.json';
import servicesEN from './locales/en/services.json';
import teamEN from './locales/en/team.json';
import faqEN from './locales/en/faqs.json';
import contactEN from './locales/en/contact.json';
import resourcesEN from './locales/en/resources.json';

import mainZH from './locales/zh/zh.json';
import navbarZH from './locales/zh/navbar.json';
import servicesZH from './locales/zh/services.json';
import teamZH from './locales/zh/team.json';
import faqZH from './locales/zh/faqs.json';
import contactZH from './locales/zh/contact.json';
import resourcesZH from './locales/zh/resources.json';

const savedLanguage = localStorage.getItem('i18nextLng') || 'en';

const resources = {
  en: {
    main: mainEN,
    navbar: navbarEN,
    services: servicesEN,
    team: teamEN,
    faqs: faqEN,
    contact: contactEN,
    resources: resourcesEN,
  },
  zh: {
    main: mainZH,
    navbar: navbarZH,
    services: servicesZH,
    team: teamZH,
    faqs: faqZH,
    contact: contactZH,
    resources: resourcesZH,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  ns: ['services'],
  defaultNS: 'services',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'navigator'],
  },
});

export default i18n;

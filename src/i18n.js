import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import mainEN from "./locales/en/en.json";
import navbarEN from "./locales/en/navbar.json";
import servicesEN from "./locales/en/services.json";
import teamEN from "./locales/en/team.json";
import faqEN from "./locales/en/faqs.json";
import contactEN from "./locales/en/contact.json";

import mainZH from "./locales/zh/zh.json";
import navbarZH from "./locales/zh/navbar.json";
import servicesZH from "./locales/zh/services.json";
import teamZH from "./locales/zh/team.json";
import faqZH from "./locales/zh/faqs.json";
import contactZH from "./locales/zh/contact.json";

const resources = {
  en: {
    main: mainEN,
    navbar: navbarEN,
    services: servicesEN,
    team: teamEN,
    faqs: faqEN,
    contact: contactEN
  },
  zh: {
    main: mainZH,
    navbar: navbarZH,
    services: servicesZH,
    team: teamZH,
    faqs: faqZH,
    contact: contactZH
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  ns: ["services"], // Namespaces used in the app
  defaultNS: "services", // Default namespace if not specified
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

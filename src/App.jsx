import React from "react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "flowbite/dist/flowbite.css";
import Navbar from "./sections/navigation/Navbar";
import FooterHome from "./sections/navigation/Footer";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";
import ResourcesPage from "./pages/Resources";
import TeamPage from "./pages/Team";
import LawPage from "./pages/Law";
import ContactPage from "./pages/Contact";
import LanguageRedirect from './components/LanguageRedirect';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/en" element={<LanguageRedirect lang="en" />} />
        <Route path="/zh" element={<LanguageRedirect lang="zh" />} />

        <Route path="" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/real-estate-law" element={<LawPage />} />
        <Route path="/family-law" element={<LawPage />} />
        <Route path="/personal-injury-law" element={<LawPage />} />
        <Route path="/wills-and-estates" element={<LawPage />} />
        <Route path="/corporate-law" element={<LawPage />} />
        <Route path="/immigration-law" element={<LawPage />} />
        <Route path="/other-services" element={<LawPage />} />
        <Route path="/landlord-tenant-board" element={<LawPage />} />
        <Route path="/small-claims-court" element={<LawPage />} />
      </Routes>
      <FooterHome />
    </Router>
  );
};

export default App;

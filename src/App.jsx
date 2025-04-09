import React from "react";
import { useEffect } from "react";
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

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
      <FooterHome />
    </Router>
  );
};

export default App;

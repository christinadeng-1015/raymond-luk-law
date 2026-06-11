import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import Navbar from './sections/navigation/Navbar';
import FooterHome from './sections/navigation/Footer';
import LanguageRedirect from './components/LanguageRedirect';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const ServicesPage = React.lazy(() => import('./pages/Services'));
const TeamPage = React.lazy(() => import('./pages/Team'));
const LawPage = React.lazy(() => import('./pages/Law'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const CareerPage = React.lazy(() => import('./pages/Career'));
const BlogPage = React.lazy(() => import('./pages/Blog'));
const BlogCategoryPage = React.lazy(() => import('./pages/BlogCategory'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPost'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function BlogRouter() {
  const { category } = useParams();
  const categorySlugs = ['family-law', 'real-estate', 'wills-estates'];

  return categorySlugs.includes(category) ? (
    <BlogCategoryPage />
  ) : (
    <BlogPostPage />
  );
}

function BlogRedirect() {
  const { category } = useParams();

  return category ? (
    <Navigate to={`/resources/${category}`} replace />
  ) : (
    <Navigate to="/resources" replace />
  );
}

const App = () => {
  useEffect(() => {
    // Load AOS dynamically for animations
    import('aos').then((AOS) => {
      AOS.init({ duration: 1000 });
    });
    // Also import the CSS
    import('aos/dist/aos.css');
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
      <header>
        <Navbar />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/en" element={<LanguageRedirect lang="en" />} />
          <Route path="/zh" element={<LanguageRedirect lang="zh" />} />

          <Route path="" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/resources/:category" element={<BlogRouter />} />
          <Route path="/resources" element={<BlogPage />} />
          <Route path="/blog/:category" element={<BlogRedirect />} />
          <Route path="/blog" element={<BlogRedirect />} />
          <Route path="/real-estate-law" element={<LawPage />} />
          <Route path="/family-law" element={<LawPage />} />
          <Route path="/personal-injury-law" element={<LawPage />} />
          <Route path="/wills-and-estates" element={<LawPage />} />
          <Route path="/corporate-law" element={<LawPage />} />
          <Route path="/immigration-law" element={<LawPage />} />
          <Route path="/other-services" element={<LawPage />} />
          <Route path="/landlord-tenant-board" element={<LawPage />} />
          <Route path="/small-claims-court" element={<LawPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <footer>
        <FooterHome />
      </footer>
    </Router>
  );
};

export default App;

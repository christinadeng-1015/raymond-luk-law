import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import Navbar from './sections/navigation/Navbar';
import FooterHome from './sections/navigation/Footer';
import { localizedPath } from './utils/localizedPath';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const ServicesPage = React.lazy(() => import('./pages/Services'));
const TeamPage = React.lazy(() => import('./pages/Team'));
const LawPage = React.lazy(() => import('./pages/Law'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const CareerPage = React.lazy(() => import('./pages/Career'));
const BlogPage = React.lazy(() => import('./pages/Blog'));
const BlogCategoryPage = React.lazy(
  () => import('./sections/blog/BlogCategory')
);
const BlogPostPage = React.lazy(() => import('./sections/blog/BlogPost'));
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
  const { category, lang } = useParams();

  return category ? (
    <Navigate
      to={
        lang
          ? localizedPath(`/resources/${category}`, lang)
          : `/resources/${category}`
      }
      replace
    />
  ) : (
    <Navigate
      to={lang ? localizedPath('/resources', lang) : '/resources'}
      replace
    />
  );
}

function LanguageRoute() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const { pathname, search, hash } = useLocation();
  const language = lang || 'en';
  const isSupportedLanguage = ['en', 'zh', 'zh-HK'].includes(language);

  useEffect(() => {
    if (isSupportedLanguage && i18n.language !== language) {
      i18n.changeLanguage(language);
      localStorage.setItem('i18nextLng', language);
    }
  }, [language, isSupportedLanguage, i18n]);

  if (!isSupportedLanguage) return <NotFound />;
  if (lang === 'en') {
    const englishPath = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    return <Navigate to={`${englishPath}${search}${hash}`} replace />;
  }
  if (i18n.language !== language) return <div>Loading...</div>;

  return <Outlet />;
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

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/:lang?" element={<LanguageRoute />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="careers" element={<CareerPage />} />
            <Route path="resources/:category" element={<BlogRouter />} />
            <Route path="resources" element={<BlogPage />} />
            <Route path="blog/:category" element={<BlogRedirect />} />
            <Route path="blog" element={<BlogRedirect />} />
            <Route path="real-estate-law" element={<LawPage />} />
            <Route path="family-law" element={<LawPage />} />
            <Route path="personal-injury-law" element={<LawPage />} />
            <Route path="wills-and-estates" element={<LawPage />} />
            <Route path="corporate-law" element={<LawPage />} />
            <Route path="immigration-law" element={<LawPage />} />
            <Route path="other-services" element={<LawPage />} />
            <Route path="landlord-tenant-board" element={<LawPage />} />
            <Route path="small-claims-court" element={<LawPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <footer>
        <FooterHome />
      </footer>
    </Router>
  );
};

export default App;

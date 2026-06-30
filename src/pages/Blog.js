import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogPostCard from '../components/BlogPostCard';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
import { Home, Users, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const mainRef = useRef();
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');
  const blog = t('blog', { returnObjects: true });

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchBlogPosts(i18n.language)
      .then((items) => {
        if (!active) return;
        setPosts(items);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Failed to load blog posts.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [i18n.language]);

  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : 'https://www.luklaw.ca/resources';

  const categories = [
    {
      slug: 'family-law',
      title: t('blog.categories.familyLaw.title'),
      description: t('blog.categories.familyLaw.description'),
      icon: Users,
    },
    {
      slug: 'real-estate',
      title: t('blog.categories.realEstate.title'),
      description: t('blog.categories.realEstate.description'),
      icon: Home,
    },
    {
      slug: 'wills-estates',
      title: t('blog.categories.willsEstates.title'),
      description: t('blog.categories.willsEstates.description'),
      icon: BookOpen, // Swapped for variety against real-estate
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.toLowerCase().trim();
    return (
      search === '' ||
      post.title?.toLowerCase().includes(search) ||
      post.excerpt?.toLowerCase().includes(search) ||
      post.category?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <Helmet>
        <title>
          {blog.title} | Luk & Associates - Legal Insights from Markham, ON
        </title>
        <meta name="description" content={blog.subtitle} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main ref={mainRef} className="bg-slate-50 min-h-screen">
        {/* Hero Banner Section */}
        <div className="relative w-full h-[32rem] md:h-[28rem] overflow-hidden">
          <img
            src="/assets/banner/blog.png"
            alt="Blog banner"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-900/40" />

          <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-16">
            <div className="w-full max-w-2xl">
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm block mb-3">
                {t('blog.resourcesTag', 'Legal Resources')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {blog.title}
              </h1>
              <p className="mt-4 text-slate-300 text-lg max-w-xl hidden md:block">
                {blog.subtitle}
              </p>

              {/* Search Bar Container */}
              <div className="mt-8 max-w-xl">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder={t('blog.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/90 backdrop-blur-md px-6 py-4.5 pr-12 text-slate-900 shadow-2xl transition-all duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0C2D57]"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0C2D57] transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-24">
          {/* Browse by Practice Area Section */}
          {!loading && !error && posts.length > 0 && (
            <div className="mb-24">
              <div className="flex flex-col items-start mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {t('blog.browsePracticeArea')}
                </h2>
                <div className="h-1 w-12 bg-amber-500 mt-3 rounded-full" />
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.slug}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                    >
                      <div>
                        <div className="inline-flex p-3 rounded-xl bg-slate-50 text-[#0C2D57] group-hover:bg-[#0C2D57] group-hover:text-white transition-all duration-300 mb-6">
                          <Icon size={28} strokeWidth={1.75} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-8">
                          {category.description}
                        </p>
                      </div>

                      <Link
                        to={`/resources/${category.slug}`}
                        className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-slate-50 text-[#0C2D57] font-semibold text-sm transition-all duration-200 hover:bg-[#0C2D57] hover:text-white border border-slate-100"
                      >
                        {t('blog.viewResources')}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Articles Heading Area */}
          <div className="border-t border-slate-200 pt-16 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t('blog.latestArticlesTitle')}
              </h2>
              <p className="text-slate-500 text-md mt-2 max-w-xl">
                {t('blog.latestArticlesSubtitle')}
              </p>
            </div>
          </div>

          {/* Dynamic States Layout */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-slate-200 bg-white shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2D57] mb-4" />
              <p className="text-slate-500 font-medium">
                {t('blog.loadingPosts')}
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center max-w-2xl mx-auto shadow-sm">
              <p className="font-semibold text-rose-900">
                {t('blog.unableToLoadPosts')}
              </p>
              <p className="mt-1 text-sm text-rose-600">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center max-w-md mx-auto">
              <p className="text-slate-600 font-medium text-lg">
                {t('blog.noPostsFound')}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Try adjusting your keywords or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2">
                {filteredPosts.slice(0, displayCount).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {filteredPosts.length > displayCount && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={() =>
                      setDisplayCount((prev) =>
                        Math.min(prev + 4, filteredPosts.length)
                      )
                    }
                    className="px-8 py-3.5 rounded-xl bg-[#0C2D57] text-white font-semibold text-sm shadow-md hover:bg-slate-800 transition-all duration-200 active:scale-95"
                  >
                    {t('blog.viewMoreArticles')}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

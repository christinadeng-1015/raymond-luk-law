import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogPostCard from '../sections/blog/BlogPostCard';
import FeaturedArticlesDeck from '../sections/blog/FeaturedArticlesDeck';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
import { Home, Users, BookOpen, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const mainRef = useRef();
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');
  const blog = t('blog', { returnObjects: true });

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchBlogPosts(i18n.language)
      .then((items) => {
        if (!active) return;
        setPosts(items || []);
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

  const categories = [
    {
      slug: 'family-law',
      title: t('blog.categories.familyLaw.title', 'Family Law'),
      description: t(
        'blog.categories.familyLaw.description',
        'Guidance on separation, divorce, custody, and estate planning.'
      ),
      icon: Users,
    },
    {
      slug: 'real-estate',
      title: t('blog.categories.realEstate.title', 'Real Estate Law'),
      description: t(
        'blog.categories.realEstate.description',
        'Insights on residential and commercial property transactions in Ontario.'
      ),
      icon: Home,
    },
    {
      slug: 'wills-estates',
      title: t('blog.categories.willsEstates.title', 'Wills & Estates'),
      description: t(
        'blog.categories.willsEstates.description',
        'Protecting your legacy, drafting wills, and power of attorney.'
      ),
      icon: BookOpen,
    },
  ];

  // Identify featured posts (or fall back to top 3)
  const featuredPosts = posts.filter(
    (p) =>
      p.isFeatureArticle || p.isFeaturedArticle || p.isFeatured || p.featured
  );
  const displayFeatured =
    featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);

  const ogImage = displayFeatured[0]?.image || '/assets/banner/blog.png';
  const domain = 'https://www.luklaw.ca';
  const pageTitle = `${blog.title || 'Legal Insights'} | Luk & Associates`;
  const pageDescription =
    blog.subtitle ||
    'Explore legal insights, guides, and resources from Luk & Associates in Markham, ON.';

  const resourcesSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Luk & Associates',
    url: `${domain}/resources`,
    image: `${domain}${ogImage}`,
    description: pageDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Markham',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    areaServed: 'Markham, ON',
  };

  // Search filtering logic
  const activeSearch = searchTerm.toLowerCase().trim();
  const isSearching = activeSearch !== '';

  const filteredPosts = posts.filter((post) => {
    if (!isSearching) return true;

    return (
      post.title?.toLowerCase().includes(activeSearch) ||
      post.excerpt?.toLowerCase().includes(activeSearch) ||
      post.category?.toLowerCase().includes(activeSearch)
    );
  });

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="law firm Markham, Markham law firm, legal services Markham, family lawyer Markham, real estate lawyer Markham, wills and estates Markham"
        path="/resources"
        image={ogImage}
        schema={resourcesSchema}
      />

      <main ref={mainRef} className="bg-slate-50 min-h-screen">
        {/* Hero Banner Section */}
        <div className="relative w-full h-[32rem] md:h-[28rem] overflow-hidden">
          <img
            src="/assets/banner/blog.png"
            alt="Blog banner"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-slate-900/40" />

          <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-16">
            <div className="w-full max-w-2xl">
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs block mb-3">
                {t('blog.resourcesTag', 'Legal Resources')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {blog.title}
              </h1>
              <p className="mt-4 text-slate-300 text-base md:text-lg max-w-xl hidden md:block leading-relaxed">
                {blog.subtitle}
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-xl">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder={t(
                      'blog.searchPlaceholder',
                      'Search articles, topics, or keywords...'
                    )}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/95 backdrop-blur-md px-6 py-4 pr-12 text-slate-900 shadow-2xl transition-all duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0C2D57]"
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
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-24 overflow-hidden">
          {/* Extracted Featured Deck Component */}
          {!loading && !error && displayFeatured.length > 0 && !isSearching && (
            <FeaturedArticlesDeck displayFeatured={displayFeatured} />
          )}

          {/* Compact Practice Areas Section */}
          {!loading && !error && posts.length > 0 && !isSearching && (
            <div className="mb-16">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {t('blog.browsePracticeArea', 'Browse by Practice Area')}
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.slug}
                      to={`/resources/${category.slug}`}
                      className="group flex items-start justify-between rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#0C2D57]/30 hover:-translate-y-0.5"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="p-2.5 rounded-lg bg-slate-100 text-[#0C2D57] group-hover:bg-[#0C2D57] group-hover:text-white transition-colors duration-200 shrink-0">
                          <Icon size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0C2D57] transition-colors leading-tight mb-1">
                            {category.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-slate-400 group-hover:text-[#0C2D57] group-hover:translate-x-1 transition-all shrink-0 mt-1 ml-2"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Articles Heading Area */}
          <div className="border-t border-slate-200 pt-12 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {isSearching
                  ? t('blog.searchResultsTitle', 'Search Results')
                  : t('blog.latestArticlesTitle', 'Latest Articles')}
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-xl">
                {isSearching
                  ? `${filteredPosts.length} ${t('blog.resultsFound', 'articles found matching your query.')}`
                  : t(
                      'blog.latestArticlesSubtitle',
                      'Stay informed with practical legal advice and insights from our team.'
                    )}
              </p>
            </div>
          </div>

          {/* Dynamic States Layout */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-slate-200 bg-white shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2D57] mb-4" />
              <p className="text-slate-500 font-medium text-sm">
                {t('blog.loadingPosts', 'Loading legal insights...')}
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center max-w-2xl mx-auto shadow-sm">
              <p className="font-semibold text-rose-900">
                {t('blog.unableToLoadPosts', 'Unable to load articles')}
              </p>
              <p className="mt-1 text-sm text-rose-600">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center max-w-md mx-auto">
              <p className="text-slate-600 font-medium text-lg">
                {t('blog.noPostsFound', 'No articles found')}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Try adjusting your search terms or keywords.
              </p>
            </div>
          ) : (
            <>
              {/* 3 Columns Grid for Articles */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.slice(0, displayCount).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {filteredPosts.length > displayCount && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() =>
                      setDisplayCount((prev) =>
                        Math.min(prev + 6, filteredPosts.length)
                      )
                    }
                    className="px-8 py-3 rounded-xl bg-[#0C2D57] text-white font-semibold text-sm shadow-md hover:bg-slate-800 transition-all duration-200 active:scale-95"
                  >
                    {t('blog.viewMoreArticles', 'View More Articles')}
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

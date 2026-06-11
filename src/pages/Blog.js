import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogPostCard from '../components/BlogPostCard';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
import { Home, Users } from 'lucide-react';

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
      icon: Home,
    },
  ];
  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      search === '' ||
      post.title?.toLowerCase().includes(search) ||
      post.excerpt?.toLowerCase().includes(search) ||
      post.category?.toLowerCase().includes(search);

    return matchesSearch;
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

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-64 md:h-1/2">
          <img
            src="/assets/banner/blog.png"
            alt="Blog banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 px-6 md:px-24 lg:px-48">
            <div className="w-full max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {blog.title}
              </h1>

              <div className="mt-12">
                <input
                  type="text"
                  placeholder={t('blog.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-2/3 rounded-xl border border-white/20 bg-white px-5 py-4 text-slate-900 shadow-lg focus:border-[#0C2D57] focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
          {/* Browse by Practice Area Section */}
          {!loading && !error && posts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                {t('blog.browsePracticeArea')}
              </h2>
              <div className="grid gap-6 lg:grid-cols-3 mb-8">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.slug}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white hover:border-[#0C2D57] p-6 transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <div className="flex items-center gap-6 w-full">
                        <div className="flex-shrink-0 p-3 rounded-lg bg-slate-100 transition-colors ">
                          <Icon
                            size={32}
                            className="text-[#0C2D57] transition-colors"
                          />
                        </div>

                        <div className="flex-grow">
                          <div className="text-lg font-semibold text-slate-900">
                            {category.title}
                          </div>
                          <div className="text-sm text-slate-600 mt-1 mb-4">
                            {category.description}
                          </div>
                          <Link
                            to={`/resources/${category.slug}`}
                            className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0C2D57] text-white font-semibold hover:bg-slate-700 transition-colors"
                          >
                            {t('blog.viewResources')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Articles Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {t('blog.latestArticlesTitle')}
            </h2>
            <p className="text-slate-600 text-lg">
              {t('blog.latestArticlesSubtitle')}
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              {t('blog.loadingPosts')}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-900 shadow-sm">
              <p className="font-semibold">{t('blog.unableToLoadPosts')}</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              {t('blog.noPostsFound')}
            </div>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-2">
                {filteredPosts.slice(0, displayCount).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
              {filteredPosts.length > displayCount && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() =>
                      setDisplayCount((prev) =>
                        Math.min(prev + 4, filteredPosts.length)
                      )
                    }
                    className="px-8 py-3 rounded-xl bg-[#0C2D57] text-white font-semibold hover:bg-slate-700 transition-colors"
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

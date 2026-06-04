import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogPostCard from '../components/BlogPostCard';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
import { Home, Users, ChevronLeft } from 'lucide-react';

export default function BlogCategoryPage() {
  const mainRef = useRef();
  const { category } = useParams();
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');
  const blog = t('blog', { returnObjects: true });

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryMap = {
    'family-law': {
      slug: 'family-law',
      title: t('blog.categories.familyLaw.title'),
      description: t('blog.categories.familyLaw.description'),
      icon: Users,
    },
    'real-estate': {
      slug: 'real-estate',
      title: t('blog.categories.realEstate.title'),
      description: t('blog.categories.realEstate.description'),
      icon: Home,
    },
    'wills-estates': {
      slug: 'wills-estates',
      title: t('blog.categories.willsEstates.title'),
      description: t('blog.categories.willsEstates.description'),
      icon: Home,
    },
  };

  const currentCategory = categoryMap[category];

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
      : `https://www.luklaw.ca/blog/${category}`;

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = post.category === category;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      search === '' ||
      post.title?.toLowerCase().includes(search) ||
      post.excerpt?.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  if (!currentCategory) {
    return (
      <>
        <Helmet>
          <title>Category Not Found | Luk & Associates</title>
        </Helmet>
        <main style={{ overflow: 'hidden' }}>
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700">
              <p className="font-semibold">Category not found</p>
              <Link
                to="/blog"
                className="mt-4 inline-block text-[#0C2D57] hover:underline"
              >
                Back to Blog
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {currentCategory.title} | Luk & Associates - Legal Insights from
          Markham, ON
        </title>
        <meta
          name="description"
          content={`Explore ${currentCategory.title} articles and legal insights from Luk & Associates.`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        <div className="relative w-full h-64 md:h-1/2">
          <img
            src="/assets/banner/blog.png"
            alt={`${currentCategory.title} banner`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 px-6 md:px-24 lg:px-48">
            <div className="w-full max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Link
                  to="/blog"
                  className="flex items-center gap-2 text-white hover:text-slate-200 transition-colors"
                >
                  <ChevronLeft size={20} />
                  Back to Blog
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {currentCategory.title}
              </h1>
              <p className="text-xl text-white mt-4">
                {currentCategory.description}
              </p>

              <div className="mt-12">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-2/3 rounded-xl border border-white/20 bg-white px-5 py-4 text-slate-900 shadow-lg focus:border-[#0C2D57] focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              Loading blog posts...
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-900 shadow-sm">
              <p className="font-semibold">Unable to load blog posts</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              No posts found in {currentCategory.title}.
            </div>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-2">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </section>

        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

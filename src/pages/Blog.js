import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogPostCard from '../components/BlogPostCard';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function BlogPage() {
  const mainRef = useRef();
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');
  const blog = t('blog', { returnObjects: true });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      : 'https://www.luklaw.ca/blog';

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
          <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {blog.title}
              </h1>
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
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              No blog posts were found. Please verify your Contentful blog post
              content type has published entries with title, date, and content
              fields.
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchBlogPosts, fetchBlogPostById } from '../contentful/blogClient';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');
  const blog = t('blog', { returnObjects: true });
  const mainRef = useRef();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const loadPost = async () => {
      try {
        const posts = await fetchBlogPosts(i18n.language);
        let foundPost = posts.find((p) => p.slug === slug);

        if (!foundPost) {
          const fallbackLocale = i18n.language === 'zh' ? 'en' : 'zh';
          const fallbackPosts = await fetchBlogPosts(fallbackLocale);
          const fallbackPost = fallbackPosts.find((p) => p.slug === slug);

          if (fallbackPost) {
            foundPost = await fetchBlogPostById(fallbackPost.id, i18n.language);
          }
        }

        if (!active) return;

        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        if (!active) return;
        setError(err.message || 'Failed to load blog post');
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    loadPost();

    return () => {
      active = false;
    };
  }, [slug, i18n.language]);

  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : `https://www.luklaw.ca/blog/${slug}`;

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Luk & Associates</title>
        </Helmet>
        <main
          ref={mainRef}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading blog post...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found | Luk & Associates</title>
        </Helmet>
        <main
          ref={mainRef}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center max-w-md mx-auto px-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-slate-600 mb-8">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              ← Back to Blogs
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Luk & Associates</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main ref={mainRef} className="min-h-screen">
        <section>
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
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16 md:px-12 lg:px-20">
          <div className="max-w-none">
            {post.body ? (
              documentToReactComponents(post.body, {
                renderNode: {
                  'embedded-asset-block': (node) => {
                    const { title, file } = node.data.target.fields;
                    const imageUrl = file?.url ? `https:${file.url}` : null;
                    return imageUrl ? (
                      <div className="my-8">
                        <img
                          src={imageUrl}
                          alt={title || 'Embedded image'}
                          className="w-full rounded-lg shadow-sm"
                        />
                        {title && (
                          <p className="text-sm text-slate-500 mt-2 text-center italic">
                            {title}
                          </p>
                        )}
                      </div>
                    ) : null;
                  },
                  hyperlink: (node, children) => (
                    <a
                      href={node.data.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {children}
                    </a>
                  ),
                  'unordered-list': (node, children) => (
                    <ul className="list-disc list-outside my-4 space-y-2 pl-6">
                      {children}
                    </ul>
                  ),
                  'ordered-list': (node, children) => (
                    <ol className="list-decimal list-outside my-4 space-y-2 pl-6">
                      {children}
                    </ol>
                  ),
                  'list-item': (node, children) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  'heading-1': (node, children) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900">
                      {children}
                    </h1>
                  ),
                  'heading-2': (node, children) => (
                    <h2 className="text-2xl font-bold mt-6 mb-3 text-slate-900">
                      {children}
                    </h2>
                  ),
                  'heading-3': (node, children) => (
                    <h3 className="text-xl font-semibold mt-5 mb-2 text-slate-900">
                      {children}
                    </h3>
                  ),
                  'heading-4': (node, children) => (
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-slate-900">
                      {children}
                    </h4>
                  ),
                  'heading-5': (node, children) => (
                    <h5 className="text-base font-semibold mt-3 mb-2 text-slate-900">
                      {children}
                    </h5>
                  ),
                  'heading-6': (node, children) => (
                    <h6 className="text-sm font-semibold mt-3 mb-2 text-slate-900">
                      {children}
                    </h6>
                  ),
                  blockquote: (node, children) => (
                    <blockquote className="border-l-4 border-slate-300 pl-4 my-6 italic text-slate-700 bg-slate-50 py-4 px-6 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-8 border-slate-300" />,
                  paragraph: (node, children) => (
                    <p className="mb-4 leading-relaxed text-slate-700">
                      {children}
                    </p>
                  ),
                },
                renderMark: {
                  bold: (text) => (
                    <strong className="font-semibold">{text}</strong>
                  ),
                  italic: (text) => <em className="italic">{text}</em>,
                  underline: (text) => <u className="underline">{text}</u>,
                  code: (text) => (
                    <code className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">
                      {text}
                    </code>
                  ),
                },
              })
            ) : (
              <p className="text-slate-500 italic">No content available.</p>
            )}
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center text-black rounded-lg transition-colors pt-12"
          >
            ← Back to Blogs
          </Link>
        </section>

        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

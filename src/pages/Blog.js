import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogHero from '../sections/blog/BlogHero';
import BlogFeaturedDeck from '../sections/blog/BlogFeaturedDeck';
import BlogCategories from '../sections/blog/BlogCategories';
import BlogGrid from '../sections/blog/BlogGrid';
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

  const featuredPosts = posts.filter((p) => p.isFeatureArticle === true);
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

  const isSearching = searchTerm !== '';

  const filteredPosts = posts.filter((post) => {
    if (!isSearching) return true;

    const lowerSearch = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(lowerSearch) ||
      post.excerpt?.toLowerCase().includes(lowerSearch) ||
      post.category?.toLowerCase().includes(lowerSearch)
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
        <BlogHero
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          blog={blog}
        />

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-24 overflow-hidden">
          {!loading && !error && displayFeatured.length > 0 && !isSearching && (
            <BlogFeaturedDeck featuredPosts={displayFeatured} />
          )}

          {!loading && !error && posts.length > 0 && !isSearching && (
            <BlogCategories categories={categories} />
          )}

          <BlogGrid
            loading={loading}
            error={error}
            filteredPosts={filteredPosts}
            displayCount={displayCount}
            onLoadMore={() =>
              setDisplayCount((prev) =>
                Math.min(prev + 6, filteredPosts.length)
              )
            }
            isSearching={isSearching}
          />
        </section>

        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

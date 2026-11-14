import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { fetchBlogPosts } from '../../contentful/blogClient';
import { localizedPath } from '../../utils/localizedPath';
import BlogPostCard from './BlogPostCard';
import ContactFloatIcon from '../home/ContactFloatIcon';
import ScrollToTop from '../home/ScrollToTop';
import {
  Home,
  Users,
  ChevronLeft,
  Heart,
  FileText,
  Split,
  Building2,
  ShoppingCart,
  Shield,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Gavel,
  Search,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const CATEGORY_CONFIG = {
  'family-law': { jsonKey: 'familyLaw', icon: Users },
  'real-estate': { jsonKey: 'realEstate', icon: Home },
  'wills-estates': { jsonKey: 'willsEstates', icon: Home },
};

const ICON_MAP = {
  'common-law-cohabitation': Heart,
  'marriage-contracts-prenups': FileText,
  'separation-divorce': Split,
  'property-division-matrimonial-home': Building2,
  'parenting-custody': Users,
  'buying-a-home': ShoppingCart,
  'title-insurance': Shield,
  'closing-day': CheckCircle,
  'selling-a-home': TrendingUp,
  'closing-costs': DollarSign,
  'mortgages-and-financing': Home,
  wills: FileText,
  'dying-without-a-will': AlertTriangle,
  executors: Briefcase,
  'powers-of-attorney': FileText,
  probate: Gavel,
};

const INITIAL_POST_LIMIT = 6;

export default function BlogCategoryPage() {
  const mainRef = useRef();
  const { category } = useParams();
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentConfig = CATEGORY_CONFIG[category];
  const translationKey = currentConfig?.jsonKey;

  const categoryExists =
    translationKey &&
    i18n.hasResourceBundle(i18n.language, 'main') &&
    t(`blog.categories.${translationKey}`) !==
      `blog.categories.${translationKey}`;

  const currentCategory = categoryExists
    ? {
        slug: category,
        title: t(`blog.categories.${translationKey}.title`),
        description: t(`blog.categories.${translationKey}.description`),
        icon: currentConfig.icon,
        subCategoriesObj:
          t(`blog.categories.${translationKey}.subCategories`, {
            returnObjects: true,
          }) || {},
      }
    : null;

  const subCategories = currentCategory
    ? Object.entries(currentCategory.subCategoriesObj).map(([slug, data]) => ({
        slug,
        title: data.title,
        description: data.description,
        icon: ICON_MAP[slug] || FileText,
      }))
    : [];

  useEffect(() => {
    setSelectedSubCategory(null);
    setSearchTerm('');
    setShowAllArticles(false);
  }, [category]);

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
        setError(err.message || t('blog.unableToLoadPosts'));
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [i18n.language, t]);

  const canonicalUrl =
    typeof window !== 'undefined'
      ? `https://www.luklaw.ca${window.location.pathname}`
      : `https://www.luklaw.ca/resources/${category}`;

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = post.category === category;
    const matchesSubCategory =
      !selectedSubCategory || selectedSubCategory === post.subCategory;
    const search = searchTerm.toLowerCase().trim();

    return (
      matchesCategory &&
      matchesSubCategory &&
      (search === '' ||
        post.title?.toLowerCase().includes(search) ||
        post.excerpt?.toLowerCase().includes(search))
    );
  });

  const displayedPosts = showAllArticles
    ? filteredPosts
    : filteredPosts.slice(0, INITIAL_POST_LIMIT);

  const handleSubCategorySelect = (slug) => {
    setSelectedSubCategory((prev) => (prev === slug ? null : slug));
    setShowAllArticles(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowAllArticles(false);
  };

  if (!currentCategory) {
    return (
      <>
        <Helmet>
          <title>Category Not Found | Luk & Associates</title>
        </Helmet>
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Category Not Found
            </h2>
            <p className="text-slate-500 mb-8">
              The legal resources you are looking for may have been moved or
              updated.
            </p>
            <Link
              to={localizedPath('/resources', i18n.language)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium transition-colors hover:bg-slate-100"
            >
              Return to Resources
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentCategory.title} | Luk & Associates</title>
        <meta
          name="description"
          content={`Explore ${currentCategory.title} articles and legal insights.`}
        />
        <meta
          name="keywords"
          content={`${currentCategory.title}, law firm Markham, legal insights Markham`}
        />
        <link rel="canonical" href={canonicalUrl} />

        <meta
          property="og:title"
          content={`${currentCategory.title} | Luk & Associates`}
        />
        <meta
          property="og:description"
          content={`Explore ${currentCategory.title} articles and legal insights.`}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={'/assets/banner/blog.png'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${currentCategory.title} | Luk & Associates`}
        />
        <meta
          name="twitter:description"
          content={`Explore ${currentCategory.title} articles and legal insights.`}
        />
        <meta name="twitter:image" content={'/assets/banner/blog.png'} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: currentCategory.title,
            description: currentCategory.description,
            url: canonicalUrl,
          })}
        </script>
      </Helmet>

      <main ref={mainRef} className="bg-slate-50/50 min-h-screen pb-24">
        <div className="relative w-full h-[18rem] md:h-[26rem] bg-[#092240] flex items-end pb-8 md:pb-16 overflow-hidden">
          <img
            src="/assets/banner/blog.png"
            alt={`${currentCategory.title} banner`}
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051324] via-[#0C2D57]/70 to-transparent" />

          <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
            <Link
              to={localizedPath('/resources', i18n.language)}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-4 md:mb-6 w-fit text-sm font-medium"
            >
              <ChevronLeft size={16} />
              {t('blog.viewResources', { defaultValue: 'All Resources' })}
            </Link>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                {currentCategory.title}
              </h1>
              <p className="text-sm md:text-lg text-blue-100/80 mt-3 md:mt-4 leading-relaxed max-w-2xl font-light">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-24 mt-4 md:-mt-8 relative z-20">
          <div className="md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-slate-200 md:p-10">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-0 md:bg-transparent md:border-none md:shadow-none md:rounded-none flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2D57] mb-4" />
                <p className="text-slate-500 font-medium">
                  {t('blog.loadingPosts', 'Loading articles...')}
                </p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-0 md:bg-transparent md:border-none md:shadow-none md:rounded-none py-12 text-center max-w-lg mx-auto">
                <p className="font-semibold text-rose-800">
                  {t('blog.unableToLoadPosts', 'Unable to load articles')}
                </p>
                <p className="mt-2 text-sm text-slate-500">{error}</p>
              </div>
            ) : (
              <>
                {subCategories.length > 0 && (
                  <div className="mb-8 md:mb-14">
                    <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 md:text-slate-400 mb-4 md:mb-6 ml-1 md:ml-0">
                      {t('blog.browsePracticeArea', {
                        defaultValue: 'Filter by Specific Topic',
                      })}
                    </h2>

                    <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {subCategories.map((subCategory) => {
                        const Icon = subCategory.icon;
                        const active = selectedSubCategory === subCategory.slug;

                        return (
                          <button
                            key={subCategory.slug}
                            onClick={() =>
                              handleSubCategorySelect(subCategory.slug)
                            }
                            className={`group flex items-start gap-3 md:gap-4 p-3.5 md:p-4 rounded-xl border text-left transition-all duration-200 ${
                              active
                                ? 'border-[#0C2D57] bg-white md:bg-[#0C2D57]/5 ring-1 ring-[#0C2D57] shadow-sm md:shadow-none'
                                : 'border-slate-200 md:border-slate-100 bg-white md:bg-transparent hover:border-slate-300 hover:bg-slate-50 shadow-sm md:shadow-none'
                            }`}
                          >
                            <div
                              className={`mt-0.5 p-1.5 md:p-2 rounded-lg transition-colors ${
                                active
                                  ? 'bg-[#0C2D57] text-white'
                                  : 'bg-slate-100 text-slate-500 group-hover:text-[#0C2D57]'
                              }`}
                            >
                              <Icon size={18} strokeWidth={2} />
                            </div>
                            <div>
                              <h3
                                className={`font-semibold text-sm mb-0.5 md:mb-1 transition-colors ${
                                  active ? 'text-[#0C2D57]' : 'text-slate-900'
                                }`}
                              >
                                {subCategory.title}
                              </h3>
                              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                {subCategory.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-8 md:p-0 md:bg-transparent md:border-none md:shadow-none md:rounded-none">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 md:border-t md:border-slate-100 md:pt-10 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {selectedSubCategory
                        ? subCategories.find(
                            (s) => s.slug === selectedSubCategory
                          )?.title
                        : 'All Articles'}
                      <span className="text-slate-400 font-normal ml-2 text-sm">
                        ({filteredPosts.length})
                      </span>
                    </h3>

                    <div className="relative group w-full md:w-72">
                      <Search
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0C2D57] transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-sm text-slate-900 transition-all focus:bg-white focus:outline-none focus:border-[#0C2D57] focus:ring-1 focus:ring-[#0C2D57]"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setShowAllArticles(false);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {filteredPosts.length === 0 ? (
                    <div className="py-8 md:py-16 text-center">
                      <p className="text-slate-600 font-medium mb-2">
                        No articles found.
                      </p>
                      <p className="text-slate-400 text-sm">
                        Try selecting a different topic or clearing your search.
                      </p>
                      {(selectedSubCategory || searchTerm) && (
                        <button
                          onClick={() => {
                            setSelectedSubCategory(null);
                            setSearchTerm('');
                            setShowAllArticles(false);
                          }}
                          className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {displayedPosts.map((post) => (
                          <BlogPostCard
                            key={post.id || post.slug}
                            post={post}
                          />
                        ))}
                      </div>

                      {filteredPosts.length > INITIAL_POST_LIMIT && (
                        <div className="mt-10 md:mt-12 text-center pt-6 md:pt-8 border-t border-slate-100">
                          <button
                            onClick={() => setShowAllArticles((prev) => !prev)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C2D57] text-white font-semibold text-sm shadow-sm hover:bg-slate-800 transition-all duration-200"
                          >
                            <span>
                              {showAllArticles
                                ? 'Show Less'
                                : 'View All Articles'}
                            </span>
                            {showAllArticles ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

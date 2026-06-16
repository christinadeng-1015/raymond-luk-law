import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { fetchBlogPosts } from '../contentful/blogClient';
import BlogPostCard from '../components/BlogPostCard';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';
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
  Grid,
} from 'lucide-react';

// Maps the route URL slug to your precise translation JSON keys and main icons
const CATEGORY_CONFIG = {
  'family-law': { jsonKey: 'familyLaw', icon: Users },
  'real-estate': { jsonKey: 'realEstate', icon: Home },
  'wills-estates': { jsonKey: 'willsEstates', icon: Home },
};

// Map sub-category slugs to their designated visual layout icons
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

export default function BlogCategoryPage() {
  const mainRef = useRef();
  const { category } = useParams(); // expectation: 'family-law', 'real-estate', or 'wills-estates'
  const { i18n } = useTranslation();
  const { t } = useTranslation('main');

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safely translate url-slug down into target JSON configuration block
  const currentConfig = CATEGORY_CONFIG[category];
  const translationKey = currentConfig?.jsonKey;

  // Check if translation assets actually exist inside i18next runtime
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

  // Parse dictionary array structure safely for UI execution grids
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
                to="/resources"
                className="mt-4 inline-block text-[#0C2D57] hover:underline"
              >
                Back to Resources
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
        <title>{currentCategory.title} | Luk & Associates</title>
        <meta
          name="description"
          content={`Explore ${currentCategory.title} articles and legal insights.`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main ref={mainRef} style={{ overflow: 'hidden' }}>
        {/* Banner Section */}
        <div className="relative w-full h-72 md:h-[38rem]">
          <img
            src="/assets/banner/blog.png"
            alt={`${currentCategory.title} banner`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" />
          <div className="relative z-10 h-full flex items-center px-6 md:px-24 lg:px-48">
            <div className="w-full max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <Link
                  to="/resources"
                  className="flex items-center gap-2 text-white hover:text-slate-200 transition-colors"
                >
                  <ChevronLeft size={20} />
                  {t('blog.viewResources', {
                    defaultValue: 'Back to Resources',
                  })}
                </Link>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {currentCategory.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl mt-5">
                {currentCategory.description}
              </p>

              <div className="mt-12 max-w-2xl">
                <div className="rounded-3xl border border-white/10 bg-white/95 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <input
                    type="text"
                    placeholder={t('blog.searchPlaceholder', {
                      defaultValue: 'Search articles...',
                    })}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-[#0C2D57] focus:outline-none focus:ring-2 focus:ring-[#0C2D57]/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories / Grid Filtering Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
              {t('blog.loadingPosts', {
                defaultValue: 'Loading blog posts...',
              })}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-900 shadow-sm">
              <p className="font-semibold">
                {t('blog.unableToLoadPosts', {
                  defaultValue: 'Unable to load blog posts',
                })}
              </p>
              <p className="mt-2">{error}</p>
            </div>
          ) : (
            <>
              {subCategories.length > 0 && (
                <section className="mb-16">
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-[#0C2D57]">
                      {t('blog.browsePracticeArea', {
                        defaultValue: 'Browse by Topic',
                      })}
                    </h2>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {/* --- "All Topics" Premium Card --- */}
                    <button
                      onClick={() => setSelectedSubCategory(null)}
                      className={`group rounded-2xl border p-6 text-left transition-all duration-300 shadow-sm ${
                        selectedSubCategory === null
                          ? 'bg-[#0C2D57] border-[#0C2D57] shadow-xl scale-[1.02] ring-4 ring-[#0C2D57]/10'
                          : 'bg-white border-slate-200 hover:border-[#0C2D57]/30 hover:shadow-lg hover:scale-[1.01]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                            selectedSubCategory === null
                              ? 'bg-white/10 text-white'
                              : 'bg-[#0C2D57]/5 text-[#0C2D57]'
                          }`}
                        >
                          <Grid size={26} />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <h3
                            className={`text-lg font-bold transition-colors duration-300 ${selectedSubCategory === null ? 'text-white' : 'text-[#0C2D57]'}`}
                          >
                            {t('blog.viewMoreArticles', {
                              defaultValue: 'All Topics',
                            })}
                          </h3>
                          <p
                            className={`mt-2 text-sm leading-6 transition-colors duration-300 ${selectedSubCategory === null ? 'text-slate-200' : 'text-slate-600'}`}
                          >
                            {t('blog.latestArticlesSubtitle', {
                              defaultValue:
                                'Explore all insights under this area.',
                            })}
                          </p>
                          <div
                            className={`mt-4 flex items-center text-sm font-semibold transition-colors duration-300 ${selectedSubCategory === null ? 'text-white' : 'text-[#0C2D57]'}`}
                          >
                            {t('blog.viewResources', {
                              defaultValue: 'View All',
                            })}
                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* --- Dynamic Localized Subcategories --- */}
                    {subCategories.map((subCategory) => {
                      const Icon = subCategory.icon;
                      const active = selectedSubCategory === subCategory.slug;

                      return (
                        <button
                          key={subCategory.slug}
                          onClick={() =>
                            setSelectedSubCategory(
                              active ? null : subCategory.slug
                            )
                          }
                          className={`group rounded-2xl border p-6 text-left transition-all duration-300 shadow-sm ${
                            active
                              ? 'bg-[#0C2D57] border-[#0C2D57] shadow-xl scale-[1.02] ring-4 ring-[#0C2D57]/10'
                              : 'bg-white border-slate-200 hover:border-[#0C2D57]/30 hover:shadow-lg hover:scale-[1.01]'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                                active
                                  ? 'bg-white/10 text-white'
                                  : 'bg-[#0C2D57]/5 text-[#0C2D57]'
                              }`}
                            >
                              <Icon size={26} />
                            </div>

                            <div className="flex flex-1 flex-col">
                              <h3
                                className={`text-lg font-bold transition-colors duration-300 ${active ? 'text-white' : 'text-[#0C2D57]'}`}
                              >
                                {subCategory.title}
                              </h3>
                              <p
                                className={`mt-2 text-sm leading-6 transition-colors duration-300 ${active ? 'text-slate-200' : 'text-slate-600'}`}
                              >
                                {subCategory.description}
                              </p>
                              <div
                                className={`mt-4 flex items-center text-sm font-semibold transition-colors duration-300 ${active ? 'text-white' : 'text-[#0C2D57]'}`}
                              >
                                {t('blog.viewMoreArticles', {
                                  defaultValue: 'Learn More',
                                })}
                                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                  →
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Articles Grid rendering */}
              {filteredPosts.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
                  {t('blog.noPostsFound', {
                    defaultValue:
                      'Check back soon for new legal insights and updates.',
                  })}
                </div>
              ) : (
                <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
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

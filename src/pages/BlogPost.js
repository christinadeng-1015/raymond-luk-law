import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchBlogPosts } from '../contentful/blogClient';
import ContactFloatIcon from '../sections/home/ContactFloatIcon';
import ScrollToTop from '../sections/home/ScrollToTop';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-');
};

const richTextOptions = {
  renderNode: {
    'embedded-asset-block': (node) => {
      const { title, file } = node.data.target.fields;
      const imageUrl = file?.url ? `https:${file.url}` : null;
      return imageUrl ? (
        <div className="my-6 max-w-full">
          <img
            src={imageUrl}
            alt={title || 'Embedded image'}
            className="w-full h-auto rounded-xl border border-slate-100 object-contain"
          />
          {title && (
            <p className="text-xs text-slate-400 mt-2 text-center italic break-words">
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
        className="text-blue-700 hover:underline break-all"
      >
        {children}
      </a>
    ),
    'unordered-list': (node, children) => (
      <ul className="list-disc pl-5 my-3 space-y-1 text-slate-600 text-sm md:text-base break-words">
        {children}
      </ul>
    ),
    'ordered-list': (node, children) => (
      <ol className="list-decimal pl-5 my-3 space-y-1 text-slate-600 text-sm md:text-base break-words">
        {children}
      </ol>
    ),
    'list-item': (node, children) => (
      <li className="leading-relaxed break-words">{children}</li>
    ),
    paragraph: (node, children) => (
      <p className="mb-3 leading-relaxed text-slate-600 text-sm md:text-[15px] break-words">
        {children}
      </p>
    ),
  },
};

function ContentfulAccordion({ richTextDocument, sectionId, iconType }) {
  const [openIndexes, setOpenIndexes] = useState({});
  if (!richTextDocument || !richTextDocument.content) return null;

  const accordions = [];
  let currentGroup = null;

  richTextDocument.content.forEach((node) => {
    const isHeading = /^heading-\d$/.test(node.nodeType);
    if (isHeading) {
      if (currentGroup) accordions.push(currentGroup);
      currentGroup = { heading: node, bodyNodes: [] };
    } else if (currentGroup) {
      currentGroup.bodyNodes.push(node);
    }
  });
  if (currentGroup) accordions.push(currentGroup);

  if (accordions.length === 0 && richTextDocument.content.length > 0) {
    return (
      <div className="prose max-w-none bg-white p-4 border border-slate-100 rounded-xl overflow-x-auto break-words">
        {documentToReactComponents(richTextDocument, richTextOptions)}
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {accordions.map((item, idx) => {
        const uniqueKey = `${sectionId}-${idx}`;
        const isOpen = !!openIndexes[uniqueKey];
        const headingText =
          item.heading.content
            .map((c) => c.value || '')
            .join('')
            .trim() || 'View Details';
        const subDocument = {
          nodeType: 'document',
          data: {},
          content: item.bodyNodes,
        };

        return (
          <div
            key={uniqueKey}
            id={slugify(headingText)}
            className="border border-slate-200/80 rounded-xl overflow-hidden bg-white transition-all scroll-mt-24 w-full"
          >
            <button
              onClick={() =>
                setOpenIndexes((prev) => ({
                  ...prev,
                  [uniqueKey]: !prev[uniqueKey],
                }))
              }
              className="w-full flex items-start justify-between gap-3 p-4 text-left font-semibold text-[#0F294A] bg-white select-none"
            >
              <div className="flex gap-2.5 items-start max-w-[90%]">
                {iconType === 'insight' ? (
                  <svg
                    className="w-4 h-4 mt-0.5 shrink-0 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mt-0.5 shrink-0 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span className="text-sm md:text-[15px] tracking-tight break-words">
                  {headingText}
                </span>
              </div>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-y-auto ${
                isOpen
                  ? 'max-h-[4000px] border-t border-slate-100 p-4 bg-slate-50/50'
                  : 'max-h-0'
              }`}
            >
              <div className="prose max-w-none text-slate-600 text-sm leading-relaxed break-words">
                {documentToReactComponents(subDocument, richTextOptions)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug ?? params.category;
  const { i18n, t } = useTranslation();
  const mainRef = useRef();

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tocItems = [];
  if (post) {
    if (post.mainQuestionAnswer)
      tocItems.push({
        label: t('quickAnswer', 'Quick Answer'),
        targetId: 'quick-answer',
      });
    if (post.body)
      tocItems.push({
        label: t('overview', 'Overview'),
        targetId: 'article-overview',
      });
    if (post.keyQuestions)
      tocItems.push({
        label: t('keyInsights', 'Key questions '),
        targetId: 'key-insights-section',
      });
    if (post.commonQuestions)
      tocItems.push({
        label: t('qaBreakdown', 'Q&A Breakdown'),
        targetId: 'qa-section',
      });
    if (post.finalThoughts)
      tocItems.push({
        label: t('closingPerspectives', 'Final thoughts'),
        targetId: 'closing-thoughts',
      });
  }

  useEffect(() => {
    let active = true;
    const loadPost = async () => {
      try {
        setLoading(true);

        const currentLang = i18n.resolvedLanguage?.startsWith('zh')
          ? 'zh'
          : 'en-US';
        const fallbackLang = currentLang === 'zh' ? 'en-US' : 'zh';

        const currentLangPosts = await fetchBlogPosts(currentLang);
        const fallbackLangPosts = await fetchBlogPosts(fallbackLang);

        if (!active) return;
        setAllPosts(currentLangPosts);

        let targetPost = currentLangPosts.find((p) => p.slug === slug);

        if (!targetPost) {
          const fallbackMatch = fallbackLangPosts.find((p) => p.slug === slug);
          if (fallbackMatch) {
            targetPost =
              currentLangPosts.find((p) => p.id === fallbackMatch.id) ||
              fallbackMatch;
          }
        }

        if (active && targetPost) {
          setPost(targetPost);
        }
      } catch (err) {
        console.error('Error loading blog content:', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPost();
    return () => {
      active = false;
    };
  }, [slug, i18n.resolvedLanguage]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (loading || !post) return <div className="min-h-screen bg-white" />;

  const localizedDate = post.publishDate
    ? new Date(post.publishDate).toLocaleDateString(
        i18n.resolvedLanguage?.startsWith('zh') ? 'zh-CN' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
      )
    : '';

  const BreadcrumbsNav = () => (
    <nav className="text-xs text-slate-300 space-x-2">
      <Link to="/resources" className="hover:text-white transition-colors">
        {t('resources', 'Resources')}
      </Link>
      <span>/</span>
      <span className="text-amber-400 font-medium">
        {t('insights', 'Insights')}
      </span>
    </nav>
  );

  // Common Table of Contents Component Block shared by both mobile and desktop views
  const TableOfContentsCard = () => (
    <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)] w-full">
      <h4 className="font-bold text-[#0F294A] text-sm uppercase tracking-wider mb-4">
        {t('inThisArticle', 'In this article')}
      </h4>
      <ul className="space-y-3 text-xs font-medium text-slate-500">
        {tocItems.map((item, index) => (
          <li key={item.targetId}>
            <button
              onClick={() => scrollToSection(item.targetId)}
              className={`flex items-center text-left transition-colors duration-150 hover:text-slate-900 ${
                index === 0 ? 'text-amber-600 gap-2 font-semibold' : 'pl-3.5'
              }`}
            >
              {index === 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              )}
              <span className="truncate">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.title} | Luk & Associates</title>
      </Helmet>

      <main
        ref={mainRef}
        className="min-h-screen bg-white pb-28 md:pb-24 text-slate-800 antialiased w-full overflow-x-hidden"
      >
        {/* Full-Width Editorial Header Banner */}
        <section className="relative w-full h-72 md:h-[380px] bg-[#0F294A] overflow-hidden">
          <img
            src="/assets/banner/blog.png"
            alt="Blog banner"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F294A] via-[#0F294A]/50 to-transparent" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-10">
            <div className="max-w-4xl w-full">
              {/* Desktop Only Breadcrumbs Header */}
              <div className="hidden md:block mb-4">
                <BreadcrumbsNav />
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] break-words">
                {post.title}
              </h1>
              <div className="w-16 h-1 bg-amber-500 rounded mt-4" />
              {post.excerpt && (
                <p className="text-slate-200 mt-4 text-sm md:text-base font-normal max-w-2xl leading-relaxed break-words">
                  {post.excerpt}
                </p>
              )}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-4">
                <div className="flex items-center gap-1 text-xs text-slate-300">
                  <span>
                    📅 {t('updated', 'Updated')}: {localizedDate}
                  </span>
                </div>
                {/* Mobile Only Breadcrumbs Header shifted beneath Updated details */}
                <div className="block md:hidden mt-1">
                  <BreadcrumbsNav />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 space-y-12 w-full">
          {/* Mobile Only: Renders on small layouts directly underneath editorial banner */}
          {tocItems.length > 0 && (
            <div className="block lg:hidden w-full">
              <TableOfContentsCard />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT MAIN CONTENT STREAM */}
            <div className="lg:col-span-8 space-y-10 min-w-0">
              {/* Dynamic Quick Answer Box Card */}
              {post.mainQuestionAnswer && (
                <section
                  id="quick-answer"
                  className="bg-[#F4F8FC] border border-blue-100 rounded-xl p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] scroll-mt-24 overflow-x-auto"
                >
                  <div className="flex gap-3">
                    <span className="text-blue-600 text-lg mt-0.5 shrink-0">
                      ⚖️
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-blue-800 mb-1">
                        {t('quickAnswer', 'Answering the main question')}
                      </h2>
                      <div className="prose max-w-none text-slate-700 font-medium text-[14px] leading-relaxed break-words">
                        {documentToReactComponents(
                          post.mainQuestionAnswer,
                          richTextOptions
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Main Introduction Body Block */}
              {post.body && (
                <section
                  id="article-overview"
                  className="prose max-w-none text-slate-700 leading-relaxed text-[15px] scroll-mt-24 break-words overflow-x-auto"
                >
                  {documentToReactComponents(post.body, richTextOptions)}
                </section>
              )}

              {/* Side-by-Side Collapsible Columns */}
              {(post.keyQuestions || post.commonQuestions) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 w-full">
                  {post.keyQuestions && (
                    <div
                      id="key-insights-section"
                      className="scroll-mt-24 min-w-0"
                    >
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A] pb-2 border-b border-slate-200 flex items-center gap-2">
                        📋{' '}
                        {t(
                          'keyInsights',
                          'Key questions clients typically have'
                        )}
                      </h3>
                      <ContentfulAccordion
                        richTextDocument={post.keyQuestions}
                        sectionId="key-insights"
                        iconType="insight"
                      />
                    </div>
                  )}
                  {post.commonQuestions && (
                    <div id="qa-section" className="scroll-mt-24 min-w-0">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A] pb-2 border-b border-slate-200 flex items-center gap-2">
                        💬 {t('qaBreakdown', 'Q&A Breakdown')}
                      </h3>
                      <ContentfulAccordion
                        richTextDocument={post.commonQuestions}
                        sectionId="common-qa"
                        iconType="qa"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Final Thoughts: Renders directly below the Q&A segment block */}
              {post.finalThoughts && (
                <section
                  id="closing-thoughts"
                  className="pt-6 border-t border-slate-100 w-full scroll-mt-24"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A] mb-3">
                    {t('closingPerspectives', 'Final thoughts')}
                  </h3>
                  <div className="p-6 bg-amber-50/40 border border-amber-100/60 rounded-xl italic text-slate-700 font-medium text-[15px] leading-relaxed break-words overflow-x-auto">
                    {documentToReactComponents(
                      post.finalThoughts,
                      richTextOptions
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-6 min-w-0">
              {/* Desktop Only: Keeps "In this article" component in its original sidebar slot */}
              {tocItems.length > 0 && (
                <div className="hidden lg:block w-full">
                  <TableOfContentsCard />
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                  <h4 className="font-bold text-[#0F294A] text-sm uppercase tracking-wider mb-4">
                    {t('moreArticles', 'More Articles')}
                  </h4>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link
                        key={article.id || article.slug}
                        to={`/resources/${article.slug}`}
                        className="flex gap-3 items-center group cursor-pointer border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-100 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-400 group-hover:text-[#C59B27] transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-[#C59B27] transition-colors line-clamp-2 leading-snug break-words">
                            {article.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Corporate CTA Box Card */}
              <div className="bg-[#0F294A] text-white rounded-2xl p-6 shadow-md space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 pt-1">
                    <svg
                      className="w-10 h-10 text-[#C59B27]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-xl font-medium tracking-wide text-white">
                      {t('needAdvice', 'Need Legal Advice?')}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed font-normal">
                      {t(
                        'protectMatters',
                        "We're here to help you protect what matters most."
                      )}
                    </p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="block w-full py-3.5 bg-[#B58A4C] hover:bg-[#A1793E] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-colors duration-200 text-center"
                >
                  {t('bookConsultation', 'Book a Consultation')}
                </Link>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:905-667-6496"
                    className="text-sm font-sans font-semibold tracking-wide text-white hover:underline underline-offset-4 transition-all"
                  >
                    (905) 667-6496
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Back Navigation Links */}
          <div className="border-t border-slate-100 py-8">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-900 hover:text-slate-500 transition-colors"
            >
              ← {t('backToResources', 'Back to All Resources')}
            </Link>
          </div>
        </div>
        <ScrollToTop />
        <ContactFloatIcon />
      </main>
    </>
  );
}

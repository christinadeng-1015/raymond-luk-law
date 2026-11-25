import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchBlogPosts } from '../../contentful/blogClient';
import { localizedPath } from '../../utils/localizedPath';
import ContactFloatIcon from '../home/ContactFloatIcon';
import ScrollToTop from '../home/ScrollToTop';

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
      if (!imageUrl) return null;

      return (
        <div className="my-6 max-w-full">
          <img
            src={imageUrl}
            alt={title || 'Embedded image'}
            className="w-full h-auto rounded-xl shadow-sm border border-slate-200 object-contain"
            loading="lazy"
          />
          {title && (
            <p className="text-xs text-slate-400 mt-2 text-center italic break-words">
              {title}
            </p>
          )}
        </div>
      );
    },
    hyperlink: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0F294A] font-semibold hover:text-[#C59B27] underline underline-offset-4 break-all transition-colors"
      >
        {children}
      </a>
    ),
    'unordered-list': (node, children) => (
      <ul className="list-disc pl-5 my-2 space-y-1.5 text-slate-700 text-[14px] md:text-[14.5px] break-words marker:text-[#C59B27]">
        {children}
      </ul>
    ),
    'ordered-list': (node, children) => (
      <ol className="list-decimal pl-5 my-2 space-y-1.5 text-slate-700 text-[14px] md:text-[14.5px] break-words marker:text-[#0F294A] marker:font-semibold">
        {children}
      </ol>
    ),
    'list-item': (node, children) => (
      <li className="leading-relaxed break-words pl-1">{children}</li>
    ),
    paragraph: (node, children) => (
      <p className="mb-4 leading-[1.75] text-slate-700 text-[14px] md:text-[14.5px] break-words">
        {children}
      </p>
    ),
  },
};

const quickAnswerRichTextOptions = {
  ...richTextOptions,
  renderNode: {
    ...richTextOptions.renderNode,
    paragraph: (node, children) => (
      <p className="mb-2.5 last:mb-0 leading-[1.65] text-slate-600 text-[13px] font-normal break-words">
        {children}
      </p>
    ),
    'unordered-list': (node, children) => (
      <ul className="list-disc pl-4 my-2 space-y-1 text-slate-600 text-[13px] font-normal break-words marker:text-[#C59B27]">
        {children}
      </ul>
    ),
    'ordered-list': (node, children) => (
      <ol className="list-decimal pl-4 my-2 space-y-1 text-slate-600 text-[13px] font-normal break-words marker:text-[#0F294A] marker:font-semibold">
        {children}
      </ol>
    ),
  },
};

function ContentfulAccordion({ richTextDocument, sectionId, t }) {
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
      <div className="prose max-w-none break-words overflow-x-auto">
        {documentToReactComponents(richTextDocument, richTextOptions)}
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {accordions.map((item, idx) => {
        const uniqueKey = `${sectionId}-${idx}`;
        const isOpen = !!openIndexes[uniqueKey];
        const headingText =
          item.heading.content
            .map((c) => c.value || '')
            .join('')
            .trim() || (t ? t('blog.viewDetails') : 'View Details');
        const subDocument = {
          nodeType: 'document',
          data: {},
          content: item.bodyNodes,
        };

        return (
          <div
            key={uniqueKey}
            id={slugify(headingText)}
            className={`border rounded-lg transition-all duration-200 scroll-mt-24 w-full overflow-hidden ${
              isOpen
                ? 'bg-white shadow-sm border-[#0F294A]/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <button
              onClick={() =>
                setOpenIndexes((prev) => ({
                  ...prev,
                  [uniqueKey]: !prev[uniqueKey],
                }))
              }
              className="w-full flex items-center justify-between gap-3 p-4 text-left font-serif font-medium text-[15px] md:text-[16px] text-[#0F294A] select-none transition-colors"
            >
              <div className="flex gap-3 items-center max-w-[92%]">
                <span className="tracking-tight break-words leading-snug">
                  {headingText}
                </span>
              </div>
              <div className="w-5 h-5 flex items-center justify-center shrink-0 text-[#0F294A]">
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'max-h-[2000px] opacity-100 border-t border-slate-100 overflow-y-auto'
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className="p-4 prose max-w-none text-slate-700 text-[14px] leading-relaxed break-words bg-white overflow-x-auto">
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
  const { i18n, t } = useTranslation('main');
  const mainRef = useRef();

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tocItems = [];
  if (post) {
    if (post.mainQuestionAnswer) {
      tocItems.push({
        label: t('blog.toc.quickAnswer', 'Quick Answer'),
        targetId: 'quick-answer',
      });
    }
    if (post.body) {
      tocItems.push({
        label: t('blog.toc.overview', 'Overview'),
        targetId: 'article-overview',
      });
    }
    if (post.keyQuestions || post.commonQuestions) {
      tocItems.push({
        label: t('blog.toc.keyInsights', 'Common Questions'),
        targetId: 'key-insights-section',
      });
    }
    if (post.finalThoughts) {
      tocItems.push({
        label: t('blog.toc.closingPerspectives', 'Final Thoughts'),
        targetId: 'closing-thoughts',
      });
    }
  }

  useEffect(() => {
    let active = true;
    const loadPost = async () => {
      try {
        setLoading(true);
        const currentLang =
          i18n.resolvedLanguage === 'zh-HK'
            ? 'zh-HK'
            : i18n.resolvedLanguage?.startsWith('zh')
              ? 'zh'
              : 'en-US';
        const fallbackLang = currentLang === 'en-US' ? 'zh' : 'en-US';

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
        if (active && targetPost) setPost(targetPost);
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
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  if (loading || !post) return <div className="min-h-screen bg-white" />;

  const localizedDate = post.publishDate
    ? new Date(post.publishDate).toLocaleDateString(
      i18n.resolvedLanguage === 'zh-HK'
        ? 'zh-HK'
        : i18n.resolvedLanguage?.startsWith('zh')
          ? 'zh-CN'
          : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
      )
    : '';

  const postImageUrl =
    typeof post.image === 'string'
      ? post.image
      : post.image?.fields?.file?.url
        ? `https:${post.image.fields.file.url}`
        : post.image?.url
          ? `https:${post.image.url}`
          : null;

  const BreadcrumbsNav = () => (
    <nav className="relative z-50 flex flex-wrap items-center text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-slate-400 font-semibold mb-6 pointer-events-auto">
      <Link
        to={localizedPath('/', i18n.language)}
        className="hover:text-white transition-colors py-1 cursor-pointer"
      >
        Home
      </Link>
      <span className="text-slate-600 mx-2 text-[9px] select-none">&gt;</span>
      <Link
        to={localizedPath('/resources', i18n.language)}
        className="hover:text-white transition-colors py-1 cursor-pointer"
      >
        Resources
      </Link>
      <span className="text-slate-600 mx-2 text-[9px] select-none">&gt;</span>
      <span className="text-slate-200 py-1 truncate max-w-[150px] sm:max-w-none select-none">
        {post?.category || 'Article'}
      </span>
    </nav>
  );

  const renderTableOfContents = (isMobile = false) => {
    if (tocItems.length === 0) return null;
    return (
      <div
        className={`bg-[#F8FAFC] rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm ${isMobile ? 'block lg:hidden mb-10' : 'hidden lg:block'}`}
      >
        <h4 className="font-bold text-[#0F294A] text-[12px] md:text-[13px] uppercase tracking-[0.15em] mb-5">
          {t('blog.toc.inThisArticle', 'In This Article')}
        </h4>
        <ul className="space-y-4 text-[14px] md:text-[15px] font-medium text-slate-600">
          {tocItems.map((item, index) => (
            <li key={item.targetId}>
              <button
                onClick={() => scrollToSection(item.targetId)}
                className={`flex items-start text-left transition-all duration-200 hover:text-[#C59B27] w-full leading-relaxed ${
                  index === 0 ? 'text-[#0F294A] font-bold' : ''
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 shrink-0 ${index === 0 ? 'bg-[#C59B27]' : 'bg-slate-300'}`}
                />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white pb-12 md:pb-16 text-slate-800 antialiased w-full overflow-x-hidden font-sans "
    >
      <section className="relative w-full bg-[#0B1E36] overflow-hidden pt-32 pb-12 md:pb-16 min-h-[360px] md:min-h-[440px] flex flex-col justify-end md:justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F294A] to-[#0B1E36] pointer-events-none" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full flex flex-col">
            <BreadcrumbsNav />

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-medium text-white leading-tight mb-4">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-[12px] md:text-[15px] text-slate-300 leading-relaxed max-w-2xl">
                {post.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-slate-400 border-t border-slate-700/50 pt-4">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-[#C59B27]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Updated {localizedDate}
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-[#C59B27]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                By Raymond Luk
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {renderTableOfContents(true)}

        {(post.mainQuestionAnswer || postImageUrl) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch w-full mb-8">
            <div className="lg:col-span-8 flex flex-col min-w-0">
              {post.mainQuestionAnswer && (
                <section
                  id="quick-answer"
                  className="w-full bg-[#F2F6FA] border border-blue-100/50 rounded-xl p-5 md:p-6 h-full flex flex-col scroll-mt-24 shadow-sm"
                >
                  <div className="flex gap-4 items-start flex-1">
                    <div className="shrink-0 text-[#0F294A] mt-0.5">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[11.5px] font-bold uppercase tracking-[0.15em] text-[#0F294A] mb-2.5">
                        {t('blog.toc.quickAnswer', 'Quick Answer')}
                      </h2>
                      <div className="prose max-w-none break-words">
                        {documentToReactComponents(
                          post.mainQuestionAnswer,
                          quickAnswerRichTextOptions
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Post Image for Mobile Only (Stays in Main Flow directly under Quick Answer) */}
              {postImageUrl && (
                <div className="block lg:hidden w-full overflow-hidden rounded-xl shadow-sm border border-slate-100 h-[200px] sm:h-[280px] relative group mt-8">
                  <img
                    src={postImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border-2 border-black/5 rounded-xl pointer-events-none" />
                </div>
              )}
            </div>

            {/* Right Column: Desktop Image (Automatically stretches to identical height of Quick Answer) */}
            <div className="hidden lg:flex lg:col-span-4 min-w-0">
              {postImageUrl && (
                <div className="w-full overflow-hidden rounded-xl shadow-sm border border-slate-100 relative group flex-1">
                  <img
                    src={postImageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border-2 border-black/5 rounded-xl pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
          <div className="lg:col-span-8 min-w-0">
            {post.body && (
              <section
                id="article-overview"
                className="prose prose-slate prose-headings:font-serif prose-headings:font-medium prose-headings:text-[#0F294A] prose-h2:text-[22px] prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-[18px] prose-h3:mt-6 prose-h3:mb-3 prose-strong:text-[#0F294A] max-w-none text-slate-700 leading-relaxed scroll-mt-24 break-words overflow-x-auto mb-6"
              >
                {documentToReactComponents(post.body, richTextOptions)}
              </section>
            )}

            {(post.keyQuestions || post.commonQuestions) && (
              <div
                id="key-insights-section"
                className="flex flex-col pt-8 mt-8 border-t border-slate-200 scroll-mt-24 mb-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-[#C59B27] rounded-full"></div>
                  <h2 className="text-[22px] font-serif font-medium text-[#0F294A] m-0">
                    {t('blog.toc.keyInsights', 'Common Questions')}
                  </h2>
                </div>
                <div className="space-y-3">
                  {post.keyQuestions && (
                    <ContentfulAccordion
                      richTextDocument={post.keyQuestions}
                      sectionId="key-insights"
                      t={t}
                    />
                  )}
                  {post.commonQuestions && (
                    <ContentfulAccordion
                      richTextDocument={post.commonQuestions}
                      sectionId="common-qa"
                      t={t}
                    />
                  )}
                </div>
              </div>
            )}

            {post.finalThoughts && (
              <div
                id="closing-thoughts"
                className="pt-8 mt-8 border-t border-slate-200 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-[#0F294A] rounded-full"></div>
                  <h2 className="text-[22px] font-serif font-medium text-[#0F294A] m-0">
                    {t('blog.toc.closingPerspectives', 'Final Thoughts')}
                  </h2>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-6 shadow-sm">
                  <div className="prose max-w-none text-slate-700 text-[12px] md:text-[14.5px] leading-[1.75] break-words">
                    {documentToReactComponents(
                      post.finalThoughts,
                      richTextOptions
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-start w-full mt-10 relative z-20">
              <Link
                to={localizedPath('/resources', i18n.language)}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider font-semibold text-[#C59B27] hover:text-[#A1793E] transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">
                  &larr;
                </span>
                Back to Resources
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 min-w-0 space-y-8 h-fit">
            {renderTableOfContents(false)}

            <div className="bg-[#0F294A] text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-serif text-[18px] md:text-[20px] font-medium tracking-wide text-white leading-tight mb-3">
                  {t(
                    'blog.cta.needAdvice',
                    'Need advice about a separation agreement?'
                  )}
                </h4>
                <p className="text-slate-300 text-[12.5px] md:text-[13px] leading-relaxed mb-5">
                  Speak with our family law team to understand your options and
                  get practical, solution-focused advice.
                </p>

                <Link
                  to={localizedPath('/contact', i18n.language)}
                  className="block w-full py-3 bg-[#E6BA5C] hover:bg-[#D4A94A] text-[#0F294A] font-semibold text-[13px] rounded transition-all duration-300 text-center mb-5"
                >
                  Book a Consultation &rarr;
                </Link>

                <div className="space-y-3 text-[12.5px] md:text-[13px] text-slate-300 font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-[#C59B27]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a href="tel:905-604-1808" className="hover:text-white">
                      (905) 604-1808
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-[#C59B27]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:info@luklaw.ca"
                      className="hover:text-white"
                    >
                      info@luklaw.ca
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-[#C59B27]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Markham, Ontario</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-600/50">
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 leading-relaxed">
                    Serving Markham, Scarborough
                    <br />
                    and surrounding areas
                  </p>
                </div>
              </div>
            </div>

            {/* Polished Related Articles Widget */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100 shadow-sm w-full">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-bold text-[#0F294A] text-[11px] uppercase tracking-[0.15em]">
                    Related Articles
                  </h4>
                  <Link
                    to={localizedPath('/resources', i18n.language)}
                    className="text-[10px] font-semibold text-[#C59B27] hover:text-[#A1793E] transition-colors uppercase tracking-wider"
                  >
                    View All &rarr;
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  {relatedArticles.map((article) => {
                    const thumbUrl =
                      typeof article.image === 'string'
                        ? article.image
                        : article.image?.fields?.file?.url
                          ? `https:${article.image.fields.file.url}`
                          : article.image?.url
                            ? `https:${article.image.url}`
                            : null;

                    return (
                      <Link
                        key={article.id || article.slug}
                        to={localizedPath(
                          `/resources/${article.slug}`,
                          i18n.language
                        )}
                        className="group flex items-center gap-4 hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
                      >
                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden relative shrink-0 shadow-sm border border-slate-200/50">
                          {thumbUrl ? (
                            <img
                              src={thumbUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="text-[12.5px] md:text-[13px] font-semibold text-[#0F294A] group-hover:text-[#C59B27] transition-colors line-clamp-2 leading-snug mb-1">
                            {article.title}
                          </p>
                          <span className="text-[9.5px] text-slate-400 font-medium uppercase tracking-widest group-hover:text-[#A1793E] transition-colors">
                            Read Now &rarr;
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <ScrollToTop />
      <ContactFloatIcon />
    </main>
  );
}

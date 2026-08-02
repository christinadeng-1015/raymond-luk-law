import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchBlogPosts } from '../../contentful/blogClient';
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
        className="text-[#C59B27] font-medium hover:text-[#A1793E] hover:underline underline-offset-4 break-all transition-colors"
      >
        {children}
      </a>
    ),
    'unordered-list': (node, children) => (
      <ul className="list-disc pl-5 my-3 space-y-2 text-slate-700 text-[15px] md:text-[16px] break-words marker:text-[#C59B27]">
        {children}
      </ul>
    ),
    'ordered-list': (node, children) => (
      <ol className="list-decimal pl-5 my-3 space-y-2 text-slate-700 text-[15px] md:text-[16px] break-words marker:text-[#0F294A] marker:font-semibold">
        {children}
      </ol>
    ),
    'list-item': (node, children) => (
      <li className="leading-relaxed break-words pl-1">{children}</li>
    ),
    paragraph: (node, children) => (
      <p className="mb-4 leading-[1.8] text-slate-700 text-[15px] md:text-[16px] break-words">
        {children}
      </p>
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
      <div className="prose max-w-none break-words">
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
            className={`border border-slate-200 rounded-xl transition-all duration-200 scroll-mt-24 w-full overflow-hidden ${
              isOpen
                ? 'bg-white shadow-md border-blue-100'
                : 'bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300'
            }`}
          >
            <button
              onClick={() =>
                setOpenIndexes((prev) => ({
                  ...prev,
                  [uniqueKey]: !prev[uniqueKey],
                }))
              }
              className="w-full flex items-center justify-between gap-4 p-4 md:px-5 text-left font-semibold text-[#0F294A] select-none transition-colors"
            >
              <div className="flex gap-3 items-start max-w-[92%]">
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-colors ${
                    isOpen ? 'bg-[#C59B27]' : 'bg-slate-300'
                  }`}
                />
                <span className="text-[15px] md:text-[16px] tracking-tight break-words leading-snug">
                  {headingText}
                </span>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-white text-slate-400'}`}
              >
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
                  ? 'max-h-[2000px] opacity-100 border-t border-slate-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 md:p-5 prose max-w-none text-slate-700 text-[15px] leading-relaxed break-words bg-white">
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
        label: t('blog.toc.quickAnswer'),
        targetId: 'quick-answer',
      });
    }

    if (post.body) {
      tocItems.push({
        label: t('blog.toc.overview'),
        targetId: 'article-overview',
      });
    }

    if (post.keyQuestions) {
      tocItems.push({
        label: t('blog.toc.keyInsights'),
        targetId: 'key-insights-section',
      });
    }

    if (post.commonQuestions) {
      tocItems.push({
        label: t('blog.toc.commonQuestions'),
        targetId: 'qa-section',
      });
    }

    if (post.finalThoughts) {
      tocItems.push({
        label: t('blog.toc.closingPerspectives'),
        targetId: 'closing-thoughts',
      });
    }
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

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (loading || !post) return <div className="min-h-screen bg-white" />;

  const localizedDate = post.publishDate
    ? new Date(post.publishDate).toLocaleDateString(
        i18n.resolvedLanguage?.startsWith('zh') ? 'zh-CN' : 'en-US',
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
    <nav className="text-xs text-slate-300 space-x-2 font-medium tracking-wide">
      <Link to="/resources" className="hover:text-white transition-colors">
        {t('blog.resources')}
      </Link>
      <span className="text-slate-500">/</span>
      <span className="text-amber-400">{t('blog.insights')}</span>
    </nav>
  );

  const TableOfContentsCard = () => (
    <div className="bg-[#0F294A] rounded-2xl p-5 md:p-8 border-t-4 border-t-[#C59B27] shadow-xl relative overflow-hidden flex flex-col min-h-[280px]">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-bl-full -z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-800/50">
          <h4 className="font-bold text-white text-[13px] uppercase tracking-[0.15em]">
            {t('blog.toc.inThisArticle')}
          </h4>
        </div>

        <ul className="space-y-4 md:space-y-5 text-[14.5px] font-medium text-slate-300 flex-1">
          {tocItems.map((item, index) => (
            <li key={item.targetId}>
              <button
                onClick={() => scrollToSection(item.targetId)}
                className={`flex items-start text-left transition-all duration-200 hover:text-[#C59B27] group w-full leading-relaxed ${
                  index === 0 ? 'text-white font-bold' : ''
                }`}
              >
                <span className="w-4 flex shrink-0 mt-1 text-[#C59B27] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
                  →
                </span>
                <span className="truncate group-hover:translate-x-1 transition-transform duration-300">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white pb-20 md:pb-24 text-slate-800 antialiased w-full overflow-x-hidden font-sans"
    >
      <section className="relative w-full min-h-[280px] md:min-h-[320px] bg-[#0F294A] overflow-hidden flex flex-col justify-end pt-24 pb-8 md:pb-12">
        <img
          src="/assets/banner/blog.png"
          alt="Blog banner"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F294A] via-[#0F294A]/60 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full flex flex-col gap-3 md:gap-4">
            <BreadcrumbsNav />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.25] break-words">
              {post.title}
            </h1>
            <div className="text-sm font-medium text-[#C59B27] bg-[#C59B27]/10 w-fit px-3 py-1 rounded-full border border-[#C59B27]/20 mt-2 hidden md:block">
              {t('blog.updated')}: {localizedDate}
            </div>
          </div>
        </div>
      </section>

      {post.mainQuestionAnswer && (
        <section
          id="quick-answer"
          className="w-full bg-[#F4F8FC] border-b border-blue-100 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
              <div className="shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0F294A] text-white shadow-lg">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-[#C59B27]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#0F294A] mb-2 md:mb-3">
                  {t('blog.toc.quickAnswer')}
                </h2>
                <div className="prose max-w-none text-[#0F294A] font-medium text-[15px] md:text-[17px] leading-[1.8] break-words">
                  {documentToReactComponents(
                    post.mainQuestionAnswer,
                    richTextOptions
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-14 space-y-10 md:space-y-12 w-full">
        {tocItems.length > 0 && (
          <div className="block lg:hidden w-full mb-2">
            <TableOfContentsCard />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          <div className="lg:col-span-8 min-w-0">
            {postImageUrl && (
              <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-slate-100 h-[220px] md:h-[320px] relative group mb-8 md:mb-10">
                <img
                  src={postImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 border-2 border-black/5 rounded-2xl pointer-events-none" />
              </div>
            )}

            {post.body && (
              <section
                id="article-overview"
                className="prose prose-slate prose-headings:text-[#0F294A] prose-headings:font-bold prose-strong:text-[#0F294A] max-w-none text-slate-700 leading-relaxed scroll-mt-24 break-words overflow-x-auto"
              >
                {documentToReactComponents(post.body, richTextOptions)}
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 min-w-0 hidden lg:block">
            {tocItems.length > 0 && <TableOfContentsCard />}
          </aside>
        </div>

        {(post.keyQuestions || post.commonQuestions) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-8 border-t border-slate-100 w-full">
            {post.keyQuestions && (
              <div
                id="key-insights-section"
                className="scroll-mt-24 min-w-0 w-full"
              >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-1.5 h-6 bg-[#C59B27] rounded-full" />
                  <h3 className="text-lg font-bold text-[#0F294A]">
                    {t('blog.toc.keyInsights')}
                  </h3>
                </div>
                <ContentfulAccordion
                  richTextDocument={post.keyQuestions}
                  sectionId="key-insights"
                  t={t}
                />
              </div>
            )}
            {post.commonQuestions && (
              <div id="qa-section" className="scroll-mt-24 min-w-0 w-full">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-1.5 h-6 bg-[#0F294A] rounded-full" />
                  <h3 className="text-lg font-bold text-[#0F294A]">
                    {t('blog.toc.commonQuestions')}
                  </h3>
                </div>
                <ContentfulAccordion
                  richTextDocument={post.commonQuestions}
                  sectionId="common-qa"
                  t={t}
                />
              </div>
            )}
          </div>
        )}

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 md:pt-10 border-t border-slate-100 w-full scroll-mt-24"
          id="closing-thoughts"
        >
          <div className="lg:col-span-8 min-w-0 flex flex-col justify-center">
            {post.finalThoughts && (
              <section className="bg-[#FCF9F2] border-l-4 border-[#C59B27] rounded-r-2xl p-5 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F294A] mb-3 md:mb-4 flex items-center gap-2">
                  ✨ {t('blog.toc.closingPerspectives')}
                </h3>
                <div className="prose max-w-none text-[#0F294A] font-medium text-[15px] md:text-[16px] leading-[1.8] break-words">
                  {documentToReactComponents(
                    post.finalThoughts,
                    richTextOptions
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 flex items-stretch min-w-0">
            <div className="bg-[#0F294A] text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-blue-900/10 flex flex-col justify-between w-full relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#C59B27] rounded-full opacity-20 blur-2xl pointer-events-none" />
              <div className="space-y-2 md:space-y-3 z-10">
                <h4 className="font-serif text-xl md:text-2xl font-medium tracking-wide text-white leading-tight">
                  {t('blog.cta.needAdvice')}
                </h4>
                <p className="text-slate-300 text-[14px] leading-relaxed">
                  {t('blog.cta.protectMatters')}
                </p>
              </div>
              <div className="mt-6 md:mt-8 space-y-4 z-10">
                <Link
                  to="/contact"
                  className="block w-full py-3.5 bg-[#B58A4C] hover:bg-[#A1793E] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t('blog.cta.bookConsultation')}
                </Link>
                <div className="flex items-center justify-center text-center">
                  <a
                    href="tel:905-667-6496"
                    className="text-[15px] font-sans font-semibold tracking-wide text-slate-300 hover:text-white transition-colors"
                  >
                    (905) 667-6496
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <section className="pt-10 md:pt-12 border-t border-slate-100 w-full">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-bold text-[#0F294A]">
                {t('blog.moreArticles')}
              </h3>
              <Link
                to="/resources"
                className="text-sm font-semibold text-[#C59B27] hover:text-[#A1793E] transition-colors"
              >
                {t('blog.viewAll')} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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
                    to={`/resources/${article.slug}`}
                    className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-full h-40 md:h-48 bg-slate-50 overflow-hidden relative shrink-0">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                          <svg
                            className="w-8 h-8"
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
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <p className="text-[15px] md:text-[16px] font-bold text-[#0F294A] group-hover:text-[#C59B27] transition-colors line-clamp-3 leading-snug">
                        {article.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="flex justify-start w-full">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C59B27] hover:text-[#A1793E] hover:underline underline-offset-4 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              &larr;
            </span>
            Back to Resources
          </Link>
        </div>
      </div>

      <ScrollToTop />
      <ContactFloatIcon />
    </main>
  );
}

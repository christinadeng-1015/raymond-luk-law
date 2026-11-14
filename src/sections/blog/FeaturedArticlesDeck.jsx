import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import { localizedPath } from '../../utils/localizedPath';

export default function FeaturedArticlesDeck({ displayFeatured }) {
  const { i18n, t } = useTranslation('main');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextCard = useCallback(() => {
    if (displayFeatured.length <= 1) return;
    setActiveCardIndex((prev) => (prev + 1) % displayFeatured.length);
  }, [displayFeatured.length]);

  const prevCard = useCallback(() => {
    if (displayFeatured.length <= 1) return;
    setActiveCardIndex(
      (prev) => (prev - 1 + displayFeatured.length) % displayFeatured.length
    );
  }, [displayFeatured.length]);

  useEffect(() => {
    if (displayFeatured.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextCard();
    }, 5000);

    return () => clearInterval(timer);
  }, [displayFeatured.length, isPaused, nextCard]);

  if (!displayFeatured || displayFeatured.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0C2D57] bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
            {t('blog.featuredTag', 'Featured Insights')}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {t('blog.featuredTitle', 'Must Read Articles')}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Click any visible edge to switch
          </span>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-600 px-2">
              {activeCardIndex + 1} / {displayFeatured.length}
            </span>
          </div>
        </div>
      </div>

      <div
        className="relative h-[360px] sm:h-[320px] w-full py-2 overflow-hidden sm:overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {displayFeatured.map((featuredPost, idx) => {
          const isSelected = activeCardIndex === idx;
          const total = displayFeatured.length;
          const stackPosition = (idx - activeCardIndex + total) % total;

          const dynamicStyle = {
            zIndex: total - stackPosition,
            transform: isSelected
              ? 'translateX(0px) scale(1)'
              : `translateX(${stackPosition * 44}px) scale(${1 - stackPosition * 0.025})`,
            opacity: stackPosition > 3 ? 0 : 1 - stackPosition * 0.15,
          };

          return (
            <div
              key={featuredPost.id || idx}
              onClick={() => setActiveCardIndex(idx)}
              style={dynamicStyle}
              className={`absolute top-0 left-0 w-full sm:w-[84%] h-full transition-all duration-500 ease-out cursor-pointer rounded-2xl border bg-white ${
                isSelected
                  ? 'border-slate-300 shadow-xl ring-1 ring-slate-900/5'
                  : 'border-slate-200 shadow-md hover:border-slate-300'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden rounded-2xl">
                <div className="relative md:col-span-5 h-40 md:h-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={
                      featuredPost.coverImage?.url ||
                      featuredPost.image ||
                      '/assets/banner/blog.png'
                    }
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0C2D57]/20" />

                  {featuredPost.category && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0C2D57] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Tag size={10} />
                      {featuredPost.category}
                    </span>
                  )}
                </div>

                <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-2.5">
                      {featuredPost.publishDate && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          {new Date(
                            featuredPost.publishDate
                          ).toLocaleDateString(i18n.language, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                      {featuredPost.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-400" />
                          {featuredPost.readTime}{' '}
                          {t('blog.minRead', 'min read')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight mb-2.5 line-clamp-2 hover:text-[#0C2D57] transition-colors">
                      <Link
                        to={localizedPath(
                          `/resources/${featuredPost.slug || featuredPost.id}`,
                          i18n.language
                        )}
                      >
                        {featuredPost.title}
                      </Link>
                    </h3>

                    {(featuredPost.excerpt || featuredPost.description) && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {featuredPost.excerpt || featuredPost.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-slate-700">
                      {featuredPost.author?.name ||
                        featuredPost.author ||
                        'Luk Law'}
                    </span>

                    <Link
                      to={localizedPath(
                        `/resources/${featuredPost.slug || featuredPost.id}`,
                        i18n.language
                      )}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C2D57] text-white font-semibold text-xs shadow-sm hover:bg-slate-800 transition-all duration-200"
                    >
                      <span>Read Article</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

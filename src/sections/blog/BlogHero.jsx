import { useTranslation } from 'react-i18next';
import OptimizedImage from './../../components/OptimizedImage';

export default function BlogHero({ searchTerm, onSearchChange, blog }) {
  const { t } = useTranslation('main');

  return (
    <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
      <OptimizedImage
        src="assets/banner/blog.png"
        alt={t('blog.bannerAlt', 'Legal Resources & Blog Banner')}
        originalFormat="png"
        className="absolute inset-0 w-full h-full object-cover transform scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#10284e]/95 via-[#10284e]/75 to-transparent z-10" />

      <div className="relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-8 sm:pb-10 text-left">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-snug md:leading-tight text-balance drop-shadow-sm">
            {blog?.title || t('blog.defaultTitle', 'Insights & Updates')}
          </h1>

          <div className="w-10 sm:w-12 h-[3px] bg-amber-500 rounded-full mt-3 sm:mt-4" />

          {blog?.subtitle && (
            <p className="text-sm sm:text-base leading-relaxed text-slate-100/90 font-sans max-w-sm sm:max-w-xl pt-3 sm:pt-4 drop-shadow-sm">
              {blog.subtitle}
            </p>
          )}

          <div className="mt-5 sm:mt-6 max-w-md sm:max-w-xl">
            <div className="relative group">
              <input
                type="text"
                placeholder={t(
                  'blog.searchPlaceholder',
                  'Search articles, topics, or keywords...'
                )}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/95 backdrop-blur-md px-5 py-3 sm:py-3.5 pr-12 text-sm sm:text-base text-slate-900 shadow-xl transition-all duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10284e]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#10284e] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

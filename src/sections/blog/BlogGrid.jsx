import { useTranslation } from 'react-i18next';
import BlogPostCard from './BlogPostCard';

export default function BlogGrid({
  loading,
  error,
  filteredPosts,
  displayCount,
  onLoadMore,
  isSearching,
}) {
  const { t } = useTranslation('main');

  return (
    <>
      {/* All Articles Heading Area */}
      <div className="border-t border-slate-200 pt-12 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {isSearching
              ? t('blog.searchResultsTitle', 'Search Results')
              : t('blog.latestArticlesTitle', 'Latest Articles')}
          </h2>
          <div className="w-12 h-[3px] bg-amber-600 rounded-full" />
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            {isSearching
              ? `${filteredPosts.length} ${t('blog.resultsFound', 'articles found matching your query.')}`
              : t(
                  'blog.latestArticlesSubtitle',
                  'Stay informed with practical legal advice and insights from our team.'
                )}
          </p>
        </div>
      </div>

      {/* Dynamic States Layout */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-slate-200 bg-white shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2D57] mb-4" />
          <p className="text-slate-500 font-medium text-sm">
            {t('blog.loadingPosts', 'Loading legal insights...')}
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-8 text-center max-w-2xl mx-auto shadow-sm">
          <p className="font-semibold text-rose-900">
            {t('blog.unableToLoadPosts', 'Unable to load articles')}
          </p>
          <p className="mt-1 text-sm text-rose-600">{error}</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center max-w-md mx-auto">
          <p className="text-slate-600 font-medium text-lg">
            {t('blog.noPostsFound', 'No articles found')}
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Try adjusting your search terms or keywords.
          </p>
        </div>
      ) : (
        <>
          {/* 3 Columns Grid for Big Screens */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(0, displayCount).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length > displayCount && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={onLoadMore}
                className="px-8 py-3 rounded-xl bg-[#0C2D57] text-white font-semibold text-sm shadow-md hover:bg-slate-800 transition-all duration-200 active:scale-95"
              >
                {t('blog.viewMoreArticles', 'View More Articles')}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

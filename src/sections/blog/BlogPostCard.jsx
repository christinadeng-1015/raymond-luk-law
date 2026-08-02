import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return value;
  }
};

const getImageUrl = (imageField) => {
  if (!imageField) return null;
  if (typeof imageField === 'string') return imageField;

  if (imageField.url) {
    return imageField.url.startsWith('http')
      ? imageField.url
      : `https:${imageField.url}`;
  }

  const fileUrl = imageField.fields?.file?.url;
  if (!fileUrl) return null;
  return fileUrl.startsWith('http') ? fileUrl : `https:${fileUrl}`;
};

export default function BlogPostCard({ post }) {
  const imageUrl = getImageUrl(post.image);
  const isFeatured =
    post.isFeatureArticle ||
    post.isFeaturedArticle ||
    post.isFeatured ||
    post.featured;

  const summaryText = post.excerpt || post.summary;

  return (
    <Link
      to={`/resources/${encodeURIComponent(post.slug)}`}
      className="block group h-full"
      aria-label={`Read full blog post: ${post.title}`}
    >
      <article className="flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300">
        {imageUrl ? (
          <div className="relative h-52 overflow-hidden bg-slate-900">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[#0C2D57]/40 transition-opacity duration-300 group-hover:bg-[#0C2D57]/30" />

            <div className="absolute top-4 left-4 z-10">
              {post.category && (
                <span className="inline-block rounded-md bg-[#0C2D57] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {post.category}
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              {isFeatured && (
                <span className="inline-flex items-center rounded-md bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Featured
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 pb-0 bg-slate-50/50">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.category && (
                <span className="inline-block rounded-md bg-[#0C2D57] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {post.category}
                </span>
              )}
              {(post.subCategory || post.subcategory) && (
                <span className="inline-block rounded-md bg-white border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  {post.subCategory || post.subcategory}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 p-6">
          <h2 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[#0C2D57]">
            {post.title}
          </h2>

          {summaryText && (
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
              {summaryText}
            </p>
          )}

          <div className="mt-auto pt-5 flex items-center gap-2 text-xs font-medium text-slate-500">
            {post.author && (
              <span className="text-slate-700 font-semibold">
                {post.author}
              </span>
            )}
            {post.author && post.publishDate && (
              <span className="text-slate-300">•</span>
            )}
            {post.publishDate && (
              <span className="text-slate-400 font-normal">
                {formatDate(post.publishDate)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

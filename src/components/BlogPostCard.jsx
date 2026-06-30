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

// Returns both the badge colors and matching card header backgrounds
const getTopicStyles = (category) => {
  return {
    badge: 'bg-[#0C2D57] text-white',
    headerBg: 'bg-[#0C2D57]/5',
  };
};

export default function BlogPostCard({ post }) {
  const styles = getTopicStyles(post.category);

  const CardContent = () => (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer hover:border-[#0C2D57]/30">
      {/* Top Header Section - Background matches tag color with low opacity */}
      <div
        className={`relative h-60 flex flex-col justify-center px-14 transition-all duration-300 ${styles.headerBg} group-hover:opacity-90`}
      >
        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.category && (
            <span
              className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${styles.badge}`}
            >
              {post.category}
            </span>
          )}

          {post.subcategory && (
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-white/80 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md backdrop-blur-sm">
              {post.subcategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0C2D57] transition-colors duration-200 leading-snug line-clamp-2">
          {post.title}
        </h2>
      </div>

      {/* Bottom Footer Section */}
      <div className="space-y-4 p-6 px-14 border-t border-slate-100 bg-slate-50/40">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-slate-500">
          <span className="text-slate-700 font-semibold">{post.author}</span>
          {post.publishDate && (
            <span className="text-[#0C2D57] font-bold">•</span>
          )}
          {post.publishDate && (
            <span className="text-slate-400 font-normal">
              {formatDate(post.publishDate)}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <Link
      to={`/resources/${encodeURIComponent(post.slug)}`}
      className="block h-full"
      aria-label={`Read full blog post: ${post.title}`}
    >
      <CardContent />
    </Link>
  );
}

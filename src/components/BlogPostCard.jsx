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

export default function BlogPostCard({ post }) {
  const CardContent = () => (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-slate-100 flex items-center ">
        <div className="text-slate-400 px-14">
          <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
        </div>
      </div>

      <div className="space-y-4 p-6 px-14">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
          <span>{post.author}</span>
          {post.publishDate && <span>•</span>}
          {post.publishDate && <span>{formatDate(post.publishDate)}</span>}
        </div>
      </div>
    </article>
  );

  return (
    <Link
      to={`/blog/${encodeURIComponent(post.slug)}`}
      className="block"
      aria-label={`Read full blog post: ${post.title}`}
    >
      <CardContent />
    </Link>
  );
}

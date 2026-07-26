import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

export default function BlogCategories({ categories }) {
  const { t } = useTranslation('main');

  return (
    <div className="mb-16">
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
          {t('blog.browsePracticeArea', 'Browse by Practice Area')}
        </h2>
        <div className="w-12 h-[3px] bg-amber-600 rounded-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              to={`/resources/${category.slug}`}
              className="group flex items-start justify-between rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#0C2D57]/30 hover:-translate-y-0.5"
            >
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-slate-100 text-[#0C2D57] group-hover:bg-[#0C2D57] group-hover:text-white transition-colors duration-200 shrink-0">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0C2D57] transition-colors leading-tight mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-slate-400 group-hover:text-[#0C2D57] group-hover:translate-x-1 transition-all shrink-0 mt-1 ml-2"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

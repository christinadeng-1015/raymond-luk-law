import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  localizedPath,
  unlocalizedPath,
} from '../utils/localizedPath';

export default function SEO({
  title,
  description,
  keywords,
  image = '/assets/banner/default-og.jpg',
  schema,
}) {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const domain = 'https://www.luklaw.ca';

  const defaultTitle = 'Luk & Associates | Law Firm in Markham, ON';
  const defaultDescription =
    'Experienced legal team in Markham specializing in real estate, family law, wills & estates, and corporate law.';
  const defaultKeywords =
    'Markham lawyers, Ontario law firm, legal services Markham';

  const siteTitle = title ? `${title} | Luk & Associates` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;

  const canonicalUrl = `${domain}${pathname}`;
  const languagePath = unlocalizedPath(pathname);
  const alternateUrls = [
    { language: 'en-CA', path: localizedPath(languagePath, 'en') },
    { language: 'zh-CN', path: localizedPath(languagePath, 'zh') },
    { language: 'zh-HK', path: localizedPath(languagePath, 'zh-HK') },
    { language: 'x-default', path: localizedPath(languagePath, 'en') },
  ];
  const htmlLanguage =
    i18n.language === 'zh-HK'
      ? 'zh-Hant-HK'
      : i18n.language?.startsWith('zh')
        ? 'zh-CN'
        : 'en-CA';
  const ogImageUrl = image.startsWith('http')
    ? image
    : `${domain}${image.startsWith('/') ? '' : '/'}${image}`;

  return (
    <Helmet>
      <html lang={htmlLanguage} />

      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      {alternateUrls.map(({ language, path }) => (
        <link
          key={language}
          rel="alternate"
          hrefLang={language}
          href={`${domain}${path}`}
        />
      ))}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

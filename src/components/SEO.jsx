import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({
  title,
  description,
  keywords,
  path = '',
  image = '/assets/banner/default-og.jpg',
  schema,
}) {
  const { i18n } = useTranslation();
  const domain = 'https://www.luklaw.ca';

  const defaultTitle = 'Luk & Associates | Law Firm in Markham, ON';
  const defaultDescription =
    'Experienced legal team in Markham specializing in real estate, family law, wills & estates, and corporate law.';
  const defaultKeywords =
    'Markham lawyers, Ontario law firm, legal services Markham';

  const siteTitle = title ? `${title} | Luk & Associates` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;

  const canonicalUrl = `${domain}${path}`;
  const ogImageUrl = image.startsWith('http')
    ? image
    : `${domain}${image.startsWith('/') ? '' : '/'}${image}`;

  return (
    <Helmet>
      <html lang={i18n.language || 'en'} />

      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

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

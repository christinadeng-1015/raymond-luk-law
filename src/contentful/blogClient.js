import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT || 'master',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

// Generate URL-friendly slug from title with Unicode support
const generateSlug = (title) => {
  if (!title) return 'untitled';

  const normalized = title
    .toString()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  return normalized || 'untitled';
};

const normalizeLocale = (locale) => {
  if (!locale) return undefined;
  if (locale === 'en') return 'en-US';
  if (locale === 'zh') return 'zh';
  return locale;
};

const mapPost = (entry) => {
  const { fields, sys } = entry;

  const computedSlug = generateSlug(fields?.title || 'untitled');
  const post = {
    id: sys.id,
    title: fields?.title || 'Untitled',
    slug: computedSlug || sys.id,
    publishDate: fields?.date || null,
    author: fields?.author || 'Luk & Associates',
    body: fields?.content || null, // Keep raw RichText content
    url: fields?.url || null,
  };

  return post;
};

export async function fetchBlogPosts(language) {
  if (
    !process.env.REACT_APP_CONTENTFUL_SPACE_ID ||
    !process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  ) {
    throw new Error(
      'Contentful environment variables are missing. Please set REACT_APP_CONTENTFUL_SPACE_ID and REACT_APP_CONTENTFUL_ACCESS_TOKEN.'
    );
  }

  try {
    const request = {
      content_type: 'blogPost',
      order: '-fields.date',
      include: 2,
    };

    const locale = normalizeLocale(language);
    if (locale) {
      request.locale = locale;
    }

    const entries = await client.getEntries(request);

    return entries.items.map(mapPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }
}

export async function fetchBlogPostById(entryId, language) {
  if (
    !process.env.REACT_APP_CONTENTFUL_SPACE_ID ||
    !process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  ) {
    throw new Error(
      'Contentful environment variables are missing. Please set REACT_APP_CONTENTFUL_SPACE_ID and REACT_APP_CONTENTFUL_ACCESS_TOKEN.'
    );
  }

  try {
    const locale = normalizeLocale(language);
    const entry = await client.getEntry(entryId, {
      ...(locale ? { locale } : {}),
    });

    return mapPost(entry);
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }
}

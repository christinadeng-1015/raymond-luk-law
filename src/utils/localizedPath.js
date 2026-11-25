export function unlocalizedPath(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;

  return path.replace(/^\/(en|zh|zh-HK)(?=\/|$)/, '') || '/';
}

export function localizedPath(path, language) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;

  const pathWithoutLanguage = unlocalizedPath(path);
  const localizedLanguage = ['zh', 'zh-HK'].includes(language) ? language : 'en';

  if (localizedLanguage === 'en') return pathWithoutLanguage;

  return `/${localizedLanguage}${pathWithoutLanguage === '/' ? '' : pathWithoutLanguage}`;
}

export function localizedPath(path, language) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;

  const pathWithoutLanguage = path.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';
  const localizedLanguage = language?.startsWith('zh') ? 'zh' : 'en';

  return `/${localizedLanguage}${pathWithoutLanguage === '/' ? '' : pathWithoutLanguage}`;
}

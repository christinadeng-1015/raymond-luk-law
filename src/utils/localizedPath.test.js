import { localizedPath, unlocalizedPath } from './localizedPath';

describe('localizedPath', () => {
  it('adds the selected language prefix to internal paths', () => {
    expect(localizedPath('/services', 'zh-HK')).toBe('/zh-HK/services');
    expect(localizedPath('/', 'zh')).toBe('/zh');
  });

  it('removes the previous language prefix when switching languages', () => {
    expect(localizedPath('/zh-HK/contact', 'zh')).toBe('/zh/contact');
    expect(localizedPath('/zh/services', 'en')).toBe('/services');
  });

  it('removes locale prefixes for service route matching', () => {
    expect(unlocalizedPath('/zh-HK/real-estate-law')).toBe('/real-estate-law');
    expect(unlocalizedPath('/zh-HK/other-services')).toBe('/other-services');
    expect(unlocalizedPath('/services')).toBe('/services');
  });

  it('leaves external URLs unchanged', () => {
    expect(localizedPath('https://example.com', 'zh-HK')).toBe(
      'https://example.com'
    );
  });
});

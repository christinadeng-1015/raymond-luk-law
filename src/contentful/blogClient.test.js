jest.mock('contentful', () => ({
  createClient: jest.fn(() => ({ getEntries: jest.fn() })),
}));

import { normalizeLocale } from './blogClient';

describe('normalizeLocale', () => {
  it('uses the configured Chinese Contentful locale for both Chinese site locales', () => {
    expect(normalizeLocale('zh')).toBe('zh');
    expect(normalizeLocale('zh-HK')).toBe('zh');
  });

  it('uses the English Contentful locale for English pages', () => {
    expect(normalizeLocale('en')).toBe('en-US');
  });
});

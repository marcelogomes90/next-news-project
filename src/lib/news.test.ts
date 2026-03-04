import { describe, expect, it } from 'vitest';
import {
  createNewsSearchParams,
  DEFAULT_NEWS_FILTERS,
  formatPublishedDate,
  parseNewsFiltersFromSearchParams,
  resolveNewsImagePath,
  toNewsQueryParams,
} from './news';

describe('news helpers', () => {
  it('returns defaults when search params are empty', () => {
    const filters = parseNewsFiltersFromSearchParams(new URLSearchParams());

    expect(filters).toEqual(DEFAULT_NEWS_FILTERS);
  });

  it('parses valid search params and ignores invalid numeric values', () => {
    const params = new URLSearchParams('busca=ibge&de=2026-01-01&ate=2026-01-31&qtd=abc&page=0');

    const filters = parseNewsFiltersFromSearchParams(params);

    expect(filters).toEqual({
      busca: 'ibge',
      de: '2026-01-01',
      ate: '2026-01-31',
      qtd: 6,
      page: 1,
    });
  });

  it('creates clean URL params by omitting default values', () => {
    const params = createNewsSearchParams({
      ...DEFAULT_NEWS_FILTERS,
      busca: 'censo',
      page: 3,
    });

    expect(params.toString()).toBe('busca=censo&page=3');
  });

  it('transforms filters to API query params', () => {
    const queryParams = toNewsQueryParams({
      busca: 'agro',
      de: '2026-02-10',
      ate: '2026-02-28',
      qtd: 10,
      page: 2,
    });

    expect(queryParams).toEqual({
      busca: 'agro',
      de: '02-10-2026',
      ate: '02-28-2026',
      qtd: 10,
      page: 2,
      introsize: 1500,
    });
  });

  it('resolves image path safely from JSON', () => {
    const valid = resolveNewsImagePath('{"image_intro":"foo.jpg"}', 'image_intro');
    const invalid = resolveNewsImagePath('not-json', 'image_intro');

    expect(valid).toBe('foo.jpg');
    expect(invalid).toBe('');
  });

  it('formats publication date and preserves invalid value', () => {
    expect(formatPublishedDate('2026-03-04T13:15:00')).toBe('04/03/2026 às 13:15');
    expect(formatPublishedDate('invalid-date')).toBe('invalid-date');
  });
});

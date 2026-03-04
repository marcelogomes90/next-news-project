import dayjs from 'dayjs';
import { NewsFilterValues, NewsQueryParams } from '@/interfaces/news';

export const DEFAULT_NEWS_FILTERS: NewsFilterValues = {
  busca: '',
  de: '',
  ate: '',
  qtd: 6,
  page: 1,
};

export function parseNewsFiltersFromSearchParams(searchParams: URLSearchParams): NewsFilterValues {
  const qtdParam = Number(searchParams.get('qtd'));
  const pageParam = Number(searchParams.get('page'));

  return {
    busca: searchParams.get('busca') ?? DEFAULT_NEWS_FILTERS.busca,
    de: searchParams.get('de') ?? DEFAULT_NEWS_FILTERS.de,
    ate: searchParams.get('ate') ?? DEFAULT_NEWS_FILTERS.ate,
    qtd: Number.isFinite(qtdParam) && qtdParam > 0 ? qtdParam : DEFAULT_NEWS_FILTERS.qtd,
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : DEFAULT_NEWS_FILTERS.page,
  };
}

export function createNewsSearchParams(filters: NewsFilterValues): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.busca) params.set('busca', filters.busca);
  if (filters.de) params.set('de', filters.de);
  if (filters.ate) params.set('ate', filters.ate);

  if (filters.qtd !== DEFAULT_NEWS_FILTERS.qtd) {
    params.set('qtd', String(filters.qtd));
  }

  if (filters.page !== DEFAULT_NEWS_FILTERS.page) {
    params.set('page', String(filters.page));
  }

  return params;
}

export function toNewsQueryParams(filters: NewsFilterValues): NewsQueryParams {
  return {
    busca: filters.busca || undefined,
    de: filters.de ? dayjs(filters.de).format('MM-DD-YYYY') : undefined,
    ate: filters.ate ? dayjs(filters.ate).format('MM-DD-YYYY') : undefined,
    qtd: filters.qtd,
    page: filters.page,
    introsize: 1500,
  };
}

export function resolveNewsImagePath(imagesField: string, imageKey: 'image_intro' | 'image_fulltext') {
  if (!imagesField) return '';

  try {
    const parsed = JSON.parse(imagesField) as Record<string, string>;
    return parsed[imageKey] ?? '';
  } catch {
    return '';
  }
}

export function formatPublishedDate(value: string) {
  const date = dayjs(value);
  if (!date.isValid()) return value;
  return date.format('DD/MM/YYYY [às] HH:mm');
}

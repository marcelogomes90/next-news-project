import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NewsQueryParams } from '@/interfaces/news';
import { getNews, getNewsById } from '@/processes/news';

export function newsListQueryKey(params: NewsQueryParams) {
  return ['news', params] as const;
}

export function useNewsList(params: NewsQueryParams) {
  return useQuery({
    queryKey: newsListQueryKey(params),
    queryFn: () => getNews(params),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });
}

export function useNewsDetails(id: number) {
  return useQuery({
    queryKey: ['news-details', id] as const,
    queryFn: () => getNewsById(id),
    enabled: Number.isFinite(id) && id > 0,
    staleTime: 5 * 60_000,
  });
}

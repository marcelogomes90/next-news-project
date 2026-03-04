import axios from 'axios';
import { NewsData, NewsQueryParams, NewsResponse } from '@/interfaces/news';

const newsApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v3',
  timeout: 10000,
});

export async function getNews(params: NewsQueryParams) {
  const { data } = await newsApi.get<NewsResponse>('/noticias', { params });
  return data;
}

export async function getNewsById(id: number) {
  try {
    const { data } = await newsApi.get<NewsData | NewsData[] | NewsResponse>(`/noticias/${id}`);

    if (Array.isArray(data)) {
      return data[0] ?? null;
    }

    if ('items' in data) {
      return data.items[0] ?? null;
    }

    return data;
  } catch {
    return null;
  }
}

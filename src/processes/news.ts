import { NewsResponse } from '@/interfaces/news';
import axios from 'axios';

export const fetchNews = async ({ queryKey }: { queryKey: any[] }) => {
  const [_, params] = queryKey;

  const { data } = await axios.get<NewsResponse>('https://servicodados.ibge.gov.br/api/v3/noticias/', { params });

  return data;
};

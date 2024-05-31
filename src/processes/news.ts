import { NewsResponse } from '@/interfaces/news';
import axios from 'axios';

export const fetchNews = async ({ queryKey }: { queryKey: any[] }) => {
  const [_, params] = queryKey;

  const { data } = await axios.get<NewsResponse>('http://servicodados.ibge.gov.br/api/v3/noticias/', { params });

  setTimeout(() => {}, 3000);

  return data;
};

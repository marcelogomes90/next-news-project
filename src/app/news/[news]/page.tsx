'use client';

import { Button } from '@/components/ui/button';
import { NewsData } from '@/interfaces/news';
import { fetchNews } from '@/processes/news';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import noImage from '../../../assets/images/noimage.png';

interface PageProps {
  params?: { news: string },
  searchParams?: {
    qtd: string,
    page: string,
    busca: string,
    de: string,
    ate: string },
}

export default function NewsDetails({ params, searchParams }: PageProps) {
  const queryClient = useQueryClient();

  const queryKey = ['news', {
    busca: searchParams?.busca,
    de: searchParams?.de,
    ate: searchParams?.ate,
    qtd: searchParams?.qtd,
    page: searchParams?.page,
    introsize: 1500,
  }];

  const { data: newsList } = useQuery({
    queryKey,
    queryFn: fetchNews,
    initialData: () => queryClient.getQueryData(queryKey) as { items: NewsData[] } || undefined,
  });

  const news = useMemo(() => (
    newsList?.items?.find((newsData: NewsData) => newsData.id === parseInt(params?.news || '', 10))
  ), [newsList, params?.news]);

  const image = useMemo(() => news?.imagens && JSON.parse(news?.imagens)?.image_fulltext, [news]);

  return (
    <div className="container my-10">
      <h1 className="text-2xl text-center mb-6 font-semibold">{news?.titulo}</h1>
      <p className="text-sm font-medium">{`Materia publicada em: ${news?.data_publicacao}`}</p>
      <p className="text-sm font-medium">{`Editorial: ${news?.editorias}`}</p>

      <div className="flex justify-center my-6">
        <img
          src={image ? `https://agenciadenoticias.ibge.gov.br/${image}` : noImage.src}
          alt="imagem da matéria"
          width={1024}
          height={768}
          className="rounded-md"
        />
      </div>

      <p>{news?.introducao}</p>

      <Button className="p-0 m-0" variant="link" asChild>
        <a href={news?.link} target="_blank" rel="noreferrer">Acesse a matéria completa clicando aqui</a>
      </Button>
    </div>
  );
}

'use client';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsData } from '@/interfaces/news';
import { fetchNews } from '@/processes/news';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import imageError from '../assets/images/error.png';

export default function Home() {
  const [page, setPage] = useState(10);

  const itemsPerPage = useMemo(() => 10, []);

  const { data, error, isLoading } = useQuery({
    queryFn: fetchNews,
    queryKey: ['news', { qtd: itemsPerPage, page }],
  });

  const onNewsDetailClick = useCallback((item: NewsData) => () => {

  }, []);

  const onNextNewsClick = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const onPreviousNewsClick = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const renderItem = useCallback((item: NewsData, index: number) => {
    const { image_intro } = JSON.parse(item.imagens);

    return (
      <div key={`NEWS_${item.id}`}>
        <div className="mb-8 flex justify-between items-center gap-4">
          <img
            src={`https://agenciadenoticias.ibge.gov.br/${image_intro}`}
            alt="imagem da intro"
            width={250}
            height={150}
            className="rounded-md"
          />
          <div className="flex-col">
            <h2 className="text-xl font-semibold mb-2">{item.titulo}</h2>
            <p>{item.introducao}</p>
            <div className="mt-2 flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">{item.data_publicacao}</span>
              <Button variant="link" onClick={() => onNewsDetailClick(item)}>Ver matéria completa</Button>
            </div>
          </div>
        </div>

        {index < itemsPerPage - 1 && <Separator className="mb-8" />}
      </div>
    );
  }, [itemsPerPage, onNewsDetailClick]);

  const renderSkeleton = useCallback((_: any, index: number) => (
    <div key={`SKELETON_${index}`} className="flex gap-4 mb-8 items-center">
      <Skeleton className="h-32 w-80" />
      <div className="flex-col w-full">
        <Skeleton className="h-6 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4" />
      </div>
    </div>
  ), []);

  if (error) {
    return (
      <div className="container my-10">
        <h1 className="text-2xl text-center mb-6 font-semibold">{String(error)}</h1>
        <img src={imageError.src} alt="Erro" className="mx-auto" width={300} height={300} />
      </div>
    );
  }

  return (
    <main>
      <div className="container my-10">
        <h1 className="text-2xl text-center mb-6 font-semibold">Notícias IBGE</h1>

        {isLoading ? (
          Array.from({ length: 5 }).map(renderSkeleton)
        ) : (
          <div>
            {data?.items.map(renderItem)}
            <div className="flex justify-center gap-4">
              <Button
                disabled={data?.page === 1}
                onClick={onPreviousNewsClick}
              >
                Anterior
              </Button>

              <Button
                disabled={data?.page === data?.totalPages}
                onClick={onNextNewsClick}
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

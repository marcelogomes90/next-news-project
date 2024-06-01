'use client';

import { Separator } from '@/components/ui/separator';
import { NewsData } from '@/interfaces/news';
import { fetchNews } from '@/processes/news';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsFilterForm, pageChanged } from '@/reducers/newsFilterForm';
import NewsSkeleton from './_components/NewsSkeleton';
import ErrorStatus from './_components/ErrorStatus';
import NewsFilterDrawer from './_components/NewsFilterDrawer';

export default function Home() {
  const dispatch = useDispatch();

  const {
    busca, de, ate, qtd, page,
  } = useSelector(getNewsFilterForm);

  const { data, error, isLoading } = useQuery({
    queryFn: fetchNews,
    queryKey: ['news', {
      busca, de, ate, qtd, page,
    }],
  });

  const onNewsDetailClick = useCallback((item: NewsData) => () => {

  }, []);

  const onNextNewsClick = useCallback(() => {
    dispatch(pageChanged({ page: page + 1 }));
    window.scrollTo(0, 0);
  }, [dispatch, page]);

  const onPreviousNewsClick = useCallback(() => {
    dispatch(pageChanged({ page: page - 1 }));
    window.scrollTo(0, 0);
  }, [dispatch, page]);

  const renderSkeleton = useCallback((_: any, index: number) => (
    <NewsSkeleton key={`SKELETON_${index}`} />
  ), []);

  const renderItem = useCallback((item: NewsData, index: number) => {
    const { image_intro } = item.imagens && JSON.parse(item.imagens);

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

        {index < (qtd - 1) && <Separator className="mb-8" />}
      </div>
    );
  }, [qtd, onNewsDetailClick]);

  if (error) {
    return <ErrorStatus />;
  }

  return (
    <main>
      <div className="container my-10">
        <h1 className="text-2xl text-center mb-6 font-semibold">Portal de Notícias IBGE</h1>
        <div className="my-8 flex flex-row justify-end">
          <NewsFilterDrawer />
        </div>

        {isLoading ? (
          Array.from({ length: 5 }).map(renderSkeleton)
        ) : (
          <div>
            {data?.items.map(renderItem)}

            <div className="flex justify-center gap-4">
              <Button disabled={data?.page === 1} onClick={onPreviousNewsClick}>
                Anterior
              </Button>

              <Button disabled={data?.page === data?.totalPages} onClick={onNextNewsClick}>
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

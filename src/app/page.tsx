'use client';

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
import EmptyState from './_components/EmptyState';
import NewsItem from './_components/NewsItem';

export default function Home() {
  const dispatch = useDispatch();

  const {
    busca, de, ate, qtd, page,
  } = useSelector(getNewsFilterForm);

  const {
    data: newsList, error, isLoading,
  } = useQuery({
    queryFn: fetchNews,
    queryKey: ['news', {
      busca, de, ate, qtd, page, introsize: 1500,
    }],
  });

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

  const renderEmptyState = useCallback(() => (
    <EmptyState />
  ), []);

  const renderItem = useCallback((item: NewsData, index: number) => (
    <div key={`ITEM_${item.id}`}>
      <NewsItem item={item} index={index} ate={ate} busca={busca} de={de} page={page} qtd={qtd} />
    </div>
  ), [ate, busca, de, page, qtd]);

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
            {newsList?.items.length ? newsList?.items.map(renderItem) : renderEmptyState()}

            <div className="flex justify-center gap-4">
              <Button disabled={newsList?.page === 1} onClick={onPreviousNewsClick}>
                Anterior
              </Button>

              <Button disabled={newsList?.page === newsList?.totalPages} onClick={onNextNewsClick}>
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

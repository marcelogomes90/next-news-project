'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useNewsList } from '@/hooks/useNews';
import { NewsFilterValues } from '@/interfaces/news';
import {
  createNewsSearchParams,
  DEFAULT_NEWS_FILTERS,
  parseNewsFiltersFromSearchParams,
  toNewsQueryParams,
} from '@/lib/news';
import EmptyState from '../EmptyState';
import ErrorStatus from '../ErrorStatus';
import NewsFilterDrawer from '../NewsFilterDrawer';
import NewsHeader from '../NewsHeader';
import NewsItem from '../NewsItem';
import NewsSkeleton from '../NewsSkeleton';

export default function HomePageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseNewsFiltersFromSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const {
    data,
    error,
    isPending,
    isFetching,
  } = useNewsList(toNewsQueryParams(filters));

  const updateUrlWithFilters = (nextFilters: NewsFilterValues) => {
    const params = createNewsSearchParams(nextFilters);
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleApplyFilters = (values: NewsFilterValues) => {
    updateUrlWithFilters(values);
  };

  const handleClearFilters = () => {
    updateUrlWithFilters(DEFAULT_NEWS_FILTERS);
  };

  const handleNextPage = () => {
    if (!data || data.page >= data.totalPages) return;
    updateUrlWithFilters({ ...filters, page: filters.page + 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (!data || data.page <= 1) return;
    updateUrlWithFilters({ ...filters, page: filters.page - 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-page-gradient pb-16">
      <div className="container pt-8 md:pt-12">
        <NewsHeader />

        <div className="mb-6 flex justify-end">
          <NewsFilterDrawer
            filters={filters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {error && <ErrorStatus />}

        {!error && isPending && Array.from({ length: 5 }, (_, index) => (
          <NewsSkeleton key={`skeleton-${index + 1}`} />
        ))}

        {!error && !isPending && !data?.items.length && <EmptyState />}

        {!error && !isPending && !!data?.items.length && (
          <section>
            {data.items.map((item) => (
              <NewsItem key={item.id} item={item} filters={filters} />
            ))}

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button disabled={data.page <= 1 || isFetching} variant="outline" onClick={handlePreviousPage}>
                Anterior
              </Button>

              <span className="rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                {`Pagina ${data.page} de ${data.totalPages}`}
              </span>

              <Button
                disabled={data.page >= data.totalPages || isFetching}
                onClick={handleNextPage}
              >
                Proxima
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import noImage from '@/assets/images/noimage.png';
import { Button } from '@/components/ui/button';
import ErrorStatus from '@/app/_components/ErrorStatus';
import NewsSkeleton from '@/app/_components/NewsSkeleton';
import { useNewsDetails, useNewsList } from '@/hooks/useNews';
import {
  formatPublishedDate,
  parseNewsFiltersFromSearchParams,
  resolveNewsImagePath,
  toNewsQueryParams,
} from '@/lib/news';

export default function NewsDetailsPage() {
  const params = useParams<{ news: string }>();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseNewsFiltersFromSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const newsId = Number(params.news);

  const { data: listData } = useNewsList(toNewsQueryParams(filters));
  const { data: detailsData, isPending, error } = useNewsDetails(newsId);

  const news = useMemo(() => {
    if (detailsData) return detailsData;
    return listData?.items.find((item) => item.id === newsId) ?? null;
  }, [detailsData, listData?.items, newsId]);

  const imagePath = resolveNewsImagePath(news?.imagens ?? '', 'image_fulltext');

  if (error) {
    return (
      <main className="min-h-screen bg-page-gradient pb-16">
        <div className="container pt-8 md:pt-12">
          <ErrorStatus />
        </div>
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="min-h-screen bg-page-gradient pb-16">
        <div className="container pt-8 md:pt-12">
          <NewsSkeleton />
        </div>
      </main>
    );
  }

  if (!news) {
    return (
      <main className="min-h-screen bg-page-gradient pb-16">
        <div className="container pt-8 md:pt-12">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-semibold">Materia nao encontrada</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A noticia solicitada nao esta mais disponivel.
            </p>
            <Link href="/" className="mt-4 inline-block">
              <Button variant="outline">Voltar para lista</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page-gradient pb-16">
      <div className="container pt-8 md:pt-12">
        <article className="rounded-2xl border border-border/70 bg-card/85 p-5 shadow-sm md:p-8">
          <Link href={`/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}>
            <Button variant="outline" size="sm">Voltar</Button>
          </Link>

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-primary">{news.editorias}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{news.titulo}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {`Publicado em ${formatPublishedDate(news.data_publicacao)}`}
          </p>

          <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
            <Image
              src={imagePath ? `https://agenciadenoticias.ibge.gov.br/${imagePath}` : noImage}
              alt={news.titulo}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <p className="text-base leading-7 text-foreground/90">{news.introducao}</p>

          <Button className="mt-5 p-0" variant="link" asChild>
            <a href={news.link} target="_blank" rel="noreferrer">Acessar materia completa no portal do IBGE</a>
          </Button>
        </article>
      </div>
    </main>
  );
}

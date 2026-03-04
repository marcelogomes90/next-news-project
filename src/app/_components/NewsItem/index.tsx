import Image from 'next/image';
import Link from 'next/link';
import noImage from '@/assets/images/noimage.png';
import { Button } from '@/components/ui/button';
import { NewsData, NewsFilterValues } from '@/interfaces/news';
import { createNewsSearchParams, formatPublishedDate, resolveNewsImagePath } from '@/lib/news';

interface NewsItemProps {
  item: NewsData;
  filters: NewsFilterValues;
}

export default function NewsItem({ item, filters }: NewsItemProps) {
  const imagePath = resolveNewsImagePath(item.imagens, 'image_intro');
  const search = createNewsSearchParams(filters).toString();

  return (
    <article className="mb-5 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <Image
          src={imagePath ? `https://agenciadenoticias.ibge.gov.br/${imagePath}` : noImage}
          alt={item.titulo}
          width={260}
          height={146}
          className="h-44 w-full rounded-xl object-cover md:h-32 md:w-56"
        />

        <div className="flex-1">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">{item.editorias}</p>
          <h2 className="text-xl font-semibold leading-tight text-foreground">{item.titulo}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.introducao}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            {`Publicado em ${formatPublishedDate(item.data_publicacao)}`}
          </p>

          <Link href={`/news/${item.id}${search ? `?${search}` : ''}`}>
            <Button className="mt-3 p-0" variant="link">Ver detalhes da materia</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

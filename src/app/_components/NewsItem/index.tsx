import Link from 'next/link';
import noImage from '@/assets/images/noimage.png';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useMemo } from 'react';
import { NewsData } from '@/interfaces/news';

export default function NewsItem({
  item, index, busca, de, ate, qtd, page,
}: {
  item: NewsData;
  index: number;
  busca: string | undefined;
  de: string | undefined;
  ate: string | undefined;
  qtd: number,
  page: number,
}) {
  const image = useMemo(() => item?.imagens && JSON.parse(item?.imagens)?.image_intro, [item]);
  const urlParams = new URLSearchParams();
  const params = {
    busca, de, ate, qtd, page,
  };

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      urlParams.append(key, value.toString());
    }
  });

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <img
          src={image ? `https://agenciadenoticias.ibge.gov.br/${image}` : noImage.src}
          alt="imagem da intro"
          width={200}
          height={120}
          className="rounded-md"
        />

        <div className="flex-col">
          <h2 className="text-xl font-semibold mb-2">{item.titulo}</h2>

          <Link href={`/news/${item?.id}/?${urlParams}`}>
            <Button className="p-0 m-0" variant="link">Ver detalhes da matéria</Button>
          </Link>
        </div>
      </div>

      {index < (qtd - 1) && <Separator className="mb-8" />}
    </>
  );
}

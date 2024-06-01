import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import { MixerVerticalIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NEWS_FILTER_FORM_SCHEMA, NewsFilterForm } from '@/constants/schemas';
import { useDispatch } from 'react-redux';
import { filterFormChanged } from '@/reducers/newsFilterForm';
import { useCallback, useEffect, useRef } from 'react';

export default function NewsFilterDrawer() {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<NewsFilterForm>({
    resolver: zodResolver(NEWS_FILTER_FORM_SCHEMA),
  });

  const onSubmit = (data: NewsFilterForm) => {
    const filterData = {
      busca: data.busca || undefined,
      de: data.de || undefined,
      ate: data.ate || undefined,
      qtd: data.qtd || 5,
      page: 1,
    };

    dispatch(filterFormChanged(filterData));
  };

  const onClearFiltersClick = useCallback(() => {
    dispatch(filterFormChanged({
      busca: null,
      de: null,
      ate: null,
      qtd: 5,
      page: 1,
    }));

    formRef.current?.reset();
  }, [dispatch]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filtrar notícias
          <MixerVerticalIcon className="ml-2 h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader className="mb-4">
          <SheetTitle>Filtrar Notícias</SheetTitle>

          <SheetDescription>
            Selecione os filtros que deseja e clique em filtrar para realizar a busca.
          </SheetDescription>
        </SheetHeader>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Label>Termo</Label>
            <Input className="mt-1" {...register('busca')} />
            {errors.busca && <span className="text-xs text-red-500">{errors.busca.message}</span>}
          </div>

          <div className="mb-3">
            <Label>Data Inicial</Label>
            <Input className="mt-1" type="date" {...register('de')} />
            {errors.de && <span className="text-xs text-red-500">{errors.de.message}</span>}
          </div>

          <div className="mb-3">
            <Label>Data Final</Label>
            <Input className="mt-1" type="date" {...register('ate')} />
            {errors.ate && <span className="text-xs text-red-500">{errors.ate.message}</span>}
          </div>

          <div className="mb-3">
            <Label>Quantidade de itens por página</Label>
            <Input type="number" className="mt-1" {...register('qtd')} />
            {errors.qtd && <span className="text-xs text-red-500">{errors.qtd.message}</span>}
          </div>

          <div className="flex flex-row justify-end mt-10 gap-2">
            <Button type="button" variant="outline" onClick={onClearFiltersClick}>Limpar Filtros</Button>
            <Button type="submit">Filtrar</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

'use client';

import { useEffect } from 'react';
import { MixerVerticalIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NEWS_FILTER_FORM_SCHEMA, NewsFilterForm } from '@/constants/schemas';
import { NewsFilterValues } from '@/interfaces/news';

interface NewsFilterDrawerProps {
  filters: NewsFilterValues;
  onApplyFilters: (values: NewsFilterValues) => void;
  onClearFilters: () => void;
}

export default function NewsFilterDrawer({
  filters,
  onApplyFilters,
  onClearFilters,
}: NewsFilterDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsFilterForm>({
    mode: 'onChange',
    resolver: zodResolver(NEWS_FILTER_FORM_SCHEMA),
    defaultValues: filters,
  });

  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const onSubmit = (data: NewsFilterForm) => {
    onApplyFilters({
      busca: data.busca ?? '',
      de: data.de ?? '',
      ate: data.ate ?? '',
      qtd: data.qtd ?? 6,
      page: 1,
    });
  };

  const onClearClick = () => {
    reset({
      busca: '',
      de: '',
      ate: '',
      qtd: 6,
    });
    onClearFilters();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filtrar noticias
          <MixerVerticalIcon className="ml-2 h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[92vw] sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle>Filtrar noticias</SheetTitle>
          <SheetDescription>Defina termo, periodo e quantidade por pagina.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="busca">Termo</Label>
            <Input id="busca" className="mt-1" placeholder="Ex.: censo" {...register('busca')} />
            {errors.busca && <span className="text-xs text-destructive">{errors.busca.message}</span>}
          </div>

          <div>
            <Label htmlFor="de">Data inicial</Label>
            <Input id="de" type="date" onKeyDown={(e) => e.preventDefault()} className="mt-1" {...register('de')} />
            {errors.de && <span className="text-xs text-destructive">{errors.de.message}</span>}
          </div>

          <div>
            <Label htmlFor="ate">Data final</Label>
            <Input id="ate" type="date" onKeyDown={(e) => e.preventDefault()} className="mt-1" {...register('ate')} />
            {errors.ate && <span className="text-xs text-destructive">{errors.ate.message}</span>}
          </div>

          <div>
            <Label htmlFor="qtd">Itens por pagina</Label>
            <Input id="qtd" type="number" min={1} max={50} className="mt-1" {...register('qtd')} />
            {errors.qtd && <span className="text-xs text-destructive">{errors.qtd.message}</span>}
          </div>

          <div className="mt-8 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClearClick}>Limpar</Button>
            <SheetClose asChild>
              <Button type="submit">Aplicar filtros</Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

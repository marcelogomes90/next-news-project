import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import { MixerVerticalIcon } from '@radix-ui/react-icons';

export default function NewsFilterDrawer() {
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

        <Label>Termo</Label>
        <Input className="mb-3 mt-1" />

        <Label>Data Inicial</Label>
        <Input className="mb-3 mt-1" type="date" />

        <Label>Data Final</Label>
        <Input className="mb-3 mt-1" type="date" />

        <Label>Tipo</Label>
        <Select>
          <SelectTrigger className="mb-3 mt-1">
            <SelectValue placeholder="Selecione um tipo" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="noticia">Notícia</SelectItem>
            <SelectItem value="release">Release</SelectItem>
          </SelectContent>
        </Select>

        <Label>Quantidade de itens por página</Label>
        <Input type="number" className="mb-3 mt-3" />

        <div className="flex flex-row justify-end mt-10">
          <Button>Filtrar</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

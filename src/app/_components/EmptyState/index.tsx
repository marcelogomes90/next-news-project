import Image from 'next/image';
import emptyState from '../../../assets/images/emptystate.png';

export default function EmptyState() {
  return (
    <div className="my-12 rounded-2xl border border-dashed border-border bg-card/70 px-6 py-10 text-center">
      <Image
        src={emptyState}
        width={260}
        height={260}
        alt="Nenhuma noticia encontrada"
        className="mx-auto"
      />
      <h2 className="mt-3 text-xl font-semibold text-foreground">Nenhuma noticia encontrada</h2>
      <p className="mt-1 text-sm text-muted-foreground">Ajuste os filtros para ampliar a busca.</p>
    </div>
  );
}

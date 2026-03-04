export default function NewsHeader() {
  return (
    <header className="mb-8 rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Agencia IBGE</p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Portal de Noticias</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
        Acompanhe publicacoes oficiais com filtros por periodo, termo e paginacao.
      </p>
    </header>
  );
}

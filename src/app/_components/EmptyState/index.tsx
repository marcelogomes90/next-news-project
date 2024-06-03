import emptyState from '../../../assets/images/emptystate.png';

export default function EmptyState() {
  return (
    <div className="m-10 flex flex-col items-center gap-4">
      <img
        src={emptyState.src}
        width={300}
        height={300}
        alt="emtpy state"
      />
      <h1 className="text-xl font-semibold text-center">Nenhuma notícia encontrada</h1>
    </div>
  );
}

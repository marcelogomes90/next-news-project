import Image from 'next/image';
import imageError from '../../../assets/images/error.png';

export default function ErrorStatus() {
  return (
    <div className="my-10 rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center">
      <h2 className="text-2xl font-semibold text-destructive">Erro ao buscar noticias</h2>
      <p className="mt-2 text-sm text-muted-foreground">Tente novamente em alguns instantes.</p>
      <Image src={imageError} alt="Erro" className="mx-auto mt-5" width={250} height={250} />
    </div>
  );
}

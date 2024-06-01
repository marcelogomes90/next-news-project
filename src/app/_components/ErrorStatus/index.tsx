import imageError from '../../../assets/images/error.png';

export default function ErrorStatus() {
  return (
    <div className="h-[100vh] flex flex-col justify-center">
      <h1 className="text-2xl text-center font-semibold">Erro ao realizar busca, tente novamente!</h1>
      <img src={imageError.src} alt="Erro" className="mx-auto" width={300} height={300} />
    </div>
  );
}

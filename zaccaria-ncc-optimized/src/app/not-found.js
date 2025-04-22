import Link from 'next/link';

export const metadata = {
  title: 'Pagina non trovata | Zaccaria NCC',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 chrome-text-enhanced">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pagina non trovata
        </h2>
        <p className="text-silver-metallic mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link href="/" className="metal-button-outline inline-block">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
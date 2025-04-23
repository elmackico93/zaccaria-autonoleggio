'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 chrome-text-enhanced">
          Qualcosa è andato storto
        </h1>
        <p className="text-silver-metallic mb-8 max-w-md mx-auto">
          Ci scusiamo per l'inconveniente. Si è verificato un errore durante il caricamento della pagina.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="metal-button"
          >
            Riprova
          </button>
          <Link href="/" className="metal-button-outline">
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}
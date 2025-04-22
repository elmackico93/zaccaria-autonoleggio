'use client'

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter loading time for better perceived performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="loading-bar mb-4"></div>
        <p className="text-sm tracking-widest uppercase chrome-text-enhanced">ZACCARIA NCC</p>
      </div>
    </div>
  );
}

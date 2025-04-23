'use client'

import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15; // Random progress increment for natural feel
      });
    }, 100);

    // Shorter loading time for better perceived performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          {/* Use the Logo component with larger size for loading screen */}
          <Logo height={80} priority={true} />
        </div>
        <div className="loading-bar-container relative w-48 h-1 bg-charcoal mb-4 overflow-hidden">
          <div 
            className="loading-bar-progress absolute top-0 left-0 h-full bg-silver-metallic transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm tracking-widest uppercase chrome-text-enhanced">ZACCARIA NCC</p>
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          background: var(--black);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
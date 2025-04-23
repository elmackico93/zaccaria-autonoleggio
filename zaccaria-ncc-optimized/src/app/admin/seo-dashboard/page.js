'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KeywordDashboard from '@/components/admin/KeywordDashboard';

export default function SEODashboardPage() {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      // In una vera implementazione, questa sarebbe una verifica di autenticazione
      // Per questa demo, controlliamo solo la presenza di un parametro auth
      const isAuthorized = true; // Simulazione autorizzazione
      
      if (!isAuthorized) {
        router.push('/');
        return;
      }
      
      try {
        const response = await fetch('/api/seo/performance');
        if (!response.ok) {
          throw new Error('Failed to fetch SEO data');
        }
        
        const data = await response.json();
        setSeoData(data.data || {});
      } catch (err) {
        console.error('Error fetching SEO data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loading-bar w-64"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="p-8 bg-gunmetal rounded-lg max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Errore</h1>
          <p className="text-silver-metallic">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-6 metal-button-outline"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 chrome-text-enhanced">
          Dashboard SEO
        </h1>
        
        {seoData && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-charcoal p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">Core Web Vitals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-silver-metallic">LCP</span>
                    <span className={`font-medium ${seoData.core_web_vitals.lcp < 2.5 ? 'text-green-500' : seoData.core_web_vitals.lcp < 4 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {seoData.core_web_vitals.lcp}s
                    </span>
                  </div>
                  <div className="w-full bg-gunmetal rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${seoData.core_web_vitals.lcp < 2.5 ? 'bg-green-500' : seoData.core_web_vitals.lcp < 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, (seoData.core_web_vitals.lcp / 4) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-silver-metallic">FID</span>
                    <span className={`font-medium ${seoData.core_web_vitals.fid < 100 ? 'text-green-500' : seoData.core_web_vitals.fid < 300 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {seoData.core_web_vitals.fid}ms
                    </span>
                  </div>
                  <div className="w-full bg-gunmetal rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${seoData.core_web_vitals.fid < 100 ? 'bg-green-500' : seoData.core_web_vitals.fid < 300 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, (seoData.core_web_vitals.fid / 300) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-silver-metallic">CLS</span>
                    <span className={`font-medium ${seoData.core_web_vitals.cls < 0.1 ? 'text-green-500' : seoData.core_web_vitals.cls < 0.25 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {seoData.core_web_vitals.cls}
                    </span>
                  </div>
                  <div className="w-full bg-gunmetal rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${seoData.core_web_vitals.cls < 0.1 ? 'bg-green-500' : seoData.core_web_vitals.cls < 0.25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, (seoData.core_web_vitals.cls / 0.25) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-charcoal p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">Metriche di Engagement</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gunmetal flex items-center justify-center text-silver-metallic mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-silver-metallic text-sm">Tempo medio sul sito</p>
                    <p className="text-xl font-semibold">{Math.floor(seoData.engagement.avg_time_on_site / 60)}m {seoData.engagement.avg_time_on_site % 60}s</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gunmetal flex items-center justify-center text-silver-metallic mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-silver-metallic text-sm">Bounce Rate</p>
                    <p className="text-xl font-semibold">{seoData.engagement.bounce_rate}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gunmetal flex items-center justify-center text-silver-metallic mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-silver-metallic text-sm">Pagine per sessione</p>
                    <p className="text-xl font-semibold">{seoData.engagement.pages_per_session}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-charcoal p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">Metriche SEO</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gunmetal flex items-center justify-center text-silver-metallic mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-silver-metallic text-sm">CTR Organico</p>
                    <p className="text-xl font-semibold">{seoData.seo_metrics.organic_ctr}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gunmetal flex items-center justify-center text-silver-metallic mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-silver-metallic text-sm">Posizione media</p>
                    <p className="text-xl font-semibold">{seoData.seo_metrics.avg_position}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gunmetal flex items-center justify-center text-silver-metallic mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-silver-metallic text-sm">Pagine indicizzate</p>
                    <p className="text-xl font-semibold">{seoData.seo_metrics.indexed_pages}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Pagine Top Performance</h2>
          
          <div className="bg-charcoal p-6 rounded overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-silver">
                  <th className="text-left py-3 px-4 text-silver-metallic">URL</th>
                  <th className="text-center py-3 px-4 text-silver-metallic">Sessioni</th>
                  <th className="text-center py-3 px-4 text-silver-metallic">Tasso di Conversione</th>
                </tr>
              </thead>
              <tbody>
                {seoData && seoData.top_pages.map((page, index) => (
                  <tr key={index} className="border-b border-dark-silver hover:bg-gunmetal transition-colors">
                    <td className="py-3 px-4 text-white">{page.url}</td>
                    <td className="py-3 px-4 text-center text-white">{page.sessions}</td>
                    <td className="py-3 px-4 text-center text-white">{page.conversion_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Analytics Keywords</h2>
          <KeywordDashboard />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-silver-metallic mb-6">
            Dashboard aggiornata: {new Date().toLocaleString('it-IT')}
          </p>
          <button 
            onClick={() => router.push('/')}
            className="metal-button-outline"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  );
}

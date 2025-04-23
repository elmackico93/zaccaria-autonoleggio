'use client';

import { useState, useEffect } from 'react';

export default function KeywordDashboard() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch('/api/seo/keywords');
        if (!response.ok) {
          throw new Error('Failed to fetch keyword data');
        }
        
        const data = await response.json();
        setKeywords(data.data || []);
      } catch (err) {
        console.error('Error fetching keywords:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchKeywords();
  }, []);
  
  if (loading) {
    return (
      <div className="p-6 bg-charcoal rounded">
        <div className="loading-bar mb-4"></div>
        <p className="text-center text-silver-metallic">Caricamento statistiche keywords...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 bg-gunmetal rounded">
        <h3 className="text-xl font-semibold mb-2 text-red-500">Errore</h3>
        <p className="text-silver-metallic">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-charcoal p-6 rounded">
      <h2 className="text-2xl font-bold mb-6 chrome-text-enhanced">Dashboard Keywords</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-silver">
              <th className="text-left py-3 px-4 text-silver-metallic">Keyword</th>
              <th className="text-center py-3 px-4 text-silver-metallic">Ricerche</th>
              <th className="text-center py-3 px-4 text-silver-metallic">Tasso di Conversione</th>
              <th className="text-center py-3 px-4 text-silver-metallic">Tempo medio</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((item, index) => (
              <tr key={index} className="border-b border-dark-silver hover:bg-gunmetal transition-colors">
                <td className="py-3 px-4 text-white">{item.keyword}</td>
                <td className="py-3 px-4 text-center text-white">{item.count}</td>
                <td className="py-3 px-4 text-center text-white">{item.conversion_rate}%</td>
                <td className="py-3 px-4 text-center text-white">{Math.floor(item.avg_time_on_site / 60)}m {item.avg_time_on_site % 60}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-silver-metallic">
          Questi dati rappresentano le keyword organiche utilizzate per trovare il sito. 
          Utilizza questi dati per ottimizzare i contenuti e la strategia SEO.
        </p>
      </div>
    </div>
  );
}

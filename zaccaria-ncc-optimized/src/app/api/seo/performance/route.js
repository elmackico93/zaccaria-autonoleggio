import { NextResponse } from 'next/server';

/**
 * API per il monitoraggio delle metriche SEO
 * Registra dati come:
 * - Core Web Vitals
 * - Engagement utente
 * - CTR e conversioni
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Qui l'implementazione reale salverebbe i dati in un database
    // o li invierebbe a un servizio di analytics esterno
    console.log('[SEO Performance]', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Metrics logged successfully' 
    });
  } catch (error) {
    console.error('Error logging SEO metrics:', error);
    return NextResponse.json(
      { error: 'Failed to log metrics' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // In un ambiente reale, questa richiesta richiederebbe autenticazione
  try {
    // Dati di esempio - in produzione sarebbero recuperati da un database
    const seoPerformance = {
      core_web_vitals: {
        lcp: 1.8, // Largest Contentful Paint (secondi)
        fid: 32,  // First Input Delay (millisecondi)
        cls: 0.05 // Cumulative Layout Shift
      },
      engagement: {
        avg_time_on_site: 195, // secondi
        bounce_rate: 31.4,     // percentuale
        pages_per_session: 2.7
      },
      seo_metrics: {
        organic_ctr: 8.3,      // percentuale
        avg_position: 4.2,     // posizione media in SERP
        indexed_pages: 42      // numero di pagine indicizzate
      },
      top_pages: [
        {
          url: '/services/transfer-aeroporto-brindisi',
          sessions: 382,
          conversion_rate: 5.7
        },
        {
          url: '/tour/enogastronomico-puglia',
          sessions: 245,
          conversion_rate: 4.2
        },
        {
          url: '/fleet',
          sessions: 198,
          conversion_rate: 3.1
        }
      ]
    };
    
    return NextResponse.json({ 
      success: true, 
      data: seoPerformance 
    });
  } catch (error) {
    console.error('Error fetching SEO performance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO performance data' },
      { status: 500 }
    );
  }
}

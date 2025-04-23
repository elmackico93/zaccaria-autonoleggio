import { NextResponse } from 'next/server';

/**
 * API endpoint per monitoraggio keyword
 * Questo endpoint registra le keyword utilizzate per trovare il sito
 * e fornisce dati di performance SEO
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Elaborazione della keyword e salvataggio (in una vera implementazione, 
    // qui si integrerebbe con un database o servizio esterno)
    const { keyword, referrer, page, timestamp } = body;
    
    console.log(`[SEO Tracking] Keyword: ${keyword}, Page: ${page}, Referrer: ${referrer}`);
    
    // Qui integreresti con un database o servizio esterno
    // Es: await database.keywords.insert({ keyword, referrer, page, timestamp });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Keyword logged successfully' 
    });
  } catch (error) {
    console.error('Error logging keyword:', error);
    return NextResponse.json(
      { error: 'Failed to log keyword' },
      { status: 500 }
    );
  }
}

/**
 * API endpoint per recuperare statistiche sulle keyword
 * In un ambiente di produzione questo richiederebbe autenticazione
 */
export async function GET(request) {
  try {
    // Qui recupereresti i dati dal tuo database o servizio esterno
    // In questo esempio, restituiamo dati statici di esempio
    const keywordStats = [
      {
        keyword: 'noleggio con conducente Ostuni',
        count: 145,
        conversion_rate: 3.2,
        avg_time_on_site: 210 // secondi
      },
      {
        keyword: 'transfer aeroporto Brindisi',
        count: 289,
        conversion_rate: 4.8,
        avg_time_on_site: 180
      },
      {
        keyword: 'NCC Ostuni',
        count: 98,
        conversion_rate: 2.9,
        avg_time_on_site: 150
      },
      {
        keyword: 'noleggio con conducente matrimoni Ostuni',
        count: 76,
        conversion_rate: 5.7,
        avg_time_on_site: 320
      }
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: keywordStats 
    });
  } catch (error) {
    console.error('Error fetching keyword stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keyword stats' },
      { status: 500 }
    );
  }
}

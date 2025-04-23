import { NextResponse } from 'next/server';

/**
 * API route handler per la raccolta di metriche Core Web Vitals
 * Questa API riceve e registra le metriche Web Vitals inviate dal client
 * 
 * @route POST /api/vitals
 * @returns {object} - Confirmation of receipt
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Log dei dati delle metriche (in produzione, salvarli in un database)
    console.log('[Web Vitals]', body);
    
    // Qui potresti inviare i dati a un servizio di analytics o database
    // In questa implementazione demo, li logghiamo semplicemente
    
    return NextResponse.json({ 
      success: true,
      message: 'Web Vitals metrics received'
    });
  } catch (error) {
    console.error('Error processing Web Vitals metrics:', error);
    return NextResponse.json(
      { error: 'Failed to process Web Vitals metrics' },
      { status: 500 }
    );
  }
}

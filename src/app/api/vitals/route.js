import { NextResponse } from 'next/server';

/**
 * Simple API endpoint to collect web vitals data
 * This prevents 404 errors when the WebVitals component sends data
 */
export async function POST(request) {
  try {
    // Parse the vitals data
    const vitalsData = await request.json();
    
    // In production, you might want to store this data somewhere
    // For now, we'll just log it in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', vitalsData);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing vitals data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

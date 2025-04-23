import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * API route handler for generating image placeholders on-demand
 * 
 * This endpoint generates low-resolution placeholder images for progressive loading
 * It takes the image path as input and returns a base64-encoded blur placeholder
 * 
 * @route GET /api/generate-placeholder
 * @query {string} path - Path to the original image
 * @returns {object} - JSON with base64 placeholder or error message
 */
export async function GET(request) {
  try {
    // Get the image path from the URL
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Image path is required' },
        { status: 400 }
      );
    }
    
    // Security: Ensure the path doesn't try to access files outside the public directory
    const normalizedPath = path.normalize(imagePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(process.cwd(), 'public', normalizedPath);
    
    // Check if the file exists
    try {
      await fs.access(fullPath);
    } catch (error) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    // Generate a tiny placeholder using Sharp
    const buffer = await fs.readFile(fullPath);
    const placeholder = await sharp(buffer)
      .resize(10) // Tiny size for placeholder
      .blur(5)
      .toBuffer();
    
    // Convert to base64
    const base64Placeholder = `data:image/png;base64,${placeholder.toString('base64')}`;
    
    // Return the placeholder
    return NextResponse.json({ 
      placeholder: base64Placeholder,
      originalPath: imagePath
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    return NextResponse.json(
      { error: 'Failed to generate placeholder' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve an image as a webp for optimization
export async function POST(request) {
  try {
    const { imagePath, width, quality = 80, format = 'webp' } = await request.json();
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Image path is required' },
        { status: 400 }
      );
    }
    
    // Security: Ensure the path doesn't try to access files outside the public directory
    const normalizedPath = path.normalize(imagePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(process.cwd(), 'public', normalizedPath);
    
    // Check if the file exists
    try {
      await fs.access(fullPath);
    } catch (error) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    // Process the image with Sharp
    const buffer = await fs.readFile(fullPath);
    let sharpInstance = sharp(buffer);
    
    // Apply transformations
    if (width) {
      sharpInstance = sharpInstance.resize(width);
    }
    
    // Convert to the requested format
    if (format === 'webp') {
      sharpInstance = sharpInstance.webp({ quality });
    } else if (format === 'avif') {
      sharpInstance = sharpInstance.avif({ quality });
    } else if (format === 'jpg' || format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality });
    } else if (format === 'png') {
      sharpInstance = sharpInstance.png({ quality });
    }
    
    // Get the optimized image
    const optimizedImage = await sharpInstance.toBuffer();
    
    // Return the optimized image with appropriate content type
    return new NextResponse(optimizedImage, {
      headers: {
        'Content-Type': `image/${format === 'jpg' ? 'jpeg' : format}`,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Error optimizing image:', error);
    return NextResponse.json(
      { error: 'Failed to optimize image' },
      { status: 500 }
    );
  }
}
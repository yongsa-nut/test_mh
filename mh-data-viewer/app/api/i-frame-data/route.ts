import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { IFrameData } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'frame';
    
    const fileName = type === 'second' 
      ? 'MHWilds Ver 1.0 KenXtinct - i-frame table (second).csv'
      : 'MHWilds Ver 1.0 KenXtinct - i-frame table (frame).csv';
    
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const results = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true
    });
    
    const iframeData = results.data.filter((row: any) => row['Weapon']).map((row: any) => {
      let action = row['(I-frame based on 60fps)'] || row['I-frame แปลงเป็นวินาที'] || '';
      
      // For the first row, it might be empty as the weapon acts as a header
      if (!action && results.data.length > 0) {
        action = "กลิ้งปกติ"; // Default action
      }
      
      return {
        weapon: row['Weapon'] || '',
        action,
        base: parseFloat(row['Base']) || 0,
        evadeWindow1: parseFloat(row['Evade Window+1']) || 0,
        evadeWindow2: parseFloat(row['Evade Window+2']) || 0,
        evadeWindow3: parseFloat(row['Evade Window+3']) || 0,
        evadeWindow4: parseFloat(row['Evade Window+4']) || 0,
        evadeWindow5: parseFloat(row['Evade Window+5']) || 0
      };
    });
    
    return NextResponse.json(iframeData);
  } catch (error) {
    console.error('Error loading i-frame data:', error);
    return NextResponse.json({ error: 'Failed to load i-frame data' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { SetSkill } from '@/lib/types';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'MHWilds Ver 1.0 KenXtinct - สกิลชุดเซ็ท.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const results = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true
    });
    
    const setSkills = results.data.filter((row: any) => row['ชื่อชุด Set']).map((row: any) => {
      return {
        setName: row['ชื่อชุด Set'],
        type: row['ประเภท'],
        skillName: row['ชื่อสกิล'],
        requiredPieces: parseInt(row['จำนวนชิ้นที่ใส่']) || 0,
        effectLevel1: row['Effect ระดับ 1'] || '',
        effectLevel2: row['Effect ระดับ 2'] || ''
      };
    });
    
    return NextResponse.json(setSkills);
  } catch (error) {
    console.error('Error loading set skills:', error);
    return NextResponse.json({ error: 'Failed to load set skills data' }, { status: 500 });
  }
} 
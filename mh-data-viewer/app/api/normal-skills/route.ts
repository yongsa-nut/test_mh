import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { NormalSkill } from '@/lib/types';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'MHWilds Ver 1.0 KenXtinct - สกิลทั่วไป.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const results = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true
    });
    
    const skills = results.data.filter((row: any) => row['ชื่อสกิล']).map((row: any) => {
      const levels = [];
      for (let i = 1; i <= 7; i++) {
        if (row[`Skill Lv ${i}`]) {
          levels.push(row[`Skill Lv ${i}`]);
        }
      }
      
      return {
        name: row['ชื่อสกิล'],
        type: row['ประเภท'],
        maxLevel: parseInt(row['Max Level']) || 0,
        description: row['คำอธิบาย'] || '',
        levels
      };
    });
    
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error loading normal skills:', error);
    return NextResponse.json({ error: 'Failed to load normal skills data' }, { status: 500 });
  }
} 
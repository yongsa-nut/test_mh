import Papa from 'papaparse';
import { NormalSkill, SetSkill, IFrameData } from './types';

export async function loadNormalSkills(): Promise<NormalSkill[]> {
  const response = await fetch('/api/normal-skills');
  const data = await response.json();
  return data;
}

export async function loadSetSkills(): Promise<SetSkill[]> {
  const response = await fetch('/api/set-skills');
  const data = await response.json();
  return data;
}

export async function loadIFrameData(type: 'frame' | 'second'): Promise<IFrameData[]> {
  const response = await fetch(`/api/i-frame-data?type=${type}`);
  const data = await response.json();
  return data;
}

export function parseCSVFile<T>(fileContent: string): T[] {
  const results = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true
  });
  
  return results.data as T[];
} 
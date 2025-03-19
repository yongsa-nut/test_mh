export interface NormalSkill {
  name: string;
  type: string;
  maxLevel: number;
  description: string;
  levels: string[];
}

export interface SetSkill {
  setName: string;
  type: string;
  skillName: string;
  requiredPieces: number;
  effectLevel1: string;
  effectLevel2: string;
}

export interface IFrameData {
  weapon: string;
  action: string;
  base: number;
  evadeWindow1: number;
  evadeWindow2: number;
  evadeWindow3: number;
  evadeWindow4: number;
  evadeWindow5: number;
} 
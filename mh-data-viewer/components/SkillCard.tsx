import React from 'react';
import { NormalSkill } from '@/lib/types';

interface SkillCardProps {
  skill: NormalSkill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  // Get background color based on skill type
  const getBgColor = (type: string) => {
    switch(type) {
      case 'Weapon':
        return 'bg-amber-600';
      case 'Equipment':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="card border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden bg-white p-5">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-mh-text">{skill.name || 'Unknown'}</h2>
        <span className={`px-3 py-1 ${getBgColor(skill.type)} text-white text-sm rounded-full font-medium shadow-sm`}>
          {skill.type || 'Unknown'}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">{skill.description || 'ไม่มีคำอธิบาย'}</p>
      
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-3 flex items-center">
          <span className="mr-2">Skill Levels</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded-md text-sm text-gray-600">
            Max: {skill.maxLevel || (skill.levels && skill.levels.length) || 1}
          </span>
        </h3>
        <div className="space-y-2">
          {skill.levels && skill.levels.length > 0 ? (
            skill.levels.map((levelEffect, idx) => (
              <div key={idx} className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                <span className={`w-8 h-8 flex items-center justify-center ${getBgColor(skill.type)} text-white rounded-full mr-3 flex-shrink-0 font-medium shadow-sm`}>
                  {idx + 1}
                </span>
                <span className="text-sm">{levelEffect || 'ไม่มีข้อมูล'}</span>
              </div>
            ))
          ) : (
            <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-500 text-center">
              ไม่พบข้อมูลระดับสกิล
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard; 
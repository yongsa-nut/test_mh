'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SetSkill } from '@/lib/types';
import { loadSetSkills } from '@/lib/utils';
import SearchBar from '@/components/SearchBar';

export default function SetSkillsPage() {
  const [setSkills, setSetSkills] = useState<SetSkill[]>([]);
  const [filteredSetSkills, setFilteredSetSkills] = useState<SetSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadSetSkills();
        setSetSkills(data);
        setFilteredSetSkills(data);
      } catch (error) {
        console.error('Error fetching set skills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSetSkills(setSkills);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = setSkills.filter(skill => 
      skill.setName.toLowerCase().includes(lowerCaseQuery) ||
      skill.skillName.toLowerCase().includes(lowerCaseQuery) ||
      skill.type.toLowerCase().includes(lowerCaseQuery) ||
      skill.effectLevel1.toLowerCase().includes(lowerCaseQuery) ||
      (skill.effectLevel2 && skill.effectLevel2.toLowerCase().includes(lowerCaseQuery))
    );
    
    setFilteredSetSkills(filtered);
  }, [searchQuery, setSkills]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-mh-primary hover:underline mr-4">
          &larr; Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Set Skills (สกิลชุดเซ็ท)</h1>
      </div>
      
      <SearchBar placeholder="Search set skills by name, type, or effect..." onSearch={handleSearch} />
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mh-primary"></div>
        </div>
      ) : filteredSetSkills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No set skills found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSetSkills.map((skill, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{skill.setName}</h2>
                <span className="px-2 py-1 bg-mh-secondary text-white text-sm rounded-md">
                  {skill.type}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="font-medium text-lg">{skill.skillName}</p>
                <p className="text-sm text-gray-600">Required Pieces: {skill.requiredPieces}</p>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-md font-medium">Effect Level 1</h3>
                  <p className="text-sm">{skill.effectLevel1}</p>
                </div>
                
                {skill.effectLevel2 && (
                  <div>
                    <h3 className="text-md font-medium">Effect Level 2</h3>
                    <p className="text-sm">{skill.effectLevel2}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
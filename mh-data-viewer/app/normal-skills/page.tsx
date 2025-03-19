'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NormalSkill } from '@/lib/types';
import { loadNormalSkills } from '@/lib/utils';
import SearchBar from '@/components/SearchBar';

export default function NormalSkillsPage() {
  const [skills, setSkills] = useState<NormalSkill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<NormalSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadNormalSkills();
        setSkills(data);
        setFilteredSkills(data);
      } catch (error) {
        console.error('Error fetching normal skills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSkills(skills);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = skills.filter(skill => 
      skill.name.toLowerCase().includes(lowerCaseQuery) ||
      skill.type.toLowerCase().includes(lowerCaseQuery) ||
      skill.description.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredSkills(filtered);
  }, [searchQuery, skills]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-mh-primary hover:underline mr-4">
          &larr; Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Normal Skills (สกิลทั่วไป)</h1>
      </div>
      
      <SearchBar placeholder="Search skills by name, type, or description..." onSearch={handleSearch} />
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mh-primary"></div>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No skills found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{skill.name}</h2>
                <span className="px-2 py-1 bg-mh-secondary text-white text-sm rounded-md">
                  {skill.type}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{skill.description}</p>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Skill Levels</h3>
                <div className="space-y-2">
                  {skill.levels.map((levelEffect, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="w-8 h-8 flex items-center justify-center bg-mh-primary text-white rounded-full mr-2">
                        {idx + 1}
                      </span>
                      <span className="text-sm">{levelEffect}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NormalSkill } from '@/lib/types';
import { loadNormalSkills, getMockNormalSkills } from '@/lib/utils';
import SearchBar from '@/components/SearchBar';
import SkillCard from '@/components/SkillCard';

export default function NormalSkillsPage() {
  const [skills, setSkills] = useState<NormalSkill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<NormalSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Weapon' | 'Equipment'>('All');

  useEffect(() => {
    // Load all skills from the API
    const fetchSkills = async () => {
      try {
        console.log('Fetching skills from API...');
        const response = await fetch('/api/normal-skills');
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Loaded ${data.length} skills from API`);
        
        if (data.length === 0) {
          // Fallback to mock data if no skills were loaded
          console.log('No skills loaded from API, using mock data');
          const mockSkills = getMockNormalSkills();
          setSkills(mockSkills);
          setFilteredSkills(mockSkills);
        } else {
          setSkills(data);
          setFilteredSkills(data);
        }
      } catch (error) {
        console.error('Error loading skills:', error);
        // Fallback to mock data if API fails
        const mockSkills = getMockNormalSkills();
        setSkills(mockSkills);
        setFilteredSkills(mockSkills);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  useEffect(() => {
    // Apply both search query and type filter
    let filtered = skills;
    
    // Apply type filter first
    if (typeFilter !== 'All') {
      filtered = filtered.filter(skill => skill.type === typeFilter);
    }
    
    // Then apply search query
    if (searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(lowerCaseQuery) ||
        skill.type.toLowerCase().includes(lowerCaseQuery) ||
        skill.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    setFilteredSkills(filtered);
  }, [searchQuery, typeFilter, skills]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeFilterChange = (type: 'All' | 'Weapon' | 'Equipment') => {
    setTypeFilter(type);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-mh-primary hover:underline mr-4 transition duration-200">
          &larr; Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Normal Skills (สกิลทั่วไป)</h1>
      </div>
      
      <div className="flex items-center gap-2 mb-8">
        <div className="relative flex-grow">
          <SearchBar placeholder="Search skills by name, type, or description..." onSearch={handleSearch} />
        </div>
        <div className="flex bg-gray-100 rounded-md overflow-hidden shadow-sm">
          <button 
            onClick={() => handleTypeFilterChange('All')}
            className={`px-4 py-2 min-w-[80px] font-medium transition-all duration-200 ${
              typeFilter === 'All' 
                ? 'bg-mh-primary text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => handleTypeFilterChange('Weapon')}
            className={`px-4 py-2 min-w-[80px] font-medium transition-all duration-200 ${
              typeFilter === 'Weapon' 
                ? 'bg-mh-primary text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Weapon
          </button>
          <button 
            onClick={() => handleTypeFilterChange('Equipment')}
            className={`px-4 py-2 min-w-[80px] font-medium transition-all duration-200 ${
              typeFilter === 'Equipment' 
                ? 'bg-mh-primary text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Equipment
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mh-primary"></div>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">No skills found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-md inline-block">
            Showing {filteredSkills.length} of {skills.length} skills
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 
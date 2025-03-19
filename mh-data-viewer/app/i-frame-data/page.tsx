'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IFrameData } from '@/lib/types';
import { loadIFrameData } from '@/lib/utils';
import SearchBar from '@/components/SearchBar';

export default function IFrameDataPage() {
  const [iFrameData, setIFrameData] = useState<IFrameData[]>([]);
  const [filteredData, setFilteredData] = useState<IFrameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataType, setDataType] = useState<'frame' | 'second'>('frame');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadIFrameData(dataType);
        setIFrameData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching i-frame data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dataType]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(iFrameData);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = iFrameData.filter(item => 
      item.weapon.toLowerCase().includes(lowerCaseQuery) ||
      item.action.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredData(filtered);
  }, [searchQuery, iFrameData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDataTypeChange = (type: 'frame' | 'second') => {
    setDataType(type);
    setLoading(true);
  };

  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-mh-primary hover:underline mr-4">
          &larr; Back to Home
        </Link>
        <h1 className="text-2xl font-bold">I-Frame Data</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button
            className={`px-4 py-2 rounded-md ${dataType === 'frame' ? 'bg-mh-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleDataTypeChange('frame')}
          >
            Frame Data
          </button>
          <button
            className={`px-4 py-2 rounded-md ${dataType === 'second' ? 'bg-mh-primary text-white' : 'bg-gray-200'}`}
            onClick={() => handleDataTypeChange('second')}
          >
            Time Data (Seconds)
          </button>
        </div>
        
        <div className="w-full sm:w-1/2">
          <SearchBar placeholder="Search by weapon or action..." onSearch={handleSearch} />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mh-primary"></div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No i-frame data found matching your search.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-mh-primary text-white">
              <tr>
                <th className="py-3 px-4 text-left">Weapon</th>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-center">Base</th>
                <th className="py-3 px-4 text-center">Evade Window +1</th>
                <th className="py-3 px-4 text-center">Evade Window +2</th>
                <th className="py-3 px-4 text-center">Evade Window +3</th>
                <th className="py-3 px-4 text-center">Evade Window +4</th>
                <th className="py-3 px-4 text-center">Evade Window +5</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 border-b">{item.weapon}</td>
                  <td className="py-3 px-4 border-b">{item.action}</td>
                  <td className="py-3 px-4 text-center border-b">{item.base}</td>
                  <td className="py-3 px-4 text-center border-b">{item.evadeWindow1}</td>
                  <td className="py-3 px-4 text-center border-b">{item.evadeWindow2}</td>
                  <td className="py-3 px-4 text-center border-b">{item.evadeWindow3}</td>
                  <td className="py-3 px-4 text-center border-b">{item.evadeWindow4}</td>
                  <td className="py-3 px-4 text-center border-b">{item.evadeWindow5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
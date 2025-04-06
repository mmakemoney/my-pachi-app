'use client';

import { getHalls } from '@/lib/api';
import HallCard from '../components/HallCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Hall } from '@/types/database';

export default function HallsPage() {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const hallsData = await getHalls();
        setHalls(hallsData);
      } catch (err) {
        console.error('データ取得エラー:', err);
        setError('データの取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredHalls = halls.filter(hall => {
    // nameとaddressが存在するかどうかを確認
    const nameMatch = hall.name ? hall.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const addressMatch = hall.address ? hall.address.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return nameMatch || addressMatch;
  });

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ホール一覧</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="ホール名または住所で検索..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHalls.length > 0 ? (
          filteredHalls.map((hall) => (
            <Link href={`/halls/${hall.id}`} key={hall.id}>
              <HallCard
                id={hall.id}
                name={hall.name || '名前不明'}
                address={hall.address || '住所不明'}
                machines={hall.machines || 0}
                rating={hall.rating || 0}
              />
            </Link>
          ))
        ) : (
          <p>ホール情報がありません</p>
        )}
      </div>
    </div>
  );
} 
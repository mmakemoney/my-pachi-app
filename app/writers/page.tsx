'use client';

import { getWriters } from '@/lib/api';
import WriterCard from '../components/WriterCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Writer } from '@/types/database';

export default function WritersPage() {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const writersData = await getWriters();
        setWriters(writersData);
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

  const filteredWriters = writers.filter(writer => {
    // nameが存在するかどうかを確認
    return writer.name ? writer.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  });

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ライター一覧</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="ライター名で検索..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWriters.length > 0 ? (
          filteredWriters.map((writer) => (
            <Link href={`/writers/${writer.id}`} key={writer.id}>
              <WriterCard
                id={writer.id}
                name={writer.name || '名前不明'}
                image={writer.image || '/default-avatar.png'}
                description={writer.description || '説明なし'}
                articles={0}
              />
            </Link>
          ))
        ) : (
          <p>ライター情報がありません</p>
        )}
      </div>
    </div>
  );
} 
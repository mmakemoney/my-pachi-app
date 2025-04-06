'use client';

import { getEvents } from '@/lib/api';
import EventCard from '../components/EventCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Event } from '@/types/database';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const eventsData = await getEvents();
        setEvents(eventsData);
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

  const filteredEvents = events.filter(event => {
    // titleとlocationが存在するかどうかを確認
    const titleMatch = event.title ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const locationMatch = event.location ? event.location.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return titleMatch || locationMatch;
  });

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">イベント一覧</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="イベント名または場所で検索..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard
                id={event.id}
                title={event.title || `イベント ${event.id}`}
                date={event.date || '日付不明'}
                location={event.location || '場所不明'}
                description={event.description || '詳細情報なし'}
              />
            </Link>
          ))
        ) : (
          <p>イベント情報がありません</p>
        )}
      </div>
    </div>
  );
} 
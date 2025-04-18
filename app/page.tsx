'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchEvents, fetchWriters, fetchHalls } from '@/lib/api';
import { Event, Hall, Writer } from '@/types/database';
import EventCard from './components/EventCard';
import WriterCard from './components/WriterCard';
import HallCard from './components/HallCard';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [eventsData, writersData, hallsData] = await Promise.all([
          fetchEvents(),
          fetchWriters(),
          fetchHalls(),
        ]);
        
        // データが存在することを確認
        if (eventsData && writersData && hallsData) {
          setEvents(eventsData);
          setWriters(writersData);
          setHalls(hallsData);
        } else {
          setError('データの取得に失敗しました');
        }
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
    const titleMatch = event.title ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const locationMatch = event.location ? event.location.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return titleMatch || locationMatch;
  });

  const filteredWriters = writers.filter(writer => {
    return writer.name ? writer.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  });

  const filteredHalls = halls.filter(hall => {
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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">パチンコ情報</h1>
      
      <SearchBar onSearch={handleSearch} placeholder="ライター名、ホール名、イベント名で検索..." />
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">最新イベント</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <EventCard
                  id={event.id}
                  title={event.title || 'イベント名不明'}
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
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ライター一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWriters.length > 0 ? (
            filteredWriters.map((writer) => (
              <Link href={`/writers/${writer.id}`} key={writer.id}>
                <WriterCard
                  id={writer.id}
                  name={writer.name || '名前不明'}
                  image={writer.image || '/default-avatar.png'}
                  description={writer.description || '説明なし'}
                  articles={writer.articles || 0}
                />
              </Link>
            ))
          ) : (
            <p>ライター情報がありません</p>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ホール一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHalls.length > 0 ? (
            filteredHalls.map((hall) => (
              <Link href={`/halls/${hall.id}`} key={hall.id}>
                <HallCard
                  id={hall.id}
                  name={hall.name || 'ホール名不明'}
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
      </section>
    </main>
  );
}

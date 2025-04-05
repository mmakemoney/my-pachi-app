'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchEvents, fetchWriters, fetchHalls } from '../lib/api';
import { Event, Hall, Writer } from '../types/database';
import EventCard from './components/EventCard';
import WriterCard from './components/WriterCard';
import HallCard from './components/HallCard';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [eventsData, writersData, hallsData] = await Promise.all([
        fetchEvents(),
        fetchWriters(),
        fetchHalls(),
      ]);
      setEvents(eventsData);
      setWriters(writersData);
      setHalls(hallsData);
    };
    loadData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">パチンコ情報</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">最新イベント</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              description={event.description}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ライター一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {writers.map((writer) => (
            <WriterCard
              key={writer.id}
              name={writer.name}
              image={writer.image}
              description={writer.description}
              articles={writer.articles}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ホール一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {halls.map((hall) => (
            <HallCard
              key={hall.id}
              name={hall.name}
              address={hall.address}
              machines={hall.machines}
              rating={hall.rating}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

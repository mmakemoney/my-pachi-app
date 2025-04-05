import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchEvents, fetchWriters, fetchHalls } from '../lib/api';
import { Event, Hall, Writer } from '../types/database';

interface FullEvent extends Event {
  writer: Writer | null;
  hall: Hall | null;
}

export default function Home() {
  const [events, setEvents] = useState<FullEvent[]>([]);

  useEffect(() => {
    const getData = async () => {
      const [eventsData, writers, halls] = await Promise.all([
        fetchEvents(),
        fetchWriters(),
        fetchHalls()
      ]);

      const enrichedEvents: FullEvent[] = eventsData.slice(0, 10).map((event) => {
        const writer = writers.find(w => w.id === event.writer_id) || null;
        const hall = halls.find(h => h.id === event.hall_id) || null;
        return { ...event, writer, hall };
      });

      setEvents(enrichedEvents);
    };

    getData();
  }, []);

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">最新の来店情報</h1>
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition">
            <div className="text-sm text-gray-500 mb-1">{new Date(event.event_date).toLocaleDateString()}</div>
            <h2 className="text-xl font-semibold">
              <Link href={`/writers/${event.writer?.id}`}>{event.writer?.name || '不明なライター'}</Link>
              {' '}@{' '}
              <Link href={`/halls/${event.hall?.id}`}>{event.hall?.name || '不明なホール'}</Link>
            </h2>
            <Link href={`/events/${event.id}`} className="text-blue-500 text-sm underline mt-2 inline-block">
              詳細を見る
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

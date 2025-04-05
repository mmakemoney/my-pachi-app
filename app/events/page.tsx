import { getEvents } from '@/lib/api';
import EventCard from '../components/EventCard';
import Link from 'next/link';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">イベント一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <EventCard
              id={event.id}
              title={`イベント ${event.id}`}
              date={event.event_date}
              location="場所不明"
              description="詳細情報なし"
            />
          </Link>
        ))}
      </div>
    </div>
  );
} 
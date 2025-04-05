import { getEventById } from '@/lib/api';
import { notFound } from 'next/navigation';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">開催日時</h2>
              <p className="text-gray-700">{event.date}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">開催場所</h2>
              <p className="text-gray-700">{event.location}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">イベント詳細</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
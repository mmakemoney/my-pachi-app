import { getHallById } from '@/lib/api';
import { notFound } from 'next/navigation';

interface HallPageProps {
  params: {
    id: string;
  };
}

export default async function HallPage({ params }: HallPageProps) {
  const hall = await getHallById(params.id);

  if (!hall) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{hall.name}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">住所</h2>
              <p className="text-gray-700">{hall.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">台数</h2>
              <p className="text-gray-700">{hall.machines}台</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">評価</h2>
              <p className="text-gray-700">{'★'.repeat(hall.rating)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
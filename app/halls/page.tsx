import { getHalls } from '@/lib/api';
import HallCard from '../components/HallCard';
import Link from 'next/link';

export default async function HallsPage() {
  const halls = await getHalls();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ホール一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <Link href={`/halls/${hall.id}`} key={hall.id}>
            <HallCard
              id={hall.id}
              name={hall.name}
              address={hall.address || '住所不明'}
              machines={0}
              rating={3}
            />
          </Link>
        ))}
      </div>
    </div>
  );
} 
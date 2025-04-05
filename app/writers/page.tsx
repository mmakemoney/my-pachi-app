import { getWriters } from '@/lib/api';
import WriterCard from '../components/WriterCard';
import Link from 'next/link';

export default async function WritersPage() {
  const writers = await getWriters();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ライター一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {writers.map((writer) => (
          <Link href={`/writers/${writer.id}`} key={writer.id}>
            <WriterCard
              id={writer.id}
              name={writer.name}
              image={writer.image_url || '/default-avatar.png'}
              description={writer.description || '説明なし'}
              articles={0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
} 
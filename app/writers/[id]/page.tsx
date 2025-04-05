import { getWriterById } from '@/lib/api';
import { notFound } from 'next/navigation';

interface WriterPageProps {
  params: {
    id: string;
  };
}

export default async function WriterPage({ params }: WriterPageProps) {
  const writer = await getWriterById(params.id);

  if (!writer) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={writer.image}
              alt={writer.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{writer.name}</h1>
              <p className="text-gray-600">記事数: {writer.articles}</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">プロフィール</h2>
            <p className="text-gray-700">{writer.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
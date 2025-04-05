// ✅ ライター詳細ページ: app/writer/[name]/page.tsx

export default function WriterPage({ params }: { params: { name: string } }) {
    const writerName = decodeURIComponent(params.name);
  
    const dummyWriter = {
      name: writerName,
      twitter: `https://twitter.com/${writerName.toLowerCase()}`,
      youtube: `https://www.youtube.com/results?search_query=${writerName}`,
      bio: `${writerName}は全国のホールを飛び回る人気ライターです。`
    };
  
    return (
      <main className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{dummyWriter.name}</h1>
        <p className="mb-4">{dummyWriter.bio}</p>
  
        <ul className="space-y-2">
          <li>
            <a href={dummyWriter.twitter} target="_blank" className="text-blue-600 underline">Twitter</a>
          </li>
          <li>
            <a href={dummyWriter.youtube} target="_blank" className="text-red-600 underline">YouTube検索</a>
          </li>
        </ul>
      </main>
    );
  }
  
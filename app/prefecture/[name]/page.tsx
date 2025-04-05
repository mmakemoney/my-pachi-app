export default function PrefecturePage({ params }: { params: { name: string } }) {
    const prefectureName = decodeURIComponent(params.name);
  
    const dummyEvents = [
      { id: 1, date: "2025-04-03", writer: "ライターA", hall: "〇〇ホール新宿店", prefecture: "東京" },
      { id: 2, date: "2025-04-04", writer: "ライターB", hall: "△△ホール大阪店", prefecture: "大阪" },
      { id: 3, date: "2025-04-05", writer: "ライターC", hall: "□□ホール大阪店", prefecture: "大阪" },
    ];
  
    const filteredEvents = dummyEvents.filter(e => e.prefecture === prefectureName);
  
    return (
      <main className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{prefectureName}の来店予定</h1>
  
        {filteredEvents.length === 0 ? (
          <p>来店予定が見つかりませんでした。</p>
        ) : (
          <ul className="space-y-2">
            {filteredEvents.map((event) => (
              <li key={event.id} className="border p-3 rounded shadow-sm">
                <div className="font-semibold">{event.date}</div>
                <div>{event.writer} @ {event.hall}</div>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
  
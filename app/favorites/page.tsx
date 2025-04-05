// ✅ お気に入りページ: app/favorites/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteEvents, setFavoriteEvents] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteEvents([]);
        return;
      }
      const { data } = await supabase.from("events").select("*").in("id", favorites);
      if (data) {
        const sorted = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setFavoriteEvents(sorted);
      }
    };
    fetchFavorites();
  }, [favorites]);

  const removeFavorite = (id: number) => {
    const newFavorites = favorites.filter(favId => favId !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">★ お気に入り一覧</h1>

      {favoriteEvents.length === 0 ? (
        <p>お気に入りに登録されたイベントはありません。</p>
      ) : (
        <ul className="space-y-2">
          {favoriteEvents.map(event => (
            <li key={event.id} className="border p-3 rounded shadow-sm flex justify-between items-center">
              <div>
                <div className="font-semibold">{event.date}</div>
                <div>
                  <Link href={`/writer/${event.writer}`} className="text-blue-600 hover:underline">
                    {event.writer}
                  </Link> @ {event.hall}（{event.prefecture}）
                </div>
              </div>
              <button
                onClick={() => removeFavorite(event.id)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="お気に入りから削除"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
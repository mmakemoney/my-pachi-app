// ✅ トップページ: app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { CalendarDays, LogIn, Star } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [prefectures, setPrefectures] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    writer: "",
    hall: "",
    prefecture_id: "",
    user_id: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*, prefectures(name)");
      if (data) {
        const now = new Date();
        const lowerSearch = search.toLowerCase();
        const filtered = data.filter(e => {
          const eventDate = new Date(e.date);
          return (
            (eventDate >= now) &&
            (e.writer.toLowerCase().includes(lowerSearch) ||
              e.hall.toLowerCase().includes(lowerSearch) ||
              e.prefectures?.name.toLowerCase().includes(lowerSearch))
          );
        });
        const sorted = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setFilteredEvents(sorted);
      }
    };
    fetchEvents();
  }, [search, submitting]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setFormData((prev) => ({ ...prev, user_id: user.id }));
      }
    };

    const fetchPrefectures = async () => {
      const { data } = await supabase.from("prefectures").select("*").order("id");
      if (data) setPrefectures(data);
    };

    getUser();
    fetchPrefectures();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("ログインが必要です。");
      return;
    }
    setSubmitting(true);
    const { data: existing } = await supabase.from("events").select("*")
      .eq("date", formData.date)
      .eq("writer", formData.writer)
      .eq("hall", formData.hall);
    if (existing && existing.length > 0) {
      alert("同じライター・ホール・日付のイベントが既に存在します。");
      setSubmitting(false);
      return;
    }
    const { error } = await supabase.from("events").insert([formData]);
    if (error) {
      console.error("投稿エラー:", error.message);
    } else {
      setFormData({ date: "", writer: "", hall: "", prefecture_id: "", user_id: user.id });
    }
    setSubmitting(false);
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎯 今週の注目来店情報</h1>
        {!user && (
          <button
            onClick={handleLogin}
            className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            <LogIn size={16} /> ログイン
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="ライター名・ホール名・都道府県で検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <ul className="space-y-2">
        {filteredEvents.map((event) => (
          <li key={event.id} className="border p-3 rounded shadow-sm bg-white">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold flex items-center gap-2">
                  <CalendarDays size={16} />{event.date}
                </div>
                <div>
                  <Link href={`/writer/${event.writer}`} className="text-blue-600 hover:underline">
                    {event.writer}
                  </Link> @ {event.hall}（{event.prefectures?.name}）
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(event.id)}
                className="ml-4 text-yellow-500 text-xl"
                title="お気に入りに追加/解除"
              >
                {favorites.includes(event.id) ? <Star fill="currentColor" /> : <Star />}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <Link href="/favorites" className="text-blue-600 underline">★ お気に入り一覧を見る</Link>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-2">🗾 地域から探す</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {prefectures.map((pref) => (
          <Link
            key={pref.id}
            href={`/prefecture/${encodeURIComponent(pref.name)}`}
            className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded text-center"
          >
            {pref.name}
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-2">📝 新規イベント投稿</h2>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="writer"
            placeholder="ライター名"
            value={formData.writer}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="hall"
            placeholder="ホール名"
            value={formData.hall}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="prefecture_id"
            value={formData.prefecture_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">都道府県を選択</option>
            {prefectures.map(pref => (
              <option key={pref.id} value={pref.id}>{pref.name}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {submitting ? "投稿中..." : "イベントを追加"}
          </button>
        </form>
      ) : (
        <p className="text-red-600">投稿にはログインが必要です。</p>
      )}
    </main>
  );
}

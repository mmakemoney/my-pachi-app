// lib/api.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { Prefecture, Writer, Hall, Event } from '../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// 都道府県一覧を取得
export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  const { data, error } = await supabase
    .from('prefectures')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching prefectures:', error);
    return [];
  }
  return data;
};

// ライター一覧を取得
export const fetchWriters = async (): Promise<Writer[]> => {
  const { data, error } = await supabase
    .from('writers')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching writers:', error);
    return [];
  }
  
  // 型定義に合わせてデータを変換
  return data.map(writer => ({
    id: writer.id,
    name: writer.name,
    image: writer.image_url || '/default-avatar.png',
    description: writer.description || '説明なし',
    articles: 0, // 実際の記事数を取得するロジックが必要
    created_at: writer.created_at
  }));
};

// ホール一覧を取得
export const fetchHalls = async (): Promise<Hall[]> => {
  const { data, error } = await supabase
    .from('halls')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching halls:', error);
    return [];
  }
  
  // 型定義に合わせてデータを変換
  return data.map(hall => ({
    id: hall.id,
    name: hall.name,
    address: hall.address || '住所不明',
    machines: 0, // 実際の台数を取得するロジックが必要
    rating: 3, // デフォルト評価
    created_at: hall.created_at
  }));
};

// イベント一覧を取得
export const fetchEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  // 型定義に合わせてデータを変換
  return data.map(event => ({
    id: event.id,
    title: `イベント ${event.id}`,
    date: event.event_date,
    location: '場所不明',
    description: '詳細情報なし',
    created_at: event.created_at
  }));
};

// ライター一覧を取得（詳細ページ用）
export async function getWriters() {
  const { data, error } = await supabase
    .from('writers')
    .select('*');

  if (error) {
    throw new Error('Failed to fetch writers');
  }

  return data;
}

// ライター詳細を取得
export async function getWriterById(id: string) {
  const { data, error } = await supabase
    .from('writers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching writer:', error);
    return null;
  }

  // 型定義に合わせてデータを変換
  return {
    id: data.id,
    name: data.name,
    image: data.image_url || '/default-avatar.png',
    description: data.description || '説明なし',
    articles: 0, // 実際の記事数を取得するロジックが必要
    created_at: data.created_at
  };
}

// ホール一覧を取得（詳細ページ用）
export async function getHalls() {
  const { data, error } = await supabase
    .from('halls')
    .select('*');

  if (error) {
    throw new Error('Failed to fetch halls');
  }

  return data;
}

// ホール詳細を取得
export async function getHallById(id: string) {
  const { data, error } = await supabase
    .from('halls')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching hall:', error);
    return null;
  }

  // 型定義に合わせてデータを変換
  return {
    id: data.id,
    name: data.name,
    address: data.address || '住所不明',
    machines: 0, // 実際の台数を取得するロジックが必要
    rating: 3, // デフォルト評価
    created_at: data.created_at
  };
}

// イベント一覧を取得（詳細ページ用）
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*');

  if (error) {
    throw new Error('Failed to fetch events');
  }

  return data;
}

// イベント詳細を取得
export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  // 型定義に合わせてデータを変換
  return {
    id: data.id,
    title: `イベント ${data.id}`,
    date: data.event_date,
    location: '場所不明',
    description: '詳細情報なし',
    created_at: data.created_at
  };
}

// lib/api.ts
import { supabase } from './supabaseClient';
import { Prefecture, Writer, Hall, Event } from '../types/database';

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

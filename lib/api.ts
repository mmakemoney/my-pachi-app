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
  return data;
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
  return data;
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
  return data;
};

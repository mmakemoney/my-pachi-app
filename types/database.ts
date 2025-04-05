// types/database.ts

export type Prefecture = {
    id: string;
    name: string;
    created_at: string;
  };
  
  export type Writer = {
    id: string;
    name: string;
    image_url?: string;
    sns_link?: string;
    description?: string;
    created_at: string;
  };
  
  export type Hall = {
    id: string;
    name: string;
    address?: string;
    prefecture_id?: string;
    website_url?: string;
    image_url?: string;
    created_at: string;
  };
  
  export type Event = {
    id: string;
    event_date: string;
    writer_id?: string;
    hall_id?: string;
    created_at: string;
  };
// types/database.ts

export type Prefecture = {
    id: string;
    name: string;
    created_at: string;
  };
  
  export type Writer = {
    id: string;
    name: string;
    image: string;
    description: string;
    articles: number;
    created_at: string;
  };
  
  export type Hall = {
    id: string;
    name: string;
    address: string;
    machines: number;
    rating: number;
    created_at: string;
  };
  
  export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    created_at: string;
  };
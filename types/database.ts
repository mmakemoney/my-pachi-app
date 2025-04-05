// types/database.ts

export type Prefecture = {
    id: number;
    name: string;
  };
  
  export type Writer = {
    id: string;
    name: string;
    image: string;
    description: string;
    articles: number;
  };
  
  export type Hall = {
    id: string;
    name: string;
    address: string;
    machines: number;
    rating: number;
  };
  
  export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
  };

  export type Database = {
    public: {
      Tables: {
        writers: {
          Row: Writer;
          Insert: Omit<Writer, 'id'>;
          Update: Partial<Omit<Writer, 'id'>>;
        };
        halls: {
          Row: Hall;
          Insert: Omit<Hall, 'id'>;
          Update: Partial<Omit<Hall, 'id'>>;
        };
        events: {
          Row: Event;
          Insert: Omit<Event, 'id'>;
          Update: Partial<Omit<Event, 'id'>>;
        };
      };
    };
  };
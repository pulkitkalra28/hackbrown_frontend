export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: 'user' | 'artist' | 'business';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role: 'user' | 'artist' | 'business';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: 'user' | 'artist' | 'business';
          created_at?: string;
          updated_at?: string;
        };
      };
      artists: {
        Row: {
          id: string;
          art_type: 'dance' | 'music' | 'art' | 'sports' | 'other';
          location: string;
          bio: string | null;
          youtube_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          website_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          art_type: 'dance' | 'music' | 'art' | 'sports' | 'other';
          location: string;
          bio?: string | null;
          youtube_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          website_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          art_type?: 'dance' | 'music' | 'art' | 'sports' | 'other';
          location?: string;
          bio?: string | null;
          youtube_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          website_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
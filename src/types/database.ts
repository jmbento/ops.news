export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  created_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  excerpt_bullets?: string[]
  content: string
  cover_image: string | null
  category_id: string | null
  category?: Category
  author: string
  is_featured: boolean
  is_published: boolean
  is_urgent?: boolean
  is_live?: boolean
  is_exclusive?: boolean
  trending?: boolean
  views: number
  published_at: string | null
  created_at: string
  updated_at: string
  // Campos de Áudio
  audio_summary_url?: string | null
  audio_summary_duration?: number | null
  audio_summary_size_bytes?: number | null
  audio_full_url?: string | null
  audio_full_duration?: number | null
  audio_full_size_bytes?: number | null
  audio_generated_at?: string | null
  // Campos de Contexto
  historical_context?: string | null
  verified_sources?: { name: string; url: string }[]
  tags?: string[]
}

export interface ReadLaterItem {
  id: string
  user_id: string
  article_id: string
  is_read: boolean
  reading_progress: number
  added_at: string
  read_at: string | null
  article?: Article
}

export interface ListenLaterItem {
  id: string
  user_id: string
  article_id: string
  audio_version: 'summary' | 'full'
  queue_order: number
  is_played: boolean
  progress_seconds: number
  playback_speed: number
  added_at: string
  played_at: string | null
  article?: Article
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      articles: {
        Row: Article
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>
        Update: Partial<Omit<Article, 'id' | 'created_at'>>
      }
      read_later: {
        Row: ReadLaterItem
        Insert: Omit<ReadLaterItem, 'id' | 'added_at'>
        Update: Partial<Omit<ReadLaterItem, 'id' | 'added_at'>>
      }
      listen_later: {
        Row: ListenLaterItem
        Insert: Omit<ListenLaterItem, 'id' | 'added_at'>
        Update: Partial<Omit<ListenLaterItem, 'id' | 'added_at'>>
      }
    }
  }
}

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
  content: string
  cover_image: string | null
  category_id: string | null
  category?: Category
  author: string
  is_featured: boolean
  is_published: boolean
  views: number
  published_at: string | null
  created_at: string
  updated_at: string
  // Campos adicionais para features avançadas
  urgente?: boolean
  ao_vivo?: boolean
  exclusivo?: boolean
  trending?: boolean
  resumo_bullets?: string[]
  contexto_historico?: string
  fontes_verificadas?: { nome: string; url: string }[]
  audio_url?: string
  tags?: string[]
  meta_titulo?: string
  meta_descricao?: string
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
    }
  }
}

import { supabase } from './client'
import type { Article, Category } from '@/types/database'

// ============== CATEGORIAS ==============

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }

  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Erro ao buscar categoria:', error)
    return null
  }

  return data
}

// ============== ARTIGOS ==============

export async function getArticles(options?: {
  limit?: number
  offset?: number
  categorySlug?: string
  featured?: boolean
}): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (options?.categorySlug) {
    const category = await getCategoryBySlug(options.categorySlug)
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  if (options?.featured !== undefined) {
    query = query.eq('is_featured', options.featured)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao buscar artigos:', error)
    return []
  }

  return data || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Erro ao buscar artigo:', error)
    return null
  }

  return data
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Erro ao buscar artigo em destaque:', error)
    return null
  }

  return data
}

export async function searchArticles(query: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_published', true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('published_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Erro ao buscar artigos:', error)
    return []
  }

  return data || []
}

export async function incrementArticleViews(articleId: string): Promise<void> {
  // @ts-expect-error - RPC function exists in database
  await supabase.rpc('increment_views', { article_id: articleId })
}

export async function getRelatedArticles(
  categoryId: string,
  currentArticleId: string,
  limit = 3
): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .neq('id', currentArticleId)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Erro ao buscar artigos relacionados:', error)
    return []
  }

  return data || []
}

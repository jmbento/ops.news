import { getArticles, getCategories } from '@/lib/supabase/queries'
import { categories as staticCategories, siteConfig } from '@/lib/constants'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${baseUrl}/busca`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.5 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  // Category pages
  const categoryPages = staticCategories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  // Article pages (from Supabase)
  let articlePages: MetadataRoute.Sitemap = []
  try {
    const articles = await getArticles({ limit: 1000 })
    articlePages = articles.map((article) => ({
      url: `${baseUrl}/${article.category?.slug || 'geral'}/${article.slug}`,
      lastModified: new Date(article.updated_at || article.published_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
  }

  return [...staticPages, ...categoryPages, ...articlePages]
}

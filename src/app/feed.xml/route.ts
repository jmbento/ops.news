import { getArticles } from '@/lib/supabase/queries'
import { siteConfig } from '@/lib/constants'
import type { Article } from '@/types/database'

export async function GET() {
  let articles: Article[] = []
  
  try {
    articles = await getArticles({ limit: 50 })
  } catch (error) {
    console.error('Error fetching articles for RSS:', error)
  }

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteConfig.url}/logo.png</url>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
    </image>
    ${articles.map((article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteConfig.url}/${article.category?.slug || 'geral'}/${article.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/${article.category?.slug || 'geral'}/${article.slug}</guid>
      <pubDate>${new Date(article.published_at || article.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <author>${article.author}</author>
      ${article.category ? `<category>${article.category.name}</category>` : ''}
      ${article.cover_image ? `<enclosure url="${article.cover_image}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

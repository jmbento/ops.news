import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { NewsCard } from './NewsCard'
import { NewsletterSignup } from './NewsletterSignup'
import { AdBanner } from '@/components/ads/AdBanner'
import type { Article } from '@/types/database'

interface SidebarProps {
  trendingArticles?: Article[]
  mostReadArticles?: Article[]
}

// Mock data
const mockTrending = [
  { id: '1', topic: 'Reforma Tributária', count: 2345 },
  { id: '2', topic: 'Eleições 2026', count: 1876 },
  { id: '3', topic: 'Copa do Mundo', count: 1543 },
  { id: '4', topic: 'Inteligência Artificial', count: 1234 },
  { id: '5', topic: 'Dólar Hoje', count: 987 },
]

const mockMostRead = [
  {
    id: '1', title: 'Governo anuncia novo pacote econômico', slug: 'governo-pacote',
    excerpt: '', content: '', cover_image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#FF0000', description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 12345,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Bolsa de valores bate recorde histórico', slug: 'bolsa-recorde',
    excerpt: '', content: '', cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: '#16a34a', description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 9876,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Brasil vence Argentina nas Eliminatórias', slug: 'brasil-argentina',
    excerpt: '', content: '', cover_image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    category_id: '5', category: { id: '5', name: 'Esportes', slug: 'esportes', color: '#ea580c', description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 8765,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
]

export function Sidebar({ trendingArticles, mostReadArticles }: SidebarProps) {
  const trending = mockTrending
  const mostRead = mostReadArticles || mockMostRead

  return (
    <aside className="space-y-8">
      {/* Ad Banner */}
      <AdBanner slot="sidebar-top" className="h-[250px]" />

      {/* Trending Topics */}
      <div className="bg-card rounded-xl p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg">Trending</h3>
        </div>
        <ul className="space-y-3">
          {trending.map((topic, index) => (
            <li key={topic.id}>
              <Link
                href={`/busca?q=${encodeURIComponent(topic.topic)}`}
                className="flex items-center gap-3 group"
              >
                <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {topic.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {topic.count.toLocaleString('pt-BR')} menções
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Most Read */}
      <div className="bg-muted/50 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">🔥 Mais Lidas</h3>
        <div className="space-y-1">
          {mostRead.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={{ ...article, views: index + 1 }} 
              variant="compact" 
            />
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Ad Banner */}
      <AdBanner slot="sidebar-bottom" className="h-[250px]" />
    </aside>
  )
}

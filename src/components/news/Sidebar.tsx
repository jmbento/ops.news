'use client'

import { useState } from 'react'
import { TrendingUp, Flame, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { NewsCard, NewsCardSkeleton } from './NewsCard'
import { NewsletterSignup } from './NewsletterSignup'
import { AdBanner } from '@/components/ads/AdBanner'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/lib/constants'
import type { Article } from '@/types/database'

interface SidebarProps {
  trendingTopics?: { topic: string; count: number }[]
  mostReadArticles?: Article[]
}

// Mock data
const mockTrending = [
  { topic: 'Reforma Tributária', count: 23450 },
  { topic: 'Eleições 2026', count: 18760 },
  { topic: 'Copa do Mundo', count: 15430 },
  { topic: 'Inteligência Artificial', count: 12340 },
  { topic: 'Dólar Hoje', count: 9870 },
]

const mockMostRead: Article[] = [
  {
    id: '1', title: 'Governo anuncia pacote econômico', slug: 'governo-pacote',
    excerpt: '', content: '', cover_image: '',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: COLORS.categories.politica, description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 12345,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Bolsa de valores bate recorde histórico', slug: 'bolsa-recorde',
    excerpt: '', content: '', cover_image: '',
    category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: COLORS.categories.economia, description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 9876,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Brasil vence Argentina nas Eliminatórias', slug: 'brasil-argentina',
    excerpt: '', content: '', cover_image: '',
    category_id: '5', category: { id: '5', name: 'Esportes', slug: 'esportes', color: COLORS.categories.esportes, description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 8765,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '4', title: 'Nova vacina contra gripe disponível no SUS', slug: 'vacina-gripe',
    excerpt: '', content: '', cover_image: '',
    category_id: '8', category: { id: '8', name: 'Saúde', slug: 'saude', color: COLORS.categories.saude, description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 7654,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '5', title: 'ChatGPT ganha nova versão com vídeo', slug: 'chatgpt-video',
    excerpt: '', content: '', cover_image: '',
    category_id: '3', category: { id: '3', name: 'Tecnologia', slug: 'tecnologia', color: COLORS.categories.tecnologia, description: null, created_at: '' },
    author: 'Redação', is_featured: false, is_published: true, views: 6543,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
]

export function Sidebar({ trendingTopics, mostReadArticles }: SidebarProps) {
  const trending = trendingTopics || mockTrending
  const mostRead = mostReadArticles || mockMostRead

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2">
      {/* Sidebar Ad */}
      <AdBanner slot="sidebar-top" className="h-[250px]" />

      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-xl p-6 border shadow-sm"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-bold text-lg">Trending</h3>
        </div>
        <ul className="space-y-4">
          {trending.slice(0, 5).map((item, index) => (
            <motion.li
              key={item.topic}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/busca?q=${encodeURIComponent(item.topic)}`}
                className="flex items-center gap-3 group"
              >
                <span className="text-2xl font-black text-muted-foreground/20 group-hover:text-primary transition-colors w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                    {item.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.count.toLocaleString('pt-BR')} menções
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Most Read */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Flame className="h-5 w-5 text-orange-500" />
          <h3 className="font-bold text-lg">Mais Lidas</h3>
        </div>
        <div className="space-y-1">
          {mostRead.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              variant="compact"
              index={index}
              trending={index < 3}
            />
          ))}
        </div>
      </motion.div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-xl p-6 border shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4">Siga-nos</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full" asChild>
            <a href="https://twitter.com/opsnews" target="_blank" rel="noopener noreferrer">
              𝕏 Twitter
            </a>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="https://instagram.com/opsnews" target="_blank" rel="noopener noreferrer">
              📷 Instagram
            </a>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="https://facebook.com/opsnews" target="_blank" rel="noopener noreferrer">
              📘 Facebook
            </a>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Bottom Ad */}
      <AdBanner slot="sidebar-bottom" className="h-[250px]" />
    </aside>
  )
}

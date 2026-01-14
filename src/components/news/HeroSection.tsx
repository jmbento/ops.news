'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, AlertTriangle, Radio } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { COLORS } from '@/lib/constants'
import type { Article } from '@/types/database'

interface HeroSectionProps {
  mainArticle: Article
  secondaryArticles: Article[]
}

export function HeroSection({ mainArticle, secondaryArticles }: HeroSectionProps) {
  const mainCategorySlug = mainArticle.category?.slug || 'geral'
  const mainCategoryName = mainArticle.category?.name || 'Geral'
  const mainCategoryColor = mainArticle.category?.color || COLORS.primary.red

  const mainRelativeTime = mainArticle.published_at
    ? formatDistanceToNow(new Date(mainArticle.published_at), { addSuffix: true, locale: ptBR })
    : ''

  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Main Featured Article - 3/5 width */}
      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/${mainCategorySlug}/${mainArticle.slug}`} className="group block">
          <article className="relative aspect-[16/10] lg:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={mainArticle.cover_image || '/images/placeholder.jpg'}
              alt={mainArticle.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  className="text-sm font-bold px-3 py-1"
                  style={{ backgroundColor: mainCategoryColor }}
                >
                  {mainCategoryName}
                </Badge>
                {mainArticle.is_featured && (
                  <Badge className="bg-yellow-500 text-black text-sm font-bold">
                    DESTAQUE
                  </Badge>
                )}
              </div>
              
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-4 max-w-4xl group-hover:text-red-400 transition-colors">
                {mainArticle.title}
              </h1>
              
              {/* Excerpt */}
              {mainArticle.excerpt && (
                <p className="text-white/80 text-base md:text-lg max-w-2xl line-clamp-2 mb-4 hidden md:block">
                  {mainArticle.excerpt}
                </p>
              )}
              
              {/* Meta */}
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="font-medium text-white">{mainArticle.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {mainRelativeTime}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>

      {/* Secondary Articles - 2/5 width */}
      <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
        {secondaryArticles.slice(0, 3).map((article, index) => {
          const categorySlug = article.category?.slug || 'geral'
          const categoryName = article.category?.name || 'Geral'
          const categoryColor = article.category?.color || COLORS.primary.blue
          
          const relativeTime = article.published_at
            ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true, locale: ptBR })
            : ''

          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              className={index === 2 ? 'col-span-2 lg:col-span-1' : ''}
            >
              <Link
                href={`/${categorySlug}/${article.slug}`}
                className="group block h-full"
              >
                <article className="relative h-full min-h-[160px] lg:min-h-[140px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={article.cover_image || '/images/placeholder.jpg'}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <Badge
                      className="w-fit mb-2 text-xs"
                      style={{ backgroundColor: categoryColor }}
                    >
                      {categoryName}
                    </Badge>
                    <h2 className="font-bold text-white text-sm md:text-base line-clamp-2 group-hover:text-red-400 transition-colors">
                      {article.title}
                    </h2>
                    <span className="text-white/60 text-xs mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {relativeTime}
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

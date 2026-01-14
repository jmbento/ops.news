'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock } from 'lucide-react'
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
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-1">
      {/* Main Featured Article - 3/5 width - Estilo Metrópoles */}
      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link href={`/${mainCategorySlug}/${mainArticle.slug}`} className="group block">
          <article className="relative aspect-[16/10] lg:aspect-[16/11] overflow-hidden">
            <Image
              src={mainArticle.cover_image || '/images/placeholder.jpg'}
              alt={mainArticle.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-102"
            />
            
            {/* Gradient Overlay - Estilo Metrópoles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
              {/* Category Badge */}
              <Badge
                className="w-fit mb-3 text-xs font-bold px-3 py-1 rounded-none uppercase tracking-wide"
                style={{ backgroundColor: mainCategoryColor }}
              >
                {mainCategoryName}
              </Badge>
              
              {/* Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-tight mb-3 max-w-4xl group-hover:underline decoration-2 underline-offset-4">
                {mainArticle.title}
              </h1>
              
              {/* Excerpt */}
              {mainArticle.excerpt && (
                <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2 mb-3 hidden md:block">
                  {mainArticle.excerpt}
                </p>
              )}
              
              {/* Meta */}
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {mainRelativeTime}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>

      {/* Secondary Articles - 2/5 width - Estilo Metrópoles */}
      <div className="lg:col-span-2 flex flex-col gap-1">
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
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
              className="flex-1"
            >
              <Link href={`/${categorySlug}/${article.slug}`} className="group block h-full">
                <article className="relative h-full min-h-[140px] overflow-hidden">
                  <Image
                    src={article.cover_image || '/images/placeholder.jpg'}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-102"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <Badge
                      className="w-fit mb-2 text-[10px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wide"
                      style={{ backgroundColor: categoryColor }}
                    >
                      {categoryName}
                    </Badge>
                    <h2 className="font-bold text-white text-sm md:text-base line-clamp-2 group-hover:underline decoration-1 underline-offset-2">
                      {article.title}
                    </h2>
                    <span className="text-white/60 text-[10px] mt-2 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
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

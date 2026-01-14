'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, Eye, Flame, AlertTriangle, Radio } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { COLORS } from '@/lib/constants'
import type { Article } from '@/types/database'

interface NewsCardProps {
  article: Article
  variant?: 'vertical' | 'horizontal' | 'compact'
  trending?: boolean
  urgente?: boolean
  aoVivo?: boolean
  index?: number
}

export function NewsCard({ 
  article, 
  variant = 'vertical',
  trending = false,
  urgente = false,
  aoVivo = false,
  index = 0
}: NewsCardProps) {
  const categorySlug = article.category?.slug || 'geral'
  const categoryName = article.category?.name || 'Geral'
  const categoryColor = article.category?.color || COLORS.primary.blue

  const relativeTime = article.published_at
    ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true, locale: ptBR })
    : ''

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.05, duration: 0.3 }
    }
  }

  // Compact variant (sidebar)
  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link href={`/${categorySlug}/${article.slug}`}>
          <div className="group flex items-start gap-3 py-3 border-b last:border-0 hover:bg-muted/50 -mx-2 px-2 transition-colors">
            <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span>{relativeTime}</span>
                {trending && <Flame className="h-3 w-3 text-orange-500" />}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Horizontal variant - Estilo Metrópoles
  if (variant === 'horizontal') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link href={`/${categorySlug}/${article.slug}`}>
          <article className="group flex gap-4 py-4 border-b hover:bg-muted/30 transition-colors">
            {/* Image - Sem cantos arredondados */}
            <div className="relative w-36 md:w-48 h-24 md:h-32 shrink-0 overflow-hidden">
              <Image
                src={article.cover_image || '/images/placeholder.jpg'}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
              {/* Category Badge */}
              <div className="absolute top-0 left-0">
                <Badge 
                  style={{ backgroundColor: categoryColor }} 
                  className="text-[10px] font-bold rounded-none px-2 py-0.5 uppercase"
                >
                  {categoryName}
                </Badge>
              </div>
              {urgente && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-red-600 text-white text-[10px] rounded-none animate-pulse">
                    URGENTE
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-primary group-hover:underline decoration-1 underline-offset-2 transition-colors mb-2">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2 hidden md:block">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {relativeTime}
                </span>
                {article.views > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    )
  }

  // Vertical variant (default) - Estilo Metrópoles
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link href={`/${categorySlug}/${article.slug}`}>
        <article className="group overflow-hidden bg-background hover:bg-muted/30 transition-colors">
          {/* Image - Sem cantos arredondados */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.cover_image || '/images/placeholder.jpg'}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-0 left-0 flex gap-0">
              <Badge 
                style={{ backgroundColor: categoryColor }}
                className="rounded-none text-xs font-bold uppercase px-3 py-1"
              >
                {categoryName}
              </Badge>
              {urgente && (
                <Badge className="bg-red-600 text-white rounded-none text-xs font-bold animate-pulse">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  URGENTE
                </Badge>
              )}
              {aoVivo && (
                <Badge className="bg-red-500 text-white rounded-none text-xs font-bold">
                  <Radio className="h-3 w-3 mr-1 animate-pulse" />
                  AO VIVO
                </Badge>
              )}
            </div>

            {/* Trending badge */}
            {trending && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-orange-500 text-white rounded-none text-xs">
                  <Flame className="h-3 w-3 mr-1" />
                  EM ALTA
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-primary group-hover:underline decoration-1 underline-offset-2 transition-colors mb-2">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {relativeTime}
              </span>
              {article.views > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views.toLocaleString('pt-BR')}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

// Loading skeleton
export function NewsCardSkeleton({ variant = 'vertical' }: { variant?: 'vertical' | 'horizontal' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-3 py-3">
        <Skeleton className="w-8 h-8" />
        <div className="flex-1">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 py-4 border-b">
        <Skeleton className="w-36 md:w-48 h-24 md:h-32" />
        <div className="flex-1 py-2">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, Eye, Flame, AlertTriangle, Radio } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1, duration: 0.4 }
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
          <div className="group flex items-start gap-3 py-3 border-b last:border-0 hover:bg-muted/50 -mx-2 px-2 rounded transition-colors">
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

  // Horizontal variant
  if (variant === 'horizontal') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link href={`/${categorySlug}/${article.slug}`}>
          <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all">
            <CardContent className="p-0 flex gap-4">
              {/* Image */}
              <div className="relative w-40 md:w-56 h-32 md:h-40 shrink-0 overflow-hidden">
                <Image
                  src={article.cover_image || '/images/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Badge style={{ backgroundColor: categoryColor }} className="text-xs">
                    {categoryName}
                  </Badge>
                  {urgente && (
                    <Badge className="bg-red-600 text-white text-xs animate-pulse">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      URGENTE
                    </Badge>
                  )}
                  {aoVivo && (
                    <Badge className="bg-red-500 text-white text-xs">
                      <Radio className="h-3 w-3 mr-1 animate-pulse" />
                      AO VIVO
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center py-3 pr-4 flex-1">
                <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 hidden md:block">
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
                  {trending && (
                    <span className="flex items-center gap-1 text-orange-500">
                      <Flame className="h-3 w-3" />
                      Trending
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    )
  }

  // Vertical variant (default)
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link href={`/${categorySlug}/${article.slug}`}>
        <Card className="group overflow-hidden h-full border-0 shadow-md hover:shadow-xl transition-all">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={article.cover_image || '/images/placeholder.jpg'}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <Badge style={{ backgroundColor: categoryColor }}>
                {categoryName}
              </Badge>
              {urgente && (
                <Badge className="bg-red-600 text-white animate-pulse">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  URGENTE
                </Badge>
              )}
              {aoVivo && (
                <Badge className="bg-red-500 text-white">
                  <Radio className="h-3 w-3 mr-1 animate-pulse" />
                  AO VIVO
                </Badge>
              )}
            </div>

            {/* Trending badge */}
            {trending && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-orange-500 text-white">
                  <Flame className="h-3 w-3 mr-1" />
                  🔥
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-4">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
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
          </CardContent>
        </Card>
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
      <div className="flex gap-4">
        <Skeleton className="w-40 md:w-56 h-32 md:h-40 rounded-lg" />
        <div className="flex-1 py-3">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}

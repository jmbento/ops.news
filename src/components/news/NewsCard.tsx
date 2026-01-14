import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Article } from '@/types/database'

interface NewsCardProps {
  article: Article
  variant?: 'default' | 'horizontal' | 'compact'
}

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const categorySlug = article.category?.slug || 'geral'
  const categoryName = article.category?.name || 'Geral'
  const categoryColor = article.category?.color || '#6b7280'

  const formattedDate = article.published_at
    ? format(new Date(article.published_at), "dd 'de' MMM, yyyy", { locale: ptBR })
    : ''

  if (variant === 'horizontal') {
    return (
      <Link href={`/${categorySlug}/${article.slug}`}>
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-transparent">
          <CardContent className="p-0 flex gap-4">
            <div className="relative w-32 h-24 md:w-48 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={article.cover_image || '/images/placeholder.jpg'}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center py-1">
              <Badge
                variant="secondary"
                className="w-fit mb-2 text-xs"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
              >
                {categoryName}
              </Badge>
              <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <span className="text-xs text-muted-foreground mt-1">{formattedDate}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/${categorySlug}/${article.slug}`}>
        <div className="group flex items-start gap-3 py-3 border-b last:border-0">
          <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
            {String(article.views || 0).padStart(2, '0')}
          </span>
          <div>
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/${categorySlug}/${article.slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-0 shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.cover_image || '/images/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge
            className="absolute top-3 left-3 text-xs font-medium"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryName}
          </Badge>
        </div>
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
            <span>{article.author}</span>
            <span>{formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

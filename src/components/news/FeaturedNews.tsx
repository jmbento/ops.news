import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import type { Article } from '@/types/database'

interface FeaturedNewsProps {
  article: Article
}

export function FeaturedNews({ article }: FeaturedNewsProps) {
  const categorySlug = article.category?.slug || 'geral'
  const categoryName = article.category?.name || 'Geral'
  const categoryColor = article.category?.color || '#dc2626'

  const formattedDate = article.published_at
    ? format(new Date(article.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR })
    : ''

  return (
    <Link href={`/${categorySlug}/${article.slug}`} className="block group">
      <article className="relative aspect-[21/9] md:aspect-[21/8] rounded-2xl overflow-hidden">
        <Image
          src={article.cover_image || '/images/placeholder.jpg'}
          alt={article.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <Badge
            className="w-fit mb-4 text-sm font-semibold px-4 py-1"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryName}
          </Badge>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl group-hover:text-red-400 transition-colors">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-white/80 text-sm md:text-lg max-w-2xl line-clamp-2 mb-4">
              {article.excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <time>{formattedDate}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}

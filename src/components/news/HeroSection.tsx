import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import type { Article } from '@/types/database'

interface HeroSectionProps {
  mainArticle: Article
  secondaryArticles: Article[]
}

export function HeroSection({ mainArticle, secondaryArticles }: HeroSectionProps) {
  const mainCategorySlug = mainArticle.category?.slug || 'geral'
  const mainCategoryName = mainArticle.category?.name || 'Geral'
  const mainCategoryColor = mainArticle.category?.color || '#FF0000'

  const mainFormattedDate = mainArticle.published_at
    ? format(new Date(mainArticle.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR })
    : ''

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Featured Article */}
      <Link 
        href={`/${mainCategorySlug}/${mainArticle.slug}`} 
        className="lg:col-span-2 group block"
      >
        <article className="relative aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden">
          <Image
            src={mainArticle.cover_image || '/images/placeholder.jpg'}
            alt={mainArticle.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <Badge
              className="w-fit mb-4 text-sm font-semibold px-4 py-1"
              style={{ backgroundColor: mainCategoryColor }}
            >
              {mainCategoryName}
            </Badge>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 max-w-3xl group-hover:text-red-400 transition-colors">
              {mainArticle.title}
            </h1>
            
            {mainArticle.excerpt && (
              <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2 mb-4">
                {mainArticle.excerpt}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="font-medium">{mainArticle.author}</span>
              <span>•</span>
              <time>{mainFormattedDate}</time>
            </div>
          </div>
        </article>
      </Link>

      {/* Secondary Articles */}
      <div className="flex flex-col gap-4">
        {secondaryArticles.slice(0, 3).map((article) => {
          const categorySlug = article.category?.slug || 'geral'
          const categoryName = article.category?.name || 'Geral'
          const categoryColor = article.category?.color || '#0066CC'
          
          const formattedDate = article.published_at
            ? format(new Date(article.published_at), "dd/MM", { locale: ptBR })
            : ''

          return (
            <Link
              key={article.id}
              href={`/${categorySlug}/${article.slug}`}
              className="group flex-1"
            >
              <article className="relative h-full min-h-[140px] rounded-xl overflow-hidden">
                <Image
                  src={article.cover_image || '/images/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
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
                  <span className="text-white/60 text-xs mt-1">{formattedDate}</span>
                </div>
              </article>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

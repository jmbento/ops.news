import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, Clock, Eye, Share2, Facebook, Twitter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NewsCard } from '@/components/news/NewsCard'
import { AdBanner } from '@/components/ads/AdBanner'
import { getArticleBySlug, getRelatedArticles } from '@/lib/supabase/queries'
import { categories, siteConfig } from '@/lib/constants'

interface ArticlePageProps {
  params: Promise<{ categoria: string; slug: string }>
}

// Mock article para demonstração
const mockArticle = {
  id: '1',
  title: 'Governo anuncia novo pacote de medidas econômicas para 2026',
  slug: 'governo-anuncia-novo-pacote-medidas-economicas',
  excerpt: 'As novas medidas visam estimular o crescimento econômico e reduzir a inflação nos próximos meses.',
  content: `
    <p>O governo federal anunciou nesta terça-feira um amplo pacote de medidas econômicas que promete transformar o cenário fiscal do país nos próximos anos. A iniciativa, batizada de "Programa Brasil Novo", foi apresentada pelo ministro da Economia em coletiva de imprensa no Palácio do Planalto.</p>
    
    <h2>Principais medidas</h2>
    <p>Entre as principais medidas anunciadas, destacam-se:</p>
    <ul>
      <li>Redução da taxa básica de juros em 0,5 pontos percentuais</li>
      <li>Ampliação do programa de crédito para pequenas empresas</li>
      <li>Novos incentivos fiscais para o setor de tecnologia</li>
      <li>Programa de renegociação de dívidas para famílias</li>
    </ul>
    
    <h2>Impacto esperado</h2>
    <p>Segundo analistas do mercado financeiro, as medidas devem ter um impacto positivo significativo na economia brasileira. A expectativa é de que o PIB cresça adicionais 0,3% em 2026, chegando a uma expansão total de 3,2% no ano.</p>
    
    <blockquote>
      "Este é um pacote histórico que vai beneficiar milhões de brasileiros. Estamos comprometidos com a retomada do crescimento sustentável", afirmou o ministro durante a coletiva.
    </blockquote>
    
    <h2>Reações do mercado</h2>
    <p>O mercado financeiro reagiu positivamente ao anúncio. A Bolsa de Valores subiu 2,3% no pregão desta tarde, enquanto o dólar recuou para R$ 4,85. Investidores estrangeiros também demonstraram otimismo com as novas medidas.</p>
    
    <p>Os próximos passos incluem a votação de projetos de lei complementares no Congresso Nacional, com expectativa de aprovação ainda neste semestre.</p>
  `,
  cover_image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200',
  category_id: '1',
  category: { id: '1', name: 'Política', slug: 'politica', color: '#dc2626', description: null, created_at: '' },
  author: 'João Silva',
  is_featured: true,
  is_published: true,
  views: 12345,
  published_at: new Date().toISOString(),
  created_at: '',
  updated_at: '',
}

const mockRelatedArticles = [
  {
    id: '2', title: 'Congresso debate reforma tributária', slug: 'congresso-reforma-tributaria',
    excerpt: 'Deputados iniciam votação de mudanças no sistema de impostos.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#dc2626', description: null, created_at: '' },
    author: 'Maria Santos', is_featured: false, is_published: true, views: 892,
    published_at: new Date(Date.now() - 86400000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Senado aprova novo marco regulatório', slug: 'senado-marco-regulatorio',
    excerpt: 'Nova legislação moderniza setor de telecomunicações.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#dc2626', description: null, created_at: '' },
    author: 'Pedro Costa', is_featured: false, is_published: true, views: 567,
    published_at: new Date(Date.now() - 172800000).toISOString(), created_at: '', updated_at: '',
  },
]

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { categoria, slug } = await params
  
  let article = await getArticleBySlug(slug)
  if (!article) {
    article = mockArticle
  }

  return {
    title: article.title,
    description: article.excerpt || '',
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      type: 'article',
      publishedTime: article.published_at || undefined,
      authors: [article.author],
      images: article.cover_image ? [{ url: article.cover_image, width: 1200, height: 630 }] : [],
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || '',
      images: article.cover_image ? [article.cover_image] : [],
    },
    alternates: {
      canonical: `https://ops.news/${categoria}/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { categoria, slug } = await params
  
  const categoryInfo = categories.find((c) => c.slug === categoria)
  if (!categoryInfo) {
    notFound()
  }

  let article = await getArticleBySlug(slug)
  let relatedArticles = article?.category_id 
    ? await getRelatedArticles(article.category_id, article.id)
    : []

  // Usa mock se não encontrar
  if (!article) {
    article = mockArticle
    relatedArticles = mockRelatedArticles
  }

  const formattedDate = article.published_at
    ? format(new Date(article.published_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
    : ''

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${categoria}/${slug}`,
    },
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/${categoria}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para {categoryInfo.name}
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <Badge
            className="mb-4"
            style={{ backgroundColor: categoryInfo.color }}
          >
            {categoryInfo.name}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="font-medium text-foreground">{article.author}</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formattedDate}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString('pt-BR')} visualizações
            </span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Compartilhar:</span>
            <Button variant="outline" size="icon" asChild>
              <a
                href={`https://twitter.com/intent/tweet?url=${siteConfig.url}/${categoria}/${slug}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${siteConfig.url}/${categoria}/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="relative aspect-video max-w-5xl mx-auto mb-8 rounded-2xl overflow-hidden">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Ad Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <AdBanner slot="article-top" className="h-24" />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Ad Banner */}
        <div className="max-w-4xl mx-auto my-12">
          <AdBanner slot="article-bottom" className="h-24" />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-5xl mx-auto mt-12">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">Notícias Relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

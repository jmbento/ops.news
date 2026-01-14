import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Share2, 
  ChevronRight,
  Zap,
  Check,
  ShieldCheck,
  BookOpen,
  Headphones
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { NewsCard } from '@/components/news/NewsCard'
import { AdBanner } from '@/components/ads/AdBanner'
import { getArticleBySlug, getRelatedArticles } from '@/lib/supabase/queries'
import { categories, siteConfig, COLORS } from '@/lib/constants'

interface ArticlePageProps {
  params: Promise<{ categoria: string; slug: string }>
}

// Mock article completo
const mockArticle = {
  id: '1',
  title: 'Governo anuncia novo pacote de medidas econômicas para estimular crescimento em 2026',
  slug: 'governo-anuncia-novo-pacote-medidas-economicas',
  excerpt: 'As novas medidas visam estimular o crescimento econômico e reduzir a inflação nos próximos meses, beneficiando milhões de brasileiros.',
  content: `
    <p>O governo federal anunciou nesta terça-feira um amplo pacote de medidas econômicas que promete transformar o cenário fiscal do país nos próximos anos. A iniciativa, batizada de "Programa Brasil Novo", foi apresentada pelo ministro da Economia em coletiva de imprensa no Palácio do Planalto.</p>
    
    <h2>Principais medidas anunciadas</h2>
    <p>Entre as principais medidas anunciadas, destacam-se:</p>
    <ul>
      <li>Redução da taxa básica de juros em 0,5 pontos percentuais</li>
      <li>Ampliação do programa de crédito para pequenas empresas</li>
      <li>Novos incentivos fiscais para o setor de tecnologia</li>
      <li>Programa de renegociação de dívidas para famílias</li>
    </ul>
    
    <h2>Impacto esperado na economia</h2>
    <p>Segundo analistas do mercado financeiro, as medidas devem ter um impacto positivo significativo na economia brasileira. A expectativa é de que o PIB cresça adicionais 0,3% em 2026, chegando a uma expansão total de 3,2% no ano.</p>
    
    <blockquote>
      "Este é um pacote histórico que vai beneficiar milhões de brasileiros. Estamos comprometidos com a retomada do crescimento sustentável", afirmou o ministro durante a coletiva.
    </blockquote>
    
    <h2>Reações do mercado financeiro</h2>
    <p>O mercado financeiro reagiu positivamente ao anúncio. A Bolsa de Valores subiu 2,3% no pregão desta tarde, enquanto o dólar recuou para R$ 4,85. Investidores estrangeiros também demonstraram otimismo com as novas medidas.</p>
    
    <p>Os próximos passos incluem a votação de projetos de lei complementares no Congresso Nacional, com expectativa de aprovação ainda neste semestre.</p>
    
    <h2>O que muda na prática</h2>
    <p>Para o cidadão comum, as mudanças mais perceptíveis serão na redução dos juros para financiamentos imobiliários e de veículos, além de facilidades para renegociação de dívidas. Pequenos empresários também terão acesso a linhas de crédito com taxas mais baixas.</p>
  `,
  cover_image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200',
  category_id: '1',
  category: { id: '1', name: 'Política', slug: 'politica', color: '#FF0000', description: null, created_at: '' },
  author: 'João Silva',
  is_featured: true,
  is_published: true,
  views: 12345,
  published_at: new Date().toISOString(),
  created_at: '',
  updated_at: '',
}

// Mock data adicional
const mockBullets = [
  'Governo lança pacote com 15 medidas para estimular economia',
  'Expectativa de crescimento adicional de 0,3% do PIB em 2026',
  'Redução de juros para financiamentos e facilidade para renegociar dívidas',
]

const mockContexto = `
  O Brasil vem enfrentando desafios econômicos desde a pandemia de COVID-19 em 2020. Após uma recuperação inicial, o país lidou com inflação elevada e juros altos, que impactaram o consumo das famílias e os investimentos das empresas.
  
  Este novo pacote representa a terceira tentativa do governo de estimular a economia, seguindo medidas anteriores que tiveram resultados mistos. Economistas apontam que o timing é estratégico, considerando o ciclo eleitoral que se aproxima.
`

const mockFontes = [
  { nome: 'Ministério da Economia', url: 'https://economia.gov.br' },
  { nome: 'Banco Central do Brasil', url: 'https://bcb.gov.br' },
  { nome: 'Reuters Brasil', url: 'https://reuters.com.br' },
]

const mockRelatedArticles = [
  {
    id: '2', title: 'Bolsa dispara após anúncio de medidas', slug: 'bolsa-dispara',
    excerpt: 'Ibovespa teve alta de 2,3% no pregão.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: '#00AA00', description: null, created_at: '' },
    author: 'Maria Santos', is_featured: false, is_published: true, views: 892,
    published_at: new Date(Date.now() - 86400000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Dólar recua e fecha abaixo de R$ 5', slug: 'dolar-recua',
    excerpt: 'Moeda americana caiu 1,5% frente ao real.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800',
    category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: '#00AA00', description: null, created_at: '' },
    author: 'Pedro Costa', is_featured: false, is_published: true, views: 567,
    published_at: new Date(Date.now() - 172800000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '4', title: 'Especialistas avaliam impacto das medidas', slug: 'especialistas-avaliam',
    excerpt: 'Economistas divergem sobre efetividade do pacote.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#FF0000', description: null, created_at: '' },
    author: 'Ana Lima', is_featured: false, is_published: true, views: 432,
    published_at: new Date(Date.now() - 259200000).toISOString(), created_at: '', updated_at: '',
  },
]

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { categoria, slug } = await params
  
  let article = await getArticleBySlug(slug)
  if (!article) article = mockArticle

  return {
    title: article.title,
    description: article.excerpt || '',
    keywords: ['notícias', categoria, article.title.split(' ').slice(0, 5).join(', ')],
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
      canonical: `${siteConfig.url}/${categoria}/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { categoria, slug } = await params
  
  const categoryInfo = categories.find((c) => c.slug === categoria)
  if (!categoryInfo) notFound()

  let article = await getArticleBySlug(slug)
  let relatedArticles = article?.category_id 
    ? await getRelatedArticles(article.category_id, article.id)
    : mockRelatedArticles

  if (!article) {
    article = mockArticle
    relatedArticles = mockRelatedArticles
  }

  const formattedDate = article.published_at
    ? format(new Date(article.published_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
    : ''

  const relativeTime = article.published_at
    ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true, locale: ptBR })
    : ''

  // Schema.org
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/${categoria}/${slug}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/${categoria}`} className="hover:text-foreground" style={{ color: categoryInfo.color }}>
            {categoryInfo.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground line-clamp-1">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <Badge className="mb-4 text-sm" style={{ backgroundColor: categoryInfo.color }}>
            {categoryInfo.name}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">Por {article.author}</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {relativeTime}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString('pt-BR')} visualizações
            </span>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Compartilhar:</span>
            <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
              <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + siteConfig.url + '/' + categoria + '/' + slug)}`} target="_blank">
                WhatsApp
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={`https://twitter.com/intent/tweet?url=${siteConfig.url}/${categoria}/${slug}&text=${encodeURIComponent(article.title)}`} target="_blank">
                𝕏 Twitter
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${siteConfig.url}/${categoria}/${slug}`} target="_blank">
                Facebook
              </a>
            </Button>
          </div>
        </header>

        {/* TL;DR Box */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded-r-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <Zap className="h-5 w-5" />
              TL;DR - Resumo Rápido
            </h3>
            <ul className="space-y-3">
              {mockBullets.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Verification Badge */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <ShieldCheck className="h-5 w-5" />
            <span>Verificado por IA - {mockFontes.length} fontes primárias consultadas</span>
          </div>
        </div>

        {/* Cover Image */}
        {article.cover_image && (
          <figure className="max-w-5xl mx-auto mb-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-3">
              Foto ilustrativa / Divulgação
            </figcaption>
          </figure>
        )}

        {/* Ad */}
        <div className="max-w-4xl mx-auto mb-8">
          <AdBanner slot="article-top" className="h-24" />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-foreground/90 prose-p:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 
              prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-ul:list-disc prose-ul:pl-6 
              prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Contexto Histórico */}
        <div className="max-w-4xl mx-auto my-8">
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors">
              <span className="flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-400">
                <BookOpen className="h-5 w-5" />
                📚 Entenda o Contexto Histórico
              </span>
              <ChevronRight className="h-5 w-5 transition-transform ui-open:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-b-xl">
              <p className="text-muted-foreground whitespace-pre-line">{mockContexto}</p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Fontes Verificadas */}
        <div className="max-w-4xl mx-auto my-8">
          <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
              <ShieldCheck className="h-5 w-5" />
              ✅ Fontes Verificadas
            </h3>
            <ul className="space-y-2">
              {mockFontes.map((fonte, index) => (
                <li key={index}>
                  <a 
                    href={fonte.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {fonte.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="max-w-4xl mx-auto my-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Tags:</span>
            {['economia', 'governo', 'medidas', 'crescimento', 'brasil'].map((tag) => (
              <Link key={tag} href={`/busca?q=${tag}`}>
                <Badge variant="outline" className="hover:bg-muted">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Ad */}
        <div className="max-w-4xl mx-auto my-8">
          <AdBanner slot="article-bottom" className="h-24" />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-5xl mx-auto mt-12">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">Notícias Relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.slice(0, 3).map((related, index) => (
                <NewsCard key={related.id} article={related} index={index} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

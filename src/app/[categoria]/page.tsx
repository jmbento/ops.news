import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FeaturedNews } from '@/components/news/FeaturedNews'
import { NewsGrid } from '@/components/news/NewsGrid'
import { AdBanner } from '@/components/ads/AdBanner'
import { getArticles, getCategoryBySlug } from '@/lib/supabase/queries'
import { categories } from '@/lib/constants'

interface CategoryPageProps {
  params: Promise<{ categoria: string }>
}

// Dados mock para demonstração
const mockArticlesByCategory = {
  politica: [
    {
      id: '1', title: 'Congresso aprova nova reforma tributária', slug: 'congresso-aprova-reforma',
      excerpt: 'Medida promete simplificar sistema de impostos no país.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
      category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#dc2626', description: null, created_at: '' },
      author: 'João Silva', is_featured: true, is_published: true, views: 1234,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
    {
      id: '2', title: 'Presidente anuncia novos ministros para o segundo mandato', slug: 'presidente-anuncia-ministros',
      excerpt: 'Mudanças na equipe ministerial devem acontecer até o fim do mês.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800',
      category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#dc2626', description: null, created_at: '' },
      author: 'Maria Santos', is_featured: false, is_published: true, views: 892,
      published_at: new Date(Date.now() - 3600000).toISOString(), created_at: '', updated_at: '',
    },
  ],
  economia: [
    {
      id: '3', title: 'Dólar fecha em queda após decisão do Fed', slug: 'dolar-queda-fed',
      excerpt: 'Moeda americana recuou 1,2% frente ao real.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: '#16a34a', description: null, created_at: '' },
      author: 'Carlos Lima', is_featured: true, is_published: true, views: 2341,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
  ],
  tecnologia: [
    {
      id: '4', title: 'Apple lança novo iPhone com inteligência artificial avançada', slug: 'apple-iphone-ia',
      excerpt: 'Novo modelo promete revolucionar a experiência mobile.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
      category_id: '3', category: { id: '3', name: 'Tecnologia', slug: 'tecnologia', color: '#2563eb', description: null, created_at: '' },
      author: 'Pedro Tech', is_featured: true, is_published: true, views: 5678,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
  ],
  entretenimento: [
    {
      id: '5', title: 'Novo filme brasileiro conquista prêmio em Cannes', slug: 'filme-brasileiro-cannes',
      excerpt: 'Produção nacional foi aclamada pela crítica internacional.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      category_id: '4', category: { id: '4', name: 'Entretenimento', slug: 'entretenimento', color: '#9333ea', description: null, created_at: '' },
      author: 'Ana Cinema', is_featured: true, is_published: true, views: 3456,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
  ],
  esportes: [
    {
      id: '6', title: 'Flamengo vence e assume liderança do Brasileirão', slug: 'flamengo-lideranca',
      excerpt: 'Rubro-negro carioca derrotou o rival por 3x1.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      category_id: '5', category: { id: '5', name: 'Esportes', slug: 'esportes', color: '#ea580c', description: null, created_at: '' },
      author: 'Roberto Gol', is_featured: true, is_published: true, views: 7890,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
  ],
  brasil: [
    {
      id: '7', title: 'Amazônia registra menor taxa de desmatamento em 5 anos', slug: 'amazonia-desmatamento',
      excerpt: 'Dados do INPE mostram redução significativa.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
      category_id: '6', category: { id: '6', name: 'Brasil', slug: 'brasil', color: '#0891b2', description: null, created_at: '' },
      author: 'Lucia Verde', is_featured: true, is_published: true, views: 4567,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
  ],
  mundo: [
    {
      id: '8', title: 'União Europeia anuncia novo acordo climático', slug: 'ue-acordo-climatico',
      excerpt: 'Países membros se comprometem com metas mais ambiciosas.',
      content: '', cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      category_id: '7', category: { id: '7', name: 'Mundo', slug: 'mundo', color: '#4f46e5', description: null, created_at: '' },
      author: 'Fernando Global', is_featured: true, is_published: true, views: 2345,
      published_at: new Date().toISOString(), created_at: '', updated_at: '',
    },
  ],
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categoria } = await params
  const categoryInfo = categories.find((c) => c.slug === categoria)

  if (!categoryInfo) {
    return { title: 'Categoria não encontrada' }
  }

  return {
    title: categoryInfo.name,
    description: `Últimas notícias de ${categoryInfo.name} no OPS News. Acompanhe as principais notícias e atualizações.`,
    openGraph: {
      title: `${categoryInfo.name} | OPS News`,
      description: `Últimas notícias de ${categoryInfo.name}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ops.news/${categoria}`,
    },
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    categoria: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params
  const categoryInfo = categories.find((c) => c.slug === categoria)

  if (!categoryInfo) {
    notFound()
  }

  // Tenta buscar do Supabase, senão usa mock
  let articles = await getArticles({ categorySlug: categoria, limit: 12 })
  
  if (articles.length === 0) {
    const mockKey = categoria as keyof typeof mockArticlesByCategory
    articles = mockArticlesByCategory[mockKey] || []
  }

  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <header className="mb-8">
        <h1
          className="text-4xl font-black mb-2"
          style={{ color: categoryInfo.color }}
        >
          {categoryInfo.name}
        </h1>
        <p className="text-muted-foreground">
          Últimas notícias e atualizações de {categoryInfo.name}
        </p>
      </header>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="mb-12">
          <FeaturedNews article={featuredArticle} />
        </section>
      )}

      {/* Ad Banner */}
      <section className="mb-12">
        <AdBanner slot={`category-${categoria}`} className="h-24" />
      </section>

      {/* Articles Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Mais Notícias</h2>
        <NewsGrid articles={otherArticles.length > 0 ? otherArticles : articles} columns={3} />
      </section>

      {/* Ad Banner */}
      <section className="mb-12">
        <AdBanner slot={`category-${categoria}-bottom`} className="h-24" />
      </section>
    </div>
  )
}

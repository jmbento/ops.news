import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '@/components/news/HeroSection'
import { NewsGrid } from '@/components/news/NewsGrid'
import { Sidebar } from '@/components/news/Sidebar'
import { AdBanner } from '@/components/ads/AdBanner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getArticles, getFeaturedArticle } from '@/lib/supabase/queries'
import { categories } from '@/lib/constants'

// Mock data completo
const mockArticles = [
  {
    id: '1', title: 'Governo anuncia novo pacote de medidas econômicas para 2026',
    slug: 'governo-anuncia-novo-pacote-medidas-economicas',
    excerpt: 'As novas medidas visam estimular o crescimento econômico e reduzir a inflação nos próximos meses.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#FF0000', description: null, created_at: '' },
    author: 'João Silva', is_featured: true, is_published: true, views: 12345,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Bolsa de valores atinge recorde histórico com otimismo do mercado',
    slug: 'bolsa-valores-recorde-historico',
    excerpt: 'Ibovespa ultrapassou os 150 mil pontos pela primeira vez na história.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: '#16a34a', description: null, created_at: '' },
    author: 'Maria Santos', is_featured: false, is_published: true, views: 8920,
    published_at: new Date(Date.now() - 3600000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Nova inteligência artificial brasileira promete revolucionar o mercado',
    slug: 'nova-ia-brasileira-revolucionar-mercado',
    excerpt: 'Startup nacional lança modelo de IA que compete com gigantes internacionais.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category_id: '3', category: { id: '3', name: 'Tecnologia', slug: 'tecnologia', color: '#0066CC', description: null, created_at: '' },
    author: 'Pedro Costa', is_featured: false, is_published: true, views: 7650,
    published_at: new Date(Date.now() - 7200000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '4', title: 'Brasil vence Argentina em clássico emocionante pelas Eliminatórias',
    slug: 'brasil-vence-argentina-eliminatorias',
    excerpt: 'Seleção brasileira garantiu vitória por 2x1 em jogo disputado no Maracanã.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    category_id: '5', category: { id: '5', name: 'Esportes', slug: 'esportes', color: '#ea580c', description: null, created_at: '' },
    author: 'Carlos Oliveira', is_featured: false, is_published: true, views: 15678,
    published_at: new Date(Date.now() - 10800000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '5', title: 'Festival de música reúne mais de 100 mil pessoas no Rio de Janeiro',
    slug: 'festival-musica-rio-janeiro',
    excerpt: 'Evento contou com artistas nacionais e internacionais durante três dias de shows.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    category_id: '4', category: { id: '4', name: 'Entretenimento', slug: 'entretenimento', color: '#9333ea', description: null, created_at: '' },
    author: 'Ana Paula', is_featured: false, is_published: true, views: 6540,
    published_at: new Date(Date.now() - 14400000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '6', title: 'Crise climática: cientistas alertam para aumento do nível do mar',
    slug: 'crise-climatica-nivel-mar',
    excerpt: 'Novo relatório aponta que cidades costeiras podem ser afetadas nas próximas décadas.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800',
    category_id: '7', category: { id: '7', name: 'Mundo', slug: 'mundo', color: '#4f46e5', description: null, created_at: '' },
    author: 'Roberto Lima', is_featured: false, is_published: true, views: 4320,
    published_at: new Date(Date.now() - 18000000).toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '7', title: 'Amazônia registra menor taxa de desmatamento em 5 anos',
    slug: 'amazonia-menor-desmatamento',
    excerpt: 'Dados do INPE mostram redução significativa na destruição da floresta.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    category_id: '6', category: { id: '6', name: 'Brasil', slug: 'brasil', color: '#0891b2', description: null, created_at: '' },
    author: 'Lucia Verde', is_featured: false, is_published: true, views: 5430,
    published_at: new Date(Date.now() - 21600000).toISOString(), created_at: '', updated_at: '',
  },
]

async function getHomeData() {
  try {
    const [featured, latest] = await Promise.all([
      getFeaturedArticle(),
      getArticles({ limit: 9 }),
    ])
    
    if (!featured && (!latest || latest.length === 0)) {
      return { featured: mockArticles[0], latest: mockArticles.slice(1) }
    }
    
    return {
      featured: featured || mockArticles[0],
      latest: latest.length > 0 ? latest : mockArticles.slice(1),
    }
  } catch {
    return { featured: mockArticles[0], latest: mockArticles.slice(1) }
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 aspect-[16/10] rounded-2xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="flex-1 min-h-[140px] rounded-xl" />
          <Skeleton className="flex-1 min-h-[140px] rounded-xl" />
          <Skeleton className="flex-1 min-h-[140px] rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default async function HomePage() {
  const { featured, latest } = await getHomeData()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <HeroSection 
            mainArticle={featured} 
            secondaryArticles={latest.slice(0, 3)} 
          />
        </Suspense>
      </section>

      {/* Ad Banner */}
      <section className="mb-12">
        <AdBanner slot="homepage-top" className="h-24" />
      </section>

      {/* Main content with sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Latest News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Últimas Notícias</h2>
              <Button variant="ghost" asChild>
                <Link href="/busca" className="flex items-center gap-2">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <NewsGrid articles={latest.slice(3, 9)} columns={2} />
          </div>

          {/* Ad Banner in content */}
          <AdBanner slot="homepage-incontent" className="h-24" />

          {/* Categories Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Explore por Categoria</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group relative overflow-hidden rounded-xl p-6 text-center transition-all hover:scale-105 border"
                  style={{ backgroundColor: `${category.color}10` }}
                >
                  <span
                    className="font-semibold transition-colors"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </section>
    </div>
  )
}

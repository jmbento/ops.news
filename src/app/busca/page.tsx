import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { NewsGrid } from '@/components/news/NewsGrid'
import { Skeleton } from '@/components/ui/skeleton'
import { AdBanner } from '@/components/ads/AdBanner'
import { searchArticles } from '@/lib/supabase/queries'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export const metadata = {
  title: 'Buscar Notícias',
  description: 'Busque por notícias no OPS News',
}

// Mock results
const mockResults = [
  {
    id: '1', title: 'Governo anuncia novo pacote de medidas econômicas', slug: 'governo-pacote-economico',
    excerpt: 'Novas medidas visam estimular crescimento.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    category_id: '1', category: { id: '1', name: 'Política', slug: 'politica', color: '#dc2626', description: null, created_at: '' },
    author: 'João Silva', is_featured: false, is_published: true, views: 1234,
    published_at: new Date().toISOString(), created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Bolsa de valores atinge recorde histórico', slug: 'bolsa-recorde',
    excerpt: 'Ibovespa ultrapassou os 150 mil pontos.',
    content: '', cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category_id: '2', category: { id: '2', name: 'Economia', slug: 'economia', color: '#16a34a', description: null, created_at: '' },
    author: 'Maria Santos', is_featured: false, is_published: true, views: 892,
    published_at: new Date(Date.now() - 3600000).toISOString(), created_at: '', updated_at: '',
  },
]

async function SearchResults({ query }: { query: string }) {
  let results = await searchArticles(query)
  
  if (results.length === 0) {
    results = mockResults.filter(
      (a) => a.title.toLowerCase().includes(query.toLowerCase()) ||
             a.excerpt?.toLowerCase().includes(query.toLowerCase())
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Nenhum resultado encontrado para &quot;{query}&quot;
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Tente buscar por outros termos
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''} para &quot;{query}&quot;
      </p>
      <NewsGrid articles={results} columns={3} />
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-video rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Buscar Notícias</h1>
        
        <form action="/busca" method="GET" className="max-w-2xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="q"
                defaultValue={query}
                placeholder="Digite sua busca..."
                className="pl-10 h-12 text-lg"
                autoFocus
              />
            </div>
            <Button type="submit" size="lg" className="px-8">
              Buscar
            </Button>
          </div>
        </form>
      </header>

      {/* Ad Banner */}
      <section className="mb-8">
        <AdBanner slot="search-top" className="h-24" />
      </section>

      {/* Results */}
      <section>
        {query ? (
          <Suspense fallback={<SearchSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-lg">
              Digite um termo para buscar notícias
            </p>
          </div>
        )}
      </section>

      {/* Ad Banner */}
      <section className="mt-12">
        <AdBanner slot="search-bottom" className="h-24" />
      </section>
    </div>
  )
}

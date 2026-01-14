import { Metadata } from 'next'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Settings,
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Painel de gerenciamento do OPS News',
  robots: { index: false, follow: false },
}

// Mock stats
const stats = [
  { label: 'Total de Artigos', value: '1,234', icon: FileText, change: '+12%' },
  { label: 'Visualizações Hoje', value: '45.6K', icon: Eye, change: '+8%' },
  { label: 'Usuários Ativos', value: '2,345', icon: Users, change: '+15%' },
  { label: 'Tempo Médio', value: '4m 32s', icon: Clock, change: '+5%' },
]

const recentArticles = [
  { id: '1', title: 'Governo anuncia novo pacote econômico', status: 'published', views: 12345, date: '2026-01-14' },
  { id: '2', title: 'Bolsa de valores bate recorde', status: 'published', views: 8920, date: '2026-01-14' },
  { id: '3', title: 'Nova IA brasileira revoluciona mercado', status: 'draft', views: 0, date: '2026-01-13' },
  { id: '4', title: 'Brasil vence Argentina', status: 'published', views: 15678, date: '2026-01-13' },
]

const topCategories = [
  { name: 'Política', articles: 342, views: 125000 },
  { name: 'Esportes', articles: 289, views: 98000 },
  { name: 'Economia', articles: 256, views: 87000 },
  { name: 'Tecnologia', articles: 198, views: 76000 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao painel de gerenciamento</p>
        </div>
        <Button asChild>
          <Link href="/admin/artigos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Artigo
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} em relação a ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Artigos Recentes</CardTitle>
            <CardDescription>Últimos artigos publicados e rascunhos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-1">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">{article.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {article.views.toLocaleString('pt-BR')} views
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/artigos/${article.id}`}>
                        Editar
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/artigos">Ver todos os artigos</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categorias</CardTitle>
            <CardDescription>Categorias mais acessadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-muted-foreground/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {category.articles} artigos • {(category.views / 1000).toFixed(0)}K views
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/categorias">Gerenciar categorias</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/artigos/novo">
                <FileText className="h-6 w-6 mb-2" />
                Novo Artigo
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/categorias">
                <FolderOpen className="h-6 w-6 mb-2" />
                Categorias
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="h-6 w-6 mb-2" />
                Analytics
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/settings">
                <Settings className="h-6 w-6 mb-2" />
                Configurações
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

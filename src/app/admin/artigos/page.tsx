import { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Gerenciar Artigos',
  description: 'Gerencie os artigos do portal',
}

const mockArticles = [
  { id: '1', title: 'Governo anuncia novo pacote de medidas econômicas', category: 'Política', status: 'published', author: 'João Silva', views: 12345, date: '2026-01-14' },
  { id: '2', title: 'Bolsa de valores atinge recorde histórico', category: 'Economia', status: 'published', author: 'Maria Santos', views: 8920, date: '2026-01-14' },
  { id: '3', title: 'Nova IA brasileira revoluciona mercado', category: 'Tecnologia', status: 'draft', author: 'Pedro Costa', views: 0, date: '2026-01-13' },
  { id: '4', title: 'Brasil vence Argentina nas Eliminatórias', category: 'Esportes', status: 'published', author: 'Carlos Oliveira', views: 15678, date: '2026-01-13' },
  { id: '5', title: 'Festival de música reúne 100 mil no Rio', category: 'Entretenimento', status: 'published', author: 'Ana Paula', views: 6540, date: '2026-01-12' },
  { id: '6', title: 'Crise climática: cientistas alertam sobre nível do mar', category: 'Mundo', status: 'scheduled', author: 'Roberto Lima', views: 0, date: '2026-01-15' },
]

export default function ArticlesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artigos</h1>
          <p className="text-muted-foreground">Gerencie os artigos do portal</p>
        </div>
        <Button asChild>
          <Link href="/admin/artigos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Artigo
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar artigos..." className="pl-10" />
            </div>
            <select className="h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">Todas as categorias</option>
              <option value="politica">Política</option>
              <option value="economia">Economia</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="esportes">Esportes</option>
              <option value="entretenimento">Entretenimento</option>
              <option value="brasil">Brasil</option>
              <option value="mundo">Mundo</option>
            </select>
            <select className="h-10 px-3 rounded-md border border-input bg-background text-sm">
              <option value="">Todos os status</option>
              <option value="published">Publicado</option>
              <option value="draft">Rascunho</option>
              <option value="scheduled">Agendado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Artigos</CardTitle>
          <CardDescription>{mockArticles.length} artigos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left text-sm font-medium">Título</th>
                  <th className="p-4 text-left text-sm font-medium hidden md:table-cell">Categoria</th>
                  <th className="p-4 text-left text-sm font-medium hidden lg:table-cell">Autor</th>
                  <th className="p-4 text-left text-sm font-medium">Status</th>
                  <th className="p-4 text-left text-sm font-medium hidden md:table-cell">Views</th>
                  <th className="p-4 text-left text-sm font-medium hidden lg:table-cell">Data</th>
                  <th className="p-4 text-left text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockArticles.map((article) => (
                  <tr key={article.id} className="border-b last:border-0">
                    <td className="p-4">
                      <span className="font-medium line-clamp-1">{article.title}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <Badge variant="outline">{article.category}</Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {article.author}
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={
                          article.status === 'published' ? 'default' : 
                          article.status === 'scheduled' ? 'secondary' : 'outline'
                        }
                      >
                        {article.status === 'published' ? 'Publicado' : 
                         article.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                      </Badge>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-muted-foreground">
                      {article.views.toLocaleString('pt-BR')}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {article.date}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/artigos/${article.id}`}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando 1-6 de 1.234 artigos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

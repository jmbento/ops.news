import { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const metadata: Metadata = {
  title: 'Gerenciar Categorias',
  description: 'Gerencie as categorias do portal',
}

const mockCategories = [
  { id: '1', name: 'Política', slug: 'politica', color: '#FF0000', articles: 342, description: 'Notícias sobre política nacional e internacional' },
  { id: '2', name: 'Economia', slug: 'economia', color: '#16a34a', articles: 256, description: 'Economia, mercado financeiro e negócios' },
  { id: '3', name: 'Tecnologia', slug: 'tecnologia', color: '#0066CC', articles: 198, description: 'Tecnologia, inovação e startups' },
  { id: '4', name: 'Entretenimento', slug: 'entretenimento', color: '#9333ea', articles: 178, description: 'Cultura, arte, música e celebridades' },
  { id: '5', name: 'Esportes', slug: 'esportes', color: '#ea580c', articles: 289, description: 'Futebol, olimpíadas e esportes em geral' },
  { id: '6', name: 'Brasil', slug: 'brasil', color: '#0891b2', articles: 123, description: 'Notícias do Brasil' },
  { id: '7', name: 'Mundo', slug: 'mundo', color: '#4f46e5', articles: 156, description: 'Notícias internacionais' },
]

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Gerencie as categorias do portal</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category) => (
          <Card key={category.id} className="relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: category.color }}
            />
            <CardHeader className="flex flex-row items-start justify-between pt-6">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  /{category.slug}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {category.articles} artigos
                </Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/${category.slug}`} target="_blank">
                    Ver no site
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

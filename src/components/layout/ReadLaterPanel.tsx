'use client'

import Link from 'next/link'
import { useReadLater } from '@/hooks/useReadLater'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, CheckCheck, Loader2, Clock, BookOpen } from 'lucide-react'

export function ReadLaterPanel() {
  const { items, loading, totalUnread, markAsRead, remove, clearRead } = useReadLater()

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const readCount = items.filter(i => i.is_read).length

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Ler Depois
          </h2>
          {totalUnread > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-semibold">
              {totalUnread}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? 'artigo salvo' : 'artigos salvos'}
        </p>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-12 px-4">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-1">Nenhum artigo salvo</p>
            <p className="text-xs">
              Clique em "Ler Depois" nos cards de notícia
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-3 border rounded-lg transition-opacity ${
                  item.is_read ? 'opacity-50 bg-muted/30' : 'bg-background'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={item.is_read}
                    onCheckedChange={() => markAsRead(item.id, !item.is_read)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${item.article?.category?.slug || 'geral'}/${item.article?.slug}`}
                      className="text-sm font-medium hover:text-primary hover:underline line-clamp-2 block"
                    >
                      {item.article?.title}
                    </Link>
                    
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {item.article?.category?.name || 'Geral'} • {formatDate(item.added_at)}
                    </p>

                    {/* Progress bar */}
                    {item.reading_progress > 0 && !item.is_read && (
                      <div className="mt-2">
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${item.reading_progress * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round(item.reading_progress * 100)}% lido
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(item.id)}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={clearRead}
            className="w-full"
            disabled={readCount === 0}
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Limpar Lidos ({readCount})
          </Button>
        </div>
      )}
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  
  if (diffHours < 1) return 'Agora há pouco'
  if (diffHours < 24) return `Há ${diffHours}h`
  
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Ontem'
  if (diffDays < 7) return `Há ${diffDays} dias`
  
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

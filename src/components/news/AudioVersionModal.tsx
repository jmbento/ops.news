'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Zap, FileText } from 'lucide-react'
import { useListenLater } from '@/hooks/useListenLater'
import type { Article } from '@/types/database'

interface AudioVersionModalProps {
  article: Article
  onClose: () => void
}

export function AudioVersionModal({ article, onClose }: AudioVersionModalProps) {
  const { add } = useListenLater()

  function handleSelect(version: 'summary' | 'full') {
    add(article.id, version)
    onClose()
  }

  function formatDuration(seconds?: number | null): string {
    if (!seconds) return '0min'
    const min = Math.ceil(seconds / 60)
    return `${min}min`
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Adicionar à Playlist de Áudio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Escolha qual versão deseja ouvir:
          </p>

          {/* RESUMO */}
          {article.audio_summary_url && (
            <button
              onClick={() => handleSelect('summary')}
              className="w-full p-4 border-2 rounded-lg hover:border-primary hover:bg-accent transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 flex items-center gap-2">
                    ⚡ RESUMO (TL;DR)
                    <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full">
                      ~{formatDuration(article.audio_summary_duration)}
                    </span>
                  </h3>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• 3 pontos principais da notícia</li>
                    <li>• Ideal para visão geral rápida</li>
                    <li>• Perfeito para quem tem pressa</li>
                  </ul>
                </div>
              </div>
            </button>
          )}

          {/* COMPLETA */}
          {article.audio_full_url && (
            <button
              onClick={() => handleSelect('full')}
              className="w-full p-4 border-2 rounded-lg hover:border-primary hover:bg-accent transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 flex items-center gap-2">
                    📄 COMPLETA
                    <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                      ~{formatDuration(article.audio_full_duration)}
                    </span>
                  </h3>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Artigo integral narrado</li>
                    <li>• Todos os detalhes e contexto</li>
                    <li>• Ideal para aprofundamento</li>
                  </ul>
                </div>
              </div>
            </button>
          )}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full">
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  )
}

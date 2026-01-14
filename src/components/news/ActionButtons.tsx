'use client'

import { useState } from 'react'
import { Clock, Headphones, ExternalLink, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReadLater } from '@/hooks/useReadLater'
import { useListenLater } from '@/hooks/useListenLater'
import { AudioVersionModal } from './AudioVersionModal'
import type { Article } from '@/types/database'

interface ActionButtonsProps {
  article: Article
}

export function ActionButtons({ article }: ActionButtonsProps) {
  const { add: addToRead, isInList: isInReadList } = useReadLater()
  const { isInList: isInAudioList } = useListenLater()
  const [showAudioModal, setShowAudioModal] = useState(false)

  const inReadList = isInReadList(article.id)
  const inAudioList = isInAudioList(article.id)
  const hasAudio = article.audio_summary_url || article.audio_full_url

  const categorySlug = article.category?.slug || 'geral'

  return (
    <>
      <div className="flex items-center gap-2 pt-3 border-t mt-3">
        {/* LER DEPOIS */}
        <Button
          variant={inReadList ? 'default' : 'outline'}
          size="sm"
          onClick={() => addToRead(article.id)}
          className="flex-1"
        >
          {inReadList ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Salvo
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 mr-1" />
              Ler Depois
            </>
          )}
        </Button>

        {/* OUVIR DEPOIS */}
        <Button
          variant={inAudioList ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowAudioModal(true)}
          className="flex-1"
          disabled={!hasAudio}
        >
          {inAudioList ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Na Fila
            </>
          ) : (
            <>
              <Headphones className="w-4 h-4 mr-1" />
              Ouvir
            </>
          )}
        </Button>

        {/* ABRIR */}
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <a href={`/${categorySlug}/${article.slug}`}>
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      {/* Modal de escolha de versão */}
      {showAudioModal && (
        <AudioVersionModal
          article={article}
          onClose={() => setShowAudioModal(false)}
        />
      )}
    </>
  )
}

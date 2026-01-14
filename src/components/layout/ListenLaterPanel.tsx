'use client'

import { useListenLater } from '@/hooks/useListenLater'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Trash2,
  Loader2,
  CheckCheck,
  Headphones
} from 'lucide-react'

export function ListenLaterPanel() {
  const { items, loading, totalDuration, remove, clearPlayed } = useListenLater()
  const {
    currentIndex,
    isPlaying,
    progress,
    currentTime,
    duration,
    speed,
    play,
    pause,
    next,
    previous,
    seek,
    changeSpeed,
    playItem
  } = useAudioPlayer()

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const currentItem = items[currentIndex]
  const pendingItems = items.filter(i => !i.is_played)
  const playedCount = items.filter(i => i.is_played).length

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Playlist de Áudio
          </h2>
          {pendingItems.length > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-semibold">
              {pendingItems.length}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Tempo total: {formatDuration(totalDuration)}
        </p>
      </div>

      {/* Lista de Itens */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-12 px-4">
            <Headphones className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-1">Playlist vazia</p>
            <p className="text-xs">
              Adicione notícias para ouvir depois
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {items.map((item, index) => {
              const isCurrentItem = index === currentIndex
              const audioDuration = item.audio_version === 'summary'
                ? item.article?.audio_summary_duration
                : item.article?.audio_full_duration

              return (
                <div
                  key={item.id}
                  className={`p-3 border rounded-lg transition-all ${
                    isCurrentItem
                      ? 'border-primary bg-primary/5'
                      : item.is_played
                      ? 'opacity-50 bg-muted/30'
                      : 'bg-background hover:bg-accent'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {/* Status Icon */}
                    <div className="shrink-0 w-6 flex items-center justify-center">
                      {isCurrentItem && isPlaying ? (
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      ) : item.is_played ? (
                        <span className="text-green-500">✅</span>
                      ) : (
                        <span className="text-muted-foreground text-sm font-mono">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => playItem(index)}
                        className="text-left w-full group"
                      >
                        <h3 className={`text-sm font-medium line-clamp-2 group-hover:text-primary ${
                          isCurrentItem ? 'text-primary' : ''
                        }`}>
                          {item.article?.title}
                        </h3>
                      </button>

                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          item.audio_version === 'summary'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {item.audio_version === 'summary' ? '⚡ Resumo' : '📄 Completa'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDuration(audioDuration || 0)}
                        </span>
                      </div>

                      {/* Progress bar do item atual */}
                      {isCurrentItem && duration > 0 && (
                        <div className="mt-2">
                          <div className="h-1 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Botão Remover */}
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
              )
            })}
          </div>
        )}
      </div>

      {/* Player (só aparece se tiver itens) */}
      {items.length > 0 && currentItem && (
        <div className="p-4 border-t space-y-4 bg-background">
          {/* Now Playing */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Tocando agora</p>
            <p className="text-sm font-medium line-clamp-1">
              {currentItem.article?.title}
            </p>
          </div>

          {/* Progress Slider */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(value) => seek(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controles Principais */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={previous}
              disabled={currentIndex === 0}
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              onClick={isPlaying ? pause : play}
              className="w-12 h-12"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={next}
              disabled={currentIndex === items.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Velocidade */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Velocidade:</span>
            {[1, 1.5, 2].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={speed === s ? 'default' : 'outline'}
                onClick={() => changeSpeed(s)}
                className="w-12 h-8 text-xs"
              >
                {s}x
              </Button>
            ))}
          </div>

          {/* Limpar */}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={clearPlayed}
            disabled={playedCount === 0}
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Limpar Ouvidos ({playedCount})
          </Button>
        </div>
      )}
    </div>
  )
}

function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  
  if (min === 0) return `${sec}s`
  if (min < 60) return `${min}min`
  
  const hours = Math.floor(min / 60)
  const remainingMin = min % 60
  return `${hours}h${remainingMin}min`
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '0:00'
  
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

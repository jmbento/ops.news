'use client'

import { useState } from 'react'
import { Clock, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useReadLater } from '@/hooks/useReadLater'
import { useListenLater } from '@/hooks/useListenLater'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ReadLaterPanel } from './ReadLaterPanel'
import { ListenLaterPanel } from './ListenLaterPanel'

export function PlaylistButtons() {
  const [readLaterOpen, setReadLaterOpen] = useState(false)
  const [listenLaterOpen, setListenLaterOpen] = useState(false)
  const { totalUnread } = useReadLater()
  const { items: audioItems } = useListenLater()

  const pendingAudio = audioItems.filter(i => !i.is_played).length

  return (
    <>
      <div className="flex items-center gap-1">
        {/* Botão Ler Depois */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setReadLaterOpen(true)}
          className="relative"
          aria-label="Lista de leitura"
        >
          <Clock className="w-5 h-5" />
          {totalUnread > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalUnread > 9 ? '9+' : totalUnread}
            </Badge>
          )}
        </Button>

        {/* Botão Ouvir Depois */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setListenLaterOpen(true)}
          className="relative"
          aria-label="Playlist de áudio"
        >
          <Headphones className="w-5 h-5" />
          {pendingAudio > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {pendingAudio > 9 ? '9+' : pendingAudio}
            </Badge>
          )}
        </Button>
      </div>

      {/* Sheet: Ler Depois */}
      <Sheet open={readLaterOpen} onOpenChange={setReadLaterOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <ReadLaterPanel />
        </SheetContent>
      </Sheet>

      {/* Sheet: Ouvir Depois */}
      <Sheet open={listenLaterOpen} onOpenChange={setListenLaterOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <ListenLaterPanel />
        </SheetContent>
      </Sheet>
    </>
  )
}

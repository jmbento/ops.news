'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { ListenLaterItem } from '@/types/database'

// User ID temporário (em produção, usar auth)
const TEMP_USER_ID = 'temp-user-123'

export function useListenLater() {
  const [items, setItems] = useState<ListenLaterItem[]>([])
  const [loading, setLoading] = useState(true)
  const [totalDuration, setTotalDuration] = useState(0)

  const fetchItems = useCallback(async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('listen_later')
        .select(`
          *,
          article:articles (
            id, title, slug, cover_image, category_id,
            category:categories (name, slug, color),
            audio_summary_url, audio_summary_duration,
            audio_full_url, audio_full_duration
          )
        `)
        .eq('user_id', TEMP_USER_ID)
        .order('queue_order', { ascending: true })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Erro ao buscar playlist:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    const total = items.reduce((acc, item) => {
      if (item.is_played) return acc
      
      const duration = item.audio_version === 'summary'
        ? item.article?.audio_summary_duration || 0
        : item.article?.audio_full_duration || 0
      
      return acc + duration
    }, 0)

    setTotalDuration(total)
  }, [items])

  async function add(articleId: string, version: 'summary' | 'full') {
    try {
      const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.queue_order)) + 1 : 1

      const { error } = await (supabase as any)
        .from('listen_later')
        .insert({
          user_id: TEMP_USER_ID,
          article_id: articleId,
          audio_version: version,
          queue_order: maxOrder
        })

      if (error) {
        if (error.code === '23505') {
          toast.info('Esta versão já está na sua playlist')
        } else {
          throw error
        }
      } else {
        toast.success(`Adicionado à playlist (${version === 'summary' ? 'Resumo' : 'Completa'})`)
        fetchItems()
      }
    } catch (error) {
      console.error('Erro ao adicionar:', error)
      toast.error('Erro ao adicionar à playlist')
    }
  }

  async function remove(itemId: string) {
    try {
      const { error } = await (supabase as any)
        .from('listen_later')
        .delete()
        .eq('id', itemId)

      if (error) throw error

      toast.success('Removido da playlist')
      setItems(items.filter(i => i.id !== itemId))
    } catch (error) {
      console.error('Erro ao remover:', error)
      toast.error('Erro ao remover da playlist')
    }
  }

  async function markAsPlayed(itemId: string, isPlayed: boolean) {
    try {
      const { error } = await (supabase as any)
        .from('listen_later')
        .update({ is_played: isPlayed })
        .eq('id', itemId)

      if (error) throw error

      setItems(items.map(i => i.id === itemId ? { ...i, is_played: isPlayed } : i))
    } catch (error) {
      console.error('Erro ao atualizar:', error)
    }
  }

  async function updateProgress(itemId: string, seconds: number) {
    try {
      await (supabase as any)
        .from('listen_later')
        .update({ progress_seconds: seconds })
        .eq('id', itemId)
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error)
    }
  }

  async function reorder(itemId: string, newOrder: number) {
    try {
      const { error } = await (supabase as any)
        .from('listen_later')
        .update({ queue_order: newOrder })
        .eq('id', itemId)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao reordenar:', error)
      toast.error('Erro ao reordenar playlist')
    }
  }

  async function clearPlayed() {
    try {
      const { error } = await (supabase as any)
        .from('listen_later')
        .delete()
        .eq('user_id', TEMP_USER_ID)
        .eq('is_played', true)

      if (error) throw error

      toast.success('Áudios ouvidos removidos')
      setItems(items.filter(i => !i.is_played))
    } catch (error) {
      console.error('Erro ao limpar:', error)
      toast.error('Erro ao limpar playlist')
    }
  }

  function isInList(articleId: string): boolean {
    return items.some(item => item.article_id === articleId)
  }

  return {
    items,
    loading,
    totalDuration,
    add,
    remove,
    markAsPlayed,
    updateProgress,
    reorder,
    clearPlayed,
    isInList,
    refresh: fetchItems
  }
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { ReadLaterItem } from '@/types/database'

// User ID temporário (em produção, usar auth)
const TEMP_USER_ID = 'temp-user-123'

export function useReadLater() {
  const [items, setItems] = useState<ReadLaterItem[]>([])
  const [loading, setLoading] = useState(true)
  const [totalUnread, setTotalUnread] = useState(0)

  const fetchItems = useCallback(async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('read_later')
        .select(`
          *,
          article:articles (
            id, title, slug, excerpt, cover_image, category_id,
            category:categories (name, slug, color)
          )
        `)
        .eq('user_id', TEMP_USER_ID)
        .order('added_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Erro ao buscar ler depois:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    setTotalUnread(items.filter(item => !item.is_read).length)
  }, [items])

  async function add(articleId: string) {
    try {
      const { error } = await (supabase as any)
        .from('read_later')
        .insert({
          user_id: TEMP_USER_ID,
          article_id: articleId
        })

      if (error) {
        if (error.code === '23505') {
          toast.info('Artigo já está na sua lista')
        } else {
          throw error
        }
      } else {
        toast.success('Adicionado à lista de leitura')
        fetchItems()
      }
    } catch (error) {
      console.error('Erro ao adicionar:', error)
      toast.error('Erro ao adicionar à lista')
    }
  }

  async function remove(itemId: string) {
    try {
      const { error } = await (supabase as any)
        .from('read_later')
        .delete()
        .eq('id', itemId)

      if (error) throw error

      toast.success('Removido da lista')
      setItems(items.filter(i => i.id !== itemId))
    } catch (error) {
      console.error('Erro ao remover:', error)
      toast.error('Erro ao remover da lista')
    }
  }

  async function markAsRead(itemId: string, isRead: boolean) {
    try {
      const { error } = await (supabase as any)
        .from('read_later')
        .update({ is_read: isRead })
        .eq('id', itemId)

      if (error) throw error

      setItems(items.map(i => i.id === itemId ? { ...i, is_read: isRead } : i))
      if (isRead) toast.success('Marcado como lido')
    } catch (error) {
      console.error('Erro ao atualizar:', error)
      toast.error('Erro ao atualizar status')
    }
  }

  async function updateProgress(itemId: string, progress: number) {
    try {
      await (supabase as any)
        .from('read_later')
        .update({ reading_progress: progress })
        .eq('id', itemId)
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error)
    }
  }

  async function clearRead() {
    try {
      const { error } = await (supabase as any)
        .from('read_later')
        .delete()
        .eq('user_id', TEMP_USER_ID)
        .eq('is_read', true)

      if (error) throw error

      toast.success('Artigos lidos removidos')
      setItems(items.filter(i => !i.is_read))
    } catch (error) {
      console.error('Erro ao limpar:', error)
      toast.error('Erro ao limpar lista')
    }
  }

  function isInList(articleId: string): boolean {
    return items.some(item => item.article_id === articleId)
  }

  return {
    items,
    loading,
    totalUnread,
    add,
    remove,
    markAsRead,
    updateProgress,
    clearRead,
    isInList,
    refresh: fetchItems
  }
}

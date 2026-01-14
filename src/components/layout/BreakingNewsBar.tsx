'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { COLORS } from '@/lib/constants'

interface BreakingNews {
  id: string
  title: string
  slug: string
  category: string
}

interface BreakingNewsBarProps {
  news?: BreakingNews | null
}

export function BreakingNewsBar({ news }: BreakingNewsBarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentNews, setCurrentNews] = useState<BreakingNews | null>(null)

  // Mock breaking news for demo
  useEffect(() => {
    if (news) {
      setCurrentNews(news)
    } else {
      // Demo: simular breaking news
      setCurrentNews({
        id: '1',
        title: 'URGENTE: Governo anuncia novas medidas econômicas que afetam milhões de brasileiros',
        slug: 'governo-novas-medidas-economicas',
        category: 'politica',
      })
    }
  }, [news])

  if (!isVisible || !currentNews) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] h-10"
        style={{ backgroundColor: COLORS.status.urgente }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link
            href={`/${currentNews.category}/${currentNews.slug}`}
            className="flex items-center gap-3 flex-1 overflow-hidden"
          >
            {/* Badge pulsante */}
            <span className="flex items-center gap-1 bg-white text-red-600 px-2 py-0.5 rounded text-xs font-black animate-pulse shrink-0">
              <AlertTriangle className="h-3 w-3" />
              URGENTE
            </span>

            {/* Texto com scroll se necessário */}
            <span className="text-white font-medium text-sm truncate md:text-base">
              {currentNews.title}
            </span>
          </Link>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white ml-4 shrink-0"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LogoAnimatedProps {
  onComplete?: () => void
}

export function LogoAnimated({ onComplete }: LogoAnimatedProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-[90vw] max-w-[600px] h-[200px]">
            {/* GLOBO */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, 360],
                opacity: [0, 1, 1]
              }}
              transition={{ 
                duration: 1,
                times: [0, 0.6, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-2xl">
                <defs>
                  <linearGradient id="globe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#cccccc" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <circle cx="40" cy="40" r="38" fill="url(#globe-grad)" stroke="#999" strokeWidth="2"/>
                <ellipse cx="40" cy="40" rx="38" ry="15" fill="none" stroke="#666" strokeWidth="1.5" opacity="0.6"/>
                <ellipse cx="40" cy="40" rx="38" ry="25" fill="none" stroke="#666" strokeWidth="1.5" opacity="0.6"/>
                <ellipse cx="40" cy="40" rx="15" ry="38" fill="none" stroke="#666" strokeWidth="1.5" opacity="0.6"/>
                <ellipse cx="40" cy="40" rx="25" ry="38" fill="none" stroke="#666" strokeWidth="1.5" opacity="0.6"/>
                <line x1="40" y1="2" x2="40" y2="78" stroke="#666" strokeWidth="2" opacity="0.6"/>
              </svg>
            </motion.div>

            {/* TARJA VERMELHA + OPS */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 right-1/2 bg-gradient-to-r from-[#C73E3A] to-[#E74C3C] h-[80px] md:h-[100px] rounded-l-[50px] flex items-center justify-end pr-12 md:pr-16"
              style={{ boxShadow: '0 10px 40px rgba(199, 62, 58, 0.4)' }}
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <span 
                className="text-5xl md:text-7xl font-black text-white"
                style={{ 
                  fontFamily: 'Arial Black, sans-serif', 
                  letterSpacing: '-2px', 
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)' 
                }}
              >
                OPS
              </span>
            </motion.div>

            {/* TARJA AZUL + NEWS */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-1/2 right-0 bg-gradient-to-r from-[#2E3B8E] to-[#3B4BA0] h-[80px] md:h-[100px] rounded-r-[50px] flex items-center justify-start pl-12 md:pl-16"
              style={{ boxShadow: '0 10px 40px rgba(46, 59, 142, 0.4)' }}
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 1.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <span 
                className="text-4xl md:text-6xl font-light text-white tracking-[4px] md:tracking-[8px]"
                style={{ 
                  fontFamily: 'Arial, sans-serif', 
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)' 
                }}
              >
                NEWS
              </span>
            </motion.div>

            {/* BRILHO FINAL (Shimmer) */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 0.8,
                  delay: 2.6,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>

          {/* Texto de carregamento */}
          <motion.p
            className="absolute bottom-12 text-white/50 text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            Carregando...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { motion } from 'framer-motion'

export function LogoAnimatedLoop() {
  return (
    <div className="relative w-[180px] h-[45px] md:w-[200px] md:h-[50px]">
      {/* Container principal */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* TARJA VERMELHA + OPS */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[45%] bg-gradient-to-r from-[#C73E3A] to-[#D94A47] flex items-center justify-end pr-2"
          style={{ 
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
          }}
        >
          <span 
            className="text-xl md:text-2xl font-black text-white"
            style={{ 
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-1px',
            }}
          >
            OPS
          </span>
        </motion.div>

        {/* GLOBO CENTRAL - Animação em Loop */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 80 80" className="drop-shadow-md">
            <defs>
              <linearGradient id="globe-header" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#e0e0e0" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="36" fill="url(#globe-header)" stroke="#999" strokeWidth="2"/>
            <ellipse cx="40" cy="40" rx="36" ry="14" fill="none" stroke="#888" strokeWidth="1.5" opacity="0.5"/>
            <ellipse cx="40" cy="40" rx="14" ry="36" fill="none" stroke="#888" strokeWidth="1.5" opacity="0.5"/>
            <line x1="40" y1="4" x2="40" y2="76" stroke="#888" strokeWidth="1.5" opacity="0.5"/>
            <line x1="4" y1="40" x2="76" y2="40" stroke="#888" strokeWidth="1.5" opacity="0.5"/>
          </svg>
        </motion.div>

        {/* TARJA AZUL + NEWS */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[45%] bg-gradient-to-r from-[#2E3B8E] to-[#3B4BA0] flex items-center justify-start pl-3"
          style={{ 
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
          }}
        >
          <span 
            className="text-lg md:text-xl font-light text-white tracking-[2px] md:tracking-[3px]"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            NEWS
          </span>
        </motion.div>

        {/* Shimmer Loop */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            className="absolute inset-y-0 w-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

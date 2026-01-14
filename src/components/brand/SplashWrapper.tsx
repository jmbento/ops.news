'use client'

import { useState, useEffect } from 'react'
import { LogoAnimated } from '@/components/brand/LogoAnimated'

interface SplashWrapperProps {
  children: React.ReactNode
}

export function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [hasSeenSplash, setHasSeenSplash] = useState(false)

  useEffect(() => {
    // Verifica se já viu a splash hoje
    const lastSeen = sessionStorage.getItem('ops-splash-seen')
    if (lastSeen) {
      setShowSplash(false)
      setHasSeenSplash(true)
    }
  }, [])

  function handleComplete() {
    setShowSplash(false)
    setHasSeenSplash(true)
    sessionStorage.setItem('ops-splash-seen', Date.now().toString())
  }

  return (
    <>
      {showSplash && !hasSeenSplash && (
        <LogoAnimated onComplete={handleComplete} />
      )}
      <div style={{ opacity: showSplash && !hasSeenSplash ? 0 : 1, transition: 'opacity 0.5s' }}>
        {children}
      </div>
    </>
  )
}

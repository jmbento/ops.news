'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  className?: string
}

export function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adsenseId) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [adsenseId])

  if (!adsenseId) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm ${className}`} style={{ minHeight: '90px' }}>
        Espaço Publicitário
      </div>
    )
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className={`adsbygoogle ${className}`}
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </>
  )
}

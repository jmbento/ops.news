'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useListenLater } from './useListenLater'

export function useAudioPlayer() {
  const { items, updateProgress, markAsPlayed } = useListenLater()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Criar elemento de áudio no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      
      const audio = audioRef.current

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.pause()
      }
    }
  }, [])

  // Carregar áudio quando mudar item
  useEffect(() => {
    if (items.length === 0 || !audioRef.current) return

    const currentItem = items[currentIndex]
    if (!currentItem) return

    const audioUrl = currentItem.audio_version === 'summary'
      ? currentItem.article?.audio_summary_url
      : currentItem.article?.audio_full_url

    if (audioUrl) {
      audioRef.current.src = audioUrl
      audioRef.current.playbackRate = speed
      
      // Restaurar progresso
      if (currentItem.progress_seconds > 0) {
        audioRef.current.currentTime = currentItem.progress_seconds
      }
    }
  }, [currentIndex, items, speed])

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return

    const current = audioRef.current.currentTime
    const total = audioRef.current.duration

    setCurrentTime(current)
    setProgress((current / total) * 100)

    // Salvar progresso a cada 5 segundos
    if (Math.floor(current) % 5 === 0 && items[currentIndex]) {
      updateProgress(items[currentIndex].id, Math.floor(current))
    }
  }, [currentIndex, items, updateProgress])

  const handleEnded = useCallback(() => {
    const currentItem = items[currentIndex]
    if (currentItem) {
      markAsPlayed(currentItem.id, true)
    }

    // Próxima faixa
    if (currentIndex < items.length - 1) {
      next()
    } else {
      setIsPlaying(false)
    }
  }, [currentIndex, items, markAsPlayed])

  const handleLoadedMetadata = useCallback(() => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }, [])

  function play() {
    audioRef.current?.play()
    setIsPlaying(true)
  }

  function pause() {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  function next() {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setProgress(0)
      setCurrentTime(0)
    }
  }

  function previous() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setProgress(0)
      setCurrentTime(0)
    }
  }

  function seek(percentage: number) {
    if (!audioRef.current) return
    
    const newTime = (percentage / 100) * audioRef.current.duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(percentage)
  }

  function changeSpeed(newSpeed: number) {
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  function playItem(index: number) {
    setCurrentIndex(index)
    setProgress(0)
    setCurrentTime(0)
    setTimeout(() => play(), 100)
  }

  return {
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
  }
}

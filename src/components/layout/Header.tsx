'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Search, Moon, Sun, X, ChevronRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { PlaylistButtons } from './PlaylistButtons'
import { categories, siteConfig } from '@/lib/constants'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-10 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/98 shadow-lg backdrop-blur-md'
          : 'bg-background border-b'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Menu Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12" aria-label="Menu">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0 overflow-y-auto">
              {/* Header do Menu */}
              <div className="p-6 pb-4">
                <Link href="/" className="block">
                  <Image
                    src="/logo_ops_new_hz.svg"
                    alt="OPS News"
                    width={160}
                    height={45}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              
              <Separator />

              {/* Redes Sociais */}
              <div className="px-6 py-4 flex items-center gap-4">
                <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer" 
                   className="text-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer"
                   className="text-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://youtube.com/@opsnews" target="_blank" rel="noopener noreferrer"
                   className="text-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>

              <Separator />

              {/* Categorias - Estilo Metrópoles/Globo */}
              <nav className="py-2">
                <Link
                  href="/"
                  className="block px-6 py-3 text-[15px] font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  ÚLTIMAS NOTÍCIAS
                </Link>
                
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="flex items-center justify-between px-6 py-3 text-[15px] font-medium text-foreground hover:bg-muted hover:text-primary transition-colors group"
                  >
                    <span>{category.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>

              <Separator />

              {/* Links Institucionais */}
              <nav className="py-2">
                <Link
                  href="/sobre"
                  className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  Sobre Nós
                </Link>
                <Link
                  href="/contato"
                  className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  Fale Conosco
                </Link>
              </nav>

              <Separator />

              {/* Tema */}
              <div className="px-6 py-4">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Aparência</p>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="flex-1"
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Claro
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="flex-1"
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Escuro
                  </Button>
                </div>
              </div>

              {/* Login (placeholder) */}
              <Separator />
              <div className="p-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">
                    <User className="h-4 w-4 mr-2" />
                    Acesse sua conta
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo Central */}
          <Link href="/" className="flex items-center justify-center flex-1">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Image
                src="/logo_ops_new_hz.svg"
                alt="OPS News"
                width={180}
                height={50}
                className="h-9 md:h-11 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Playlist Buttons */}
            <PlaylistButtons />

            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar"
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Theme Toggle (desktop) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Alternar tema"
              className="hidden md:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Search Bar Expandable */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <form action="/busca" method="GET" className="pb-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    name="q"
                    placeholder="Buscar notícias..."
                    className="pl-12 h-12 text-lg rounded-full border-2"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

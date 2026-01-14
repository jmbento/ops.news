'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Search, Moon, Sun, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { PlaylistButtons } from './PlaylistButtons'
import { categories } from '@/lib/constants'

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
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logo_ops_new_hz.svg"
                      alt="OPS News"
                      width={140}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <Separator />
              
              <div className="flex flex-col p-6">
                <form action="/busca" method="GET" className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input name="q" placeholder="Buscar notícias..." className="pl-10" />
                  </div>
                </form>

                <nav className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Categorias
                  </p>
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/${category.slug}`}
                      className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg text-foreground hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </nav>

                <Separator className="my-6" />

                <nav className="flex flex-col gap-1">
                  <Link href="/sobre" className="py-3 px-3 -mx-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Sobre
                  </Link>
                  <Link href="/contato" className="py-3 px-3 -mx-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Contato
                  </Link>
                </nav>

                <Separator className="my-6" />

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-4 w-4 mr-1" />
                      Claro
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-4 w-4 mr-1" />
                      Escuro
                    </Button>
                  </div>
                </div>
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
                    placeholder="Buscar notícias, temas, categorias..."
                    className="pl-12 h-12 text-lg"
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

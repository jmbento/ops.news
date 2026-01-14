import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { categories, siteConfig } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1A1A1A] text-white mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo_ops_new_hz.svg"
                alt="OPS News"
                width={160}
                height={45}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Seu portal de notícias com as últimas informações do Brasil e do mundo. 
              Credibilidade, velocidade e jornalismo de qualidade.
            </p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer" 
                 className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@opsnews" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorias</h3>
            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link 
                  key={category.slug} 
                  href={`/${category.slug}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Úteis</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/sobre" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sobre Nós
              </Link>
              <Link href="/contato" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contato
              </Link>
              <Link href="/feed.xml" className="text-gray-400 hover:text-white text-sm transition-colors">
                RSS Feed
              </Link>
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
              <Link href="/politica-privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:contato@ops.news" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Mail className="h-4 w-4" />
                contato@ops.news
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Phone className="h-4 w-4" />
                (11) 99999-9999
              </a>
              <span className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                São Paulo, SP - Brasil
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} OPS News. Todos os direitos reservados.</p>
            <p>
              Desenvolvido com ❤️ no Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

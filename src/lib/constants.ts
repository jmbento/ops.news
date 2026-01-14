// Cores da marca OPS News
export const COLORS = {
  primary: {
    red: '#C73E3A',      // Vermelho OPS
    blue: '#2E3B8E',     // Azul NEWS
  },
  neutral: {
    dark: '#1A1A1A',
    gray: '#666666',
    grayLight: '#999999',
    light: '#F5F5F5',
    white: '#FFFFFF',
  },
  // Categorias com tons neutros + vermelho/azul da marca
  categories: {
    politica: '#C73E3A',      // Vermelho OPS (destaque)
    economia: '#444444',      // Cinza escuro
    tecnologia: '#2E3B8E',    // Azul NEWS (destaque)
    entretenimento: '#666666', // Cinza médio
    esportes: '#555555',       // Cinza
    brasil: '#C73E3A',         // Vermelho OPS
    mundo: '#2E3B8E',          // Azul NEWS
    saude: '#777777',          // Cinza claro
  },
  status: {
    urgente: '#C73E3A',   // Vermelho OPS
    exclusivo: '#2E3B8E', // Azul NEWS
    aoVivo: '#C73E3A',    // Vermelho OPS
  }
} as const

export const categories = [
  { name: 'Política', slug: 'politica', color: COLORS.categories.politica },
  { name: 'Economia', slug: 'economia', color: COLORS.categories.economia },
  { name: 'Tecnologia', slug: 'tecnologia', color: COLORS.categories.tecnologia },
  { name: 'Entretenimento', slug: 'entretenimento', color: COLORS.categories.entretenimento },
  { name: 'Esportes', slug: 'esportes', color: COLORS.categories.esportes },
  { name: 'Brasil', slug: 'brasil', color: COLORS.categories.brasil },
  { name: 'Mundo', slug: 'mundo', color: COLORS.categories.mundo },
  { name: 'Saúde', slug: 'saude', color: COLORS.categories.saude },
] as const

export type CategorySlug = typeof categories[number]['slug']

export const siteConfig = {
  name: 'OPS News',
  description: 'Seu portal de notícias com as últimas informações do Brasil e do mundo. Credibilidade e velocidade.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ops.news',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/opsnews',
    instagram: 'https://instagram.com/opsnews',
    facebook: 'https://facebook.com/opsnews',
    whatsapp: 'https://wa.me/5511999999999',
  },
  creator: 'OPS News',
  keywords: ['notícias', 'brasil', 'política', 'economia', 'esportes', 'tecnologia', 'saúde'],
}

// Status badges
export const statusConfig = {
  urgente: { label: 'URGENTE', color: COLORS.status.urgente, animate: true },
  exclusivo: { label: 'EXCLUSIVO', color: COLORS.status.exclusivo, animate: false },
  aoVivo: { label: '🔴 AO VIVO', color: COLORS.status.aoVivo, animate: true },
}

export const COLORS = {
  primary: {
    red: '#FF0000',
    blue: '#0066FF',
  },
  neutral: {
    dark: '#1A1A1A',
    gray: '#666666',
    light: '#F5F5F5',
    white: '#FFFFFF',
  },
  categories: {
    politica: '#FF0000',
    economia: '#00AA00',
    tecnologia: '#0066FF',
    entretenimento: '#FF00FF',
    esportes: '#FFA500',
    brasil: '#009C3B',
    mundo: '#003399',
    saude: '#00CED1',
  },
  status: {
    urgente: '#FF0000',
    exclusivo: '#FFD700',
    aoVivo: '#FF4500',
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

export const categories = [
  { name: 'Política', slug: 'politica', color: '#FF0000' },
  { name: 'Economia', slug: 'economia', color: '#16a34a' },
  { name: 'Tecnologia', slug: 'tecnologia', color: '#0066CC' },
  { name: 'Entretenimento', slug: 'entretenimento', color: '#9333ea' },
  { name: 'Esportes', slug: 'esportes', color: '#ea580c' },
  { name: 'Brasil', slug: 'brasil', color: '#0891b2' },
  { name: 'Mundo', slug: 'mundo', color: '#4f46e5' },
] as const

export type CategorySlug = typeof categories[number]['slug']

export const siteConfig = {
  name: 'OPS News',
  description: 'Seu portal de notícias com as últimas informações do Brasil e do mundo.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ops.news',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/opsnews',
    instagram: 'https://instagram.com/opsnews',
    facebook: 'https://facebook.com/opsnews',
  },
  creator: 'OPS News',
  keywords: ['notícias', 'brasil', 'política', 'economia', 'esportes', 'tecnologia'],
}

import { Metadata } from 'next'
import Image from 'next/image'
import { Users, Newspaper, Globe, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o OPS News, seu portal de notícias confiável com informações do Brasil e do mundo.',
}

const stats = [
  { icon: Users, label: 'Leitores mensais', value: '2M+' },
  { icon: Newspaper, label: 'Notícias publicadas', value: '50K+' },
  { icon: Globe, label: 'Países alcançados', value: '120+' },
  { icon: Award, label: 'Anos de história', value: '10+' },
]

const team = [
  {
    name: 'Carlos Eduardo',
    role: 'Editor-Chefe',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    name: 'Ana Beatriz',
    role: 'Editora de Política',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    name: 'Roberto Lima',
    role: 'Editor de Economia',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    name: 'Mariana Costa',
    role: 'Editora de Tecnologia',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          Sobre o <span className="text-primary">OPS</span>.news
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Somos um portal de notícias comprometido com a verdade, transparência e qualidade.
          Nossa missão é informar, educar e conectar pessoas através de um jornalismo
          responsável e acessível.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <stat.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              O OPS News nasceu da necessidade de oferecer informação de qualidade,
              imparcial e acessível para todos os brasileiros. Acreditamos que uma
              sociedade bem informada é uma sociedade mais justa e democrática.
            </p>
            <p>
              Nossa equipe de jornalistas experientes trabalha 24 horas por dia para
              trazer as notícias mais importantes do Brasil e do mundo, sempre com
              rigor e ética profissional.
            </p>
            <p>
              Valorizamos a diversidade de opiniões e o debate saudável, sempre
              respeitando a verdade factual e o interesse público.
            </p>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800"
            alt="Redação do OPS News"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-8">Nossos Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Precisão</h3>
            <p className="text-sm text-muted-foreground">
              Verificamos cada informação antes de publicar, garantindo que nossos
              leitores recebam apenas notícias confiáveis.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Imparcialidade</h3>
            <p className="text-sm text-muted-foreground">
              Apresentamos todos os lados de cada história, permitindo que nossos
              leitores formem suas próprias opiniões.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Transparência</h3>
            <p className="text-sm text-muted-foreground">
              Somos claros sobre nossas fontes e metodologias, construindo uma
              relação de confiança com nossa audiência.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

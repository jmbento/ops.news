'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tem uma sugestão de pauta, dúvida ou quer anunciar conosco?
          Entre em contato através do formulário ou pelos nossos canais.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                E-mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Redação:</p>
              <a href="mailto:redacao@ops.news" className="text-primary hover:underline">
                redacao@ops.news
              </a>
              <p className="text-sm text-muted-foreground mt-3">Publicidade:</p>
              <a href="mailto:comercial@ops.news" className="text-primary hover:underline">
                comercial@ops.news
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Telefone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Central de Atendimento:</p>
              <a href="tel:+5511999999999" className="text-primary hover:underline">
                (11) 99999-9999
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Av. Paulista, 1000</p>
              <p>Bela Vista - São Paulo, SP</p>
              <p>CEP: 01310-100</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envie sua mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">
                    Obrigado pelo contato. Responderemos em breve.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Nome *
                      </label>
                      <Input name="name" required placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        E-mail *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Assunto *
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="pauta">Sugestão de Pauta</option>
                      <option value="correcao">Correção de Informação</option>
                      <option value="publicidade">Publicidade</option>
                      <option value="parceria">Parceria</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

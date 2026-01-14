'use client'

import { useState } from 'react'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)
    setEmail('')
  }

  if (isSuccess) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
        <p className="font-semibold text-green-600 dark:text-green-400">Inscrito com sucesso!</p>
        <p className="text-sm text-muted-foreground mt-1">
          Obrigado por se inscrever na nossa newsletter.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Newsletter</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Receba as principais notícias do dia direto no seu e-mail.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Inscrevendo...
            </>
          ) : (
            'Inscrever-se'
          )}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        Não enviamos spam. Você pode cancelar a qualquer momento.
      </p>
    </div>
  )
}

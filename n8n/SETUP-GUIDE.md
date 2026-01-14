# 🤖 Guia de Configuração N8N - OPS News Autônomo

## O que é N8N?
N8N é uma ferramenta de automação visual (como Zapier/Make), mas **gratuita** quando self-hosted.

---

## 🚀 OPÇÃO 1: N8N Cloud (Mais Fácil)

### Passo 1: Criar conta gratuita
1. Acesse: https://n8n.io
2. Clique em **"Get Started Free"**
3. Crie sua conta (Google/GitHub/Email)
4. Plano gratuito = 5 workflows ativos

### Passo 2: Importar o workflow
1. No painel do N8N, clique em **"Add Workflow"**
2. Clique nos **3 pontinhos** (menu)
3. Selecione **"Import from File"**
4. Escolha o arquivo: `n8n/autonomous-pipeline.json`

### Passo 3: Configurar credenciais
No N8N, vá em **Settings → Credentials** e adicione:

#### 1. Perplexity API
- Nome: `Perplexity API`
- Tipo: `Header Auth`
- Header Name: `Authorization`
- Header Value: `Bearer SUA_API_KEY_PERPLEXITY`
- Obter key: https://www.perplexity.ai/settings/api

#### 2. Gemini API Key
- Nome: `Gemini API Key`
- Tipo: `Query Auth`
- Query Parameter Name: `key`
- Query Parameter Value: `SUA_API_KEY_GEMINI`
- Obter key: https://aistudio.google.com/apikey (GRÁTIS!)

#### 3. Google Cloud TTS
- Nome: `Google Cloud API Key`
- Tipo: `Query Auth`
- Query Parameter Name: `key`
- Query Parameter Value: `SUA_API_KEY_GOOGLE_CLOUD`
- Obter key: https://console.cloud.google.com/apis/credentials
- Ativar API: Text-to-Speech API

#### 4. Supabase Service Key
- Nome: `Supabase Service Key`
- Tipo: `Header Auth`
- Header Name: `apikey`
- Header Value: `SUA_SUPABASE_SERVICE_ROLE_KEY`
- Header Name 2: `Authorization`
- Header Value 2: `Bearer SUA_SUPABASE_SERVICE_ROLE_KEY`

### Passo 4: Configurar variáveis de ambiente
No N8N, vá em **Settings → Variables** e adicione:
- `SUPABASE_URL`: sua URL do Supabase (ex: https://xxx.supabase.co)

### Passo 5: Ativar o workflow
1. Clique no toggle **"Active"** no canto superior direito
2. Pronto! O workflow vai rodar a cada 30 minutos automaticamente

---

## 🖥️ OPÇÃO 2: N8N Self-Hosted (Gratuito Ilimitado)

### Rodar localmente com Docker:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Ou no Render.com (grátis):
1. Acesse: https://render.com
2. New → Web Service
3. Docker image: `n8nio/n8n`
4. Free tier disponível

---

## 📋 APIs Necessárias (Resumo)

| API | Onde Obter | Custo |
|-----|------------|-------|
| **Perplexity Sonar** | https://perplexity.ai/settings/api | $5/mês (1000 req) |
| **Google Gemini** | https://aistudio.google.com/apikey | GRÁTIS |
| **Google Cloud TTS** | https://console.cloud.google.com | GRÁTIS (4M chars/mês) |
| **Supabase** | Seu projeto Supabase | GRÁTIS |

---

## 🔄 Fluxo do Workflow

```
⏰ Cron (30 min)
    ↓
🔍 Perplexity Sonar → Busca 5 notícias recentes
    ↓
📄 Parsear → Extrai JSON das notícias
    ↓
✨ Gemini 2.0 Flash → Reescreve no estilo OPS News
    ↓
📝 Formatar → Prepara artigo final
    ↓
🔊 Google TTS → Gera áudio resumo + completo (paralelo)
    ↓
⬆️ Upload → Sobe áudios no Supabase Storage
    ↓
💾 Salvar → Insere artigo no banco
    ↓
✅ Publicado automaticamente!
```

---

## 🐛 Troubleshooting

### Erro de autenticação?
- Verifique se as API keys estão corretas
- Verifique se as APIs estão ativadas nos consoles

### Artigos não aparecem no site?
- Verifique se o `category_id` está correto
- Verifique se `is_published = true`

### Áudio não gerou?
- Google TTS tem limite de 5000 chars por request
- O workflow já limita o texto automaticamente

---

## 📞 Suporte

Qualquer dúvida, me chame! 🚀

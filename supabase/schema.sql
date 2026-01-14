-- ============================================
-- OPS.NEWS - DUAL PLAYLIST SYSTEM
-- Sistema de Ler Depois + Ouvir Depois
-- Data: 14/01/2026
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: categories (Categorias)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#0066CC',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: articles (Notícias)
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_bullets TEXT[],
  content TEXT NOT NULL,
  cover_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  is_urgent BOOLEAN DEFAULT false,
  is_live BOOLEAN DEFAULT false,
  is_exclusive BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Campos de Áudio
  audio_summary_url TEXT,
  audio_summary_duration INTEGER,
  audio_summary_size_bytes INTEGER,
  audio_full_url TEXT,
  audio_full_duration INTEGER,
  audio_full_size_bytes INTEGER,
  audio_generated_at TIMESTAMPTZ,
  -- Campos de Contexto
  historical_context TEXT,
  verified_sources JSONB,
  tags TEXT[]
);

-- Índices para articles
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles (category_id);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);

CREATE INDEX IF NOT EXISTS idx_articles_published ON articles (
    is_published,
    published_at DESC
);

CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles (is_featured);

CREATE INDEX IF NOT EXISTS idx_articles_with_audio ON articles (audio_summary_url)
WHERE
    audio_summary_url IS NOT NULL;

-- ============================================
-- TABELA: read_later (Ler Depois)
-- ============================================
CREATE TABLE IF NOT EXISTS read_later (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    article_id UUID REFERENCES articles (id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT false,
    reading_progress DECIMAL(3, 2) DEFAULT 0 CHECK (
        reading_progress BETWEEN 0 AND 1
    ),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ,
    UNIQUE (user_id, article_id)
);

-- Índices para read_later
CREATE INDEX IF NOT EXISTS idx_read_later_user ON read_later (user_id, is_read);

CREATE INDEX IF NOT EXISTS idx_read_later_article ON read_later (article_id);

CREATE INDEX IF NOT EXISTS idx_read_later_date ON read_later (added_at DESC);

-- ============================================
-- TABELA: listen_later (Ouvir Depois)
-- ============================================
CREATE TABLE IF NOT EXISTS listen_later (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    article_id UUID REFERENCES articles (id) ON DELETE CASCADE,
    audio_version TEXT CHECK (
        audio_version IN ('summary', 'full')
    ),
    queue_order INTEGER NOT NULL,
    is_played BOOLEAN DEFAULT false,
    progress_seconds INTEGER DEFAULT 0,
    playback_speed DECIMAL(2, 1) DEFAULT 1.0 CHECK (
        playback_speed IN (1.0, 1.5, 2.0, 2.5, 3.0)
    ),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    played_at TIMESTAMPTZ,
    UNIQUE (
        user_id,
        article_id,
        audio_version
    )
);

-- Índices para listen_later
CREATE INDEX IF NOT EXISTS idx_listen_later_user_order ON listen_later (user_id, queue_order);

CREATE INDEX IF NOT EXISTS idx_listen_later_played ON listen_later (is_played);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function: Auto-incrementar ordem na playlist de áudio
CREATE OR REPLACE FUNCTION auto_queue_order()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.queue_order IS NULL THEN
    SELECT COALESCE(MAX(queue_order), 0) + 1
    INTO NEW.queue_order
    FROM listen_later
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auto-ordem
DROP TRIGGER IF EXISTS listen_later_order_trigger ON listen_later;

CREATE TRIGGER listen_later_order_trigger
BEFORE INSERT ON listen_later
FOR EACH ROW EXECUTE FUNCTION auto_queue_order();

-- Function: Atualizar timestamp quando marcar como lido
CREATE OR REPLACE FUNCTION update_read_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    NEW.read_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para read_later
DROP TRIGGER IF EXISTS read_later_timestamp_trigger ON read_later;

CREATE TRIGGER read_later_timestamp_trigger
BEFORE UPDATE ON read_later
FOR EACH ROW EXECUTE FUNCTION update_read_timestamp();

-- Function: Atualizar timestamp quando marcar como ouvido
CREATE OR REPLACE FUNCTION update_played_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_played = true AND OLD.is_played = false THEN
    NEW.played_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para listen_later
DROP TRIGGER IF EXISTS listen_later_timestamp_trigger ON listen_later;

CREATE TRIGGER listen_later_timestamp_trigger
BEFORE UPDATE ON listen_later
FOR EACH ROW EXECUTE FUNCTION update_played_timestamp();

-- Function: Incrementar views
CREATE OR REPLACE FUNCTION increment_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para articles
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Ativar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE read_later ENABLE ROW LEVEL SECURITY;

ALTER TABLE listen_later ENABLE ROW LEVEL SECURITY;

-- Policies para categories (público para leitura)
DROP POLICY IF EXISTS "Public can read categories" ON categories;

CREATE POLICY "Public can read categories" ON categories FOR
SELECT USING (true);

-- Policies para articles (público para leitura de publicados)
DROP POLICY IF EXISTS "Public can read published articles" ON articles;

CREATE POLICY "Public can read published articles" ON articles FOR
SELECT USING (is_published = true);

-- Policies para read_later
DROP POLICY IF EXISTS "Users can manage their read_later" ON read_later;

CREATE POLICY "Users can manage their read_later" ON read_later FOR ALL USING (true);

-- Policies para listen_later
DROP POLICY IF EXISTS "Users can manage their listen_later" ON listen_later;

CREATE POLICY "Users can manage their listen_later" ON listen_later FOR ALL USING (true);

-- ============================================
-- REALTIME (Sincronização em tempo real)
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE articles;

ALTER PUBLICATION supabase_realtime ADD TABLE categories;

ALTER PUBLICATION supabase_realtime ADD TABLE read_later;

ALTER PUBLICATION supabase_realtime ADD TABLE listen_later;

-- ============================================
-- SEED DATA: Categorias
-- ============================================
INSERT INTO
    categories (
        name,
        slug,
        description,
        color
    )
VALUES (
        'Política',
        'politica',
        'Notícias sobre política nacional e internacional',
        '#FF0000'
    ),
    (
        'Economia',
        'economia',
        'Economia, mercado financeiro e negócios',
        '#00AA00'
    ),
    (
        'Tecnologia',
        'tecnologia',
        'Tecnologia, inovação e startups',
        '#0066FF'
    ),
    (
        'Entretenimento',
        'entretenimento',
        'Cultura, arte, música e celebridades',
        '#FF00FF'
    ),
    (
        'Esportes',
        'esportes',
        'Futebol, olimpíadas e esportes em geral',
        '#FFA500'
    ),
    (
        'Brasil',
        'brasil',
        'Notícias do Brasil',
        '#009C3B'
    ),
    (
        'Mundo',
        'mundo',
        'Notícias internacionais',
        '#003399'
    ),
    (
        'Saúde',
        'saude',
        'Saúde, medicina e bem-estar',
        '#00CED1'
    ) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED DATA: Artigo de Exemplo com Áudio
-- ============================================
INSERT INTO articles (
  title,
  slug,
  excerpt,
  excerpt_bullets,
  content,
  category_id,
  cover_image,
  author,
  is_featured,
  is_published,
  views,
  published_at,
  audio_summary_url,
  audio_summary_duration,
  audio_full_url,
  audio_full_duration,
  historical_context,
  verified_sources,
  tags
) VALUES (
  'Governo anuncia pacote econômico de R$ 50 bilhões para 2026',
  'governo-anuncia-pacote-economico-2026',
  'Medidas visam estimular crescimento e reduzir inflação, beneficiando milhões de brasileiros',
  ARRAY[
    'Investimento de R$ 50 bi em infraestrutura',
    'Redução de impostos para setores estratégicos',
    'Previsão de criar 200 mil empregos em 2026'
  ],
  '<p>O governo federal anunciou hoje um amplo pacote de medidas econômicas...</p><h2>Principais medidas</h2><p>Entre os destaques estão investimentos em infraestrutura e redução tributária.</p>',
  (SELECT id FROM categories WHERE slug = 'economia' LIMIT 1),
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200',
  'João Silva',
  true,
  true,
  12345,
  NOW(),
  'https://example.com/audio-resumo.mp3',
  120,
  'https://example.com/audio-completo.mp3',
  420,
  'O Brasil vem enfrentando desafios econômicos desde 2020. Este novo pacote representa a terceira tentativa do governo de estimular a economia.',
  '[{"name": "Ministério da Economia", "url": "https://economia.gov.br"}, {"name": "Banco Central", "url": "https://bcb.gov.br"}]',
  ARRAY['economia', 'governo', 'investimentos', 'empregos']
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- FINALIZADO
-- ============================================
SELECT 'Schema Dual Playlist System criado com sucesso!' AS status;
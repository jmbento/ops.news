-- ================================================
-- OPS.news Database Schema
-- Supabase PostgreSQL
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- CATEGORIES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#0066CC',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- ARTICLES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    category_id UUID REFERENCES categories (id) ON DELETE SET NULL,
    author TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- INDEXES
-- ================================================
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles (category_id);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);

CREATE INDEX IF NOT EXISTS idx_articles_published ON articles (
    is_published,
    published_at DESC
);

CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles (is_featured);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);

-- ================================================
-- FUNCTION: Increment Views
-- ================================================
CREATE OR REPLACE FUNCTION increment_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- FUNCTION: Update updated_at
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- TRIGGERS
-- ================================================
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
DROP POLICY IF EXISTS "Public can read categories" ON categories;

CREATE POLICY "Public can read categories" ON categories FOR
SELECT USING (true);

-- Public read access for published articles
DROP POLICY IF EXISTS "Public can read published articles" ON articles;

CREATE POLICY "Public can read published articles" ON articles FOR
SELECT USING (is_published = true);

-- ================================================
-- REALTIME
-- ================================================
ALTER PUBLICATION supabase_realtime ADD TABLE articles;

ALTER PUBLICATION supabase_realtime ADD TABLE categories;

-- ================================================
-- SEED DATA: Categories
-- ================================================
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
        '#16a34a'
    ),
    (
        'Tecnologia',
        'tecnologia',
        'Tecnologia, inovação e startups',
        '#0066CC'
    ),
    (
        'Entretenimento',
        'entretenimento',
        'Cultura, arte, música e celebridades',
        '#9333ea'
    ),
    (
        'Esportes',
        'esportes',
        'Futebol, olimpíadas e esportes em geral',
        '#ea580c'
    ),
    (
        'Brasil',
        'brasil',
        'Notícias do Brasil',
        '#0891b2'
    ),
    (
        'Mundo',
        'mundo',
        'Notícias internacionais',
        '#4f46e5'
    ) ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- SEED DATA: Sample Articles
-- ================================================
INSERT INTO
    articles (
        title,
        slug,
        excerpt,
        content,
        cover_image,
        category_id,
        author,
        is_featured,
        is_published,
        views,
        published_at
    )
SELECT 'Governo anuncia novo pacote de medidas econômicas para 2026', 'governo-anuncia-novo-pacote-medidas-economicas', 'As novas medidas visam estimular o crescimento econômico e reduzir a inflação nos próximos meses.', '<p>O governo federal anunciou nesta terça-feira um amplo pacote de medidas econômicas...</p>', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200', (
        SELECT id
        FROM categories
        WHERE
            slug = 'politica'
    ), 'João Silva', true, true, 12345, NOW()
WHERE
    NOT EXISTS (
        SELECT 1
        FROM articles
        WHERE
            slug = 'governo-anuncia-novo-pacote-medidas-economicas'
    );

INSERT INTO
    articles (
        title,
        slug,
        excerpt,
        content,
        cover_image,
        category_id,
        author,
        is_featured,
        is_published,
        views,
        published_at
    )
SELECT 'Bolsa de valores atinge recorde histórico com otimismo do mercado', 'bolsa-valores-recorde-historico', 'Ibovespa ultrapassou os 150 mil pontos pela primeira vez na história.', '<p>O mercado financeiro brasileiro celebrou um momento histórico...</p>', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200', (
        SELECT id
        FROM categories
        WHERE
            slug = 'economia'
    ), 'Maria Santos', false, true, 8920, NOW() - INTERVAL '2 hours'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM articles
        WHERE
            slug = 'bolsa-valores-recorde-historico'
    );

INSERT INTO
    articles (
        title,
        slug,
        excerpt,
        content,
        cover_image,
        category_id,
        author,
        is_featured,
        is_published,
        views,
        published_at
    )
SELECT 'Nova inteligência artificial brasileira promete revolucionar o mercado', 'nova-ia-brasileira-revolucionar-mercado', 'Startup nacional lança modelo de IA que compete com gigantes internacionais.', '<p>Uma startup brasileira surpreendeu o mercado de tecnologia...</p>', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200', (
        SELECT id
        FROM categories
        WHERE
            slug = 'tecnologia'
    ), 'Pedro Costa', false, true, 7650, NOW() - INTERVAL '4 hours'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM articles
        WHERE
            slug = 'nova-ia-brasileira-revolucionar-mercado'
    );

INSERT INTO
    articles (
        title,
        slug,
        excerpt,
        content,
        cover_image,
        category_id,
        author,
        is_featured,
        is_published,
        views,
        published_at
    )
SELECT 'Brasil vence Argentina em clássico emocionante pelas Eliminatórias', 'brasil-vence-argentina-eliminatorias', 'Seleção brasileira garantiu vitória por 2x1 em jogo disputado no Maracanã.', '<p>Em uma partida eletrizante no Maracanã, a Seleção Brasileira...</p>', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200', (
        SELECT id
        FROM categories
        WHERE
            slug = 'esportes'
    ), 'Carlos Oliveira', false, true, 15678, NOW() - INTERVAL '6 hours'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM articles
        WHERE
            slug = 'brasil-vence-argentina-eliminatorias'
    );
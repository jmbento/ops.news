-- ============================================
-- OPS.NEWS - SUPABASE STORAGE SETUP
-- Configuração do bucket para áudios
-- ============================================

-- 1. Criar bucket "audios" (público)
INSERT INTO
    storage.buckets (id, name, public)
VALUES ('audios', 'audios', true) ON CONFLICT (id) DO NOTHING;

-- 2. Policy para acesso público aos áudios (leitura)
DROP POLICY IF EXISTS "Áudios são públicos" ON storage.objects;

CREATE POLICY "Áudios são públicos" ON storage.objects FOR
SELECT USING (bucket_id = 'audios');

-- 3. Policy para n8n fazer upload (service_role)
DROP POLICY IF EXISTS "n8n pode fazer upload" ON storage.objects;

CREATE POLICY "n8n pode fazer upload" ON storage.objects FOR
INSERT
WITH
    CHECK (
        bucket_id = 'audios'
        AND auth.role () = 'service_role'
    );

-- 4. Policy para n8n deletar áudios antigos
DROP POLICY IF EXISTS "n8n pode deletar" ON storage.objects;

CREATE POLICY "n8n pode deletar" ON storage.objects FOR DELETE USING (
    bucket_id = 'audios'
    AND auth.role () = 'service_role'
);

-- ============================================
-- FINALIZADO
-- ============================================
SELECT 'Storage bucket "audios" configurado com sucesso!' AS status;
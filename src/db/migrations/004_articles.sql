CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('article','activity')),
  excerpt text NOT NULL DEFAULT '',
  cover_image text,
  cover_alt text NOT NULL DEFAULT '',
  content_markdown text NOT NULL DEFAULT '',
  youtube_url text,
  event_date date,
  event_location text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS articles_publication_idx ON articles(published,published_at DESC);

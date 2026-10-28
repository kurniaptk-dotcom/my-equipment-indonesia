CREATE INDEX IF NOT EXISTS products_legacy_slugs_gin_idx
  ON products USING GIN (legacy_slugs);

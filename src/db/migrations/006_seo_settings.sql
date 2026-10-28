INSERT INTO site_settings(key,value)
VALUES (
  'seo',
  jsonb_build_object(
    'siteName','My Equipment Indonesia',
    'defaultTitle','My Equipment Indonesia | Solusi Usaha Laundry',
    'description','Pusat mesin dan perlengkapan usaha laundry. Konsultasi paket usaha, mesin laundry, chemical, cleaning, serta suku cadang bersama My Equipment Indonesia.',
    'socialImage','/images/laundry-hero.webp',
    'socialImageAlt','Perlengkapan usaha laundry My Equipment Indonesia'
  )
)
ON CONFLICT(key) DO NOTHING;

UPDATE site_settings
SET value = value
  || CASE WHEN NOT (value ? 'siteName') THEN jsonb_build_object('siteName','My Equipment Indonesia') ELSE '{}'::jsonb END
  || CASE WHEN NOT (value ? 'defaultTitle') THEN jsonb_build_object('defaultTitle','My Equipment Indonesia | Solusi Usaha Laundry') ELSE '{}'::jsonb END
  || CASE WHEN NOT (value ? 'description') THEN jsonb_build_object('description','Pusat mesin dan perlengkapan usaha laundry. Konsultasi paket usaha, mesin laundry, chemical, cleaning, serta suku cadang bersama My Equipment Indonesia.') ELSE '{}'::jsonb END
  || CASE WHEN NOT (value ? 'socialImage') THEN jsonb_build_object('socialImage','/images/laundry-hero.webp') ELSE '{}'::jsonb END
  || CASE WHEN NOT (value ? 'socialImageAlt') THEN jsonb_build_object('socialImageAlt','Perlengkapan usaha laundry My Equipment Indonesia') ELSE '{}'::jsonb END,
  updated_at = now()
WHERE key = 'seo'
  AND (NOT (value ? 'siteName') OR NOT (value ? 'defaultTitle') OR NOT (value ? 'description') OR NOT (value ? 'socialImage') OR NOT (value ? 'socialImageAlt'));

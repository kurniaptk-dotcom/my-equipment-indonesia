ALTER TABLE portfolio_items
  ADD COLUMN IF NOT EXISTS permission_confirmed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS permission_note text NOT NULL DEFAULT '';

UPDATE portfolio_items
SET permission_confirmed = false, permission_note = ''
WHERE permission_confirmed IS NULL OR permission_note IS NULL;

UPDATE products
SET image = NULL, image_alt = 'Foto rak besi laundry belum tersedia'
WHERE slug = 'rak-besi-laundry' AND image = '/images/rack-laundry-crop.jpg';

UPDATE products
SET image = NULL, image_alt = 'Foto deterjen Detoxy 5 liter belum tersedia'
WHERE slug = 'chemical-laundry-detoxy-5-liter' AND image = '/images/chemical-laundry-crop.png';

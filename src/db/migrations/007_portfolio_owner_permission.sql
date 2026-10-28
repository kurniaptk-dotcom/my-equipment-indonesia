UPDATE portfolio_items
SET permission_confirmed = true,
    permission_note = 'Izin publikasi diberikan oleh pemilik situs pada 27 Oktober 2026.',
    updated_at = now()
WHERE name IN (
  'Atma Laundry',
  'Dinar Laundry',
  'Happy Family Laundry',
  'Kila Laundry',
  'Permata Laundry Express'
);

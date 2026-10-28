INSERT INTO site_settings(key,value)
VALUES (
  'contact',
  jsonb_build_object(
    'phone', '+62 895 0444 4471',
    'email', 'myequipmentindonesia@gmail.com',
    'whatsapp', '6289504444471',
    'locations', jsonb_build_array(
      jsonb_build_object('name','Pontianak','address','Jl. Adisucipto, Perumahan Teluk Mulus B.31, Kubu Raya, Kalimantan Barat'),
      jsonb_build_object('name','Singkawang','address','Jln. Terminal Induk II / Terminal Induk Lama, Kios No. 3, Singkawang')
    ),
    'serviceHours', 'Senin–Minggu, 08.00–21.00 WIB. Tanggal merah: libur.',
    'serviceHoursSource', 'https://www.myequipmentindonesia.com/paket-usaha-laundry-pontianak/',
    'serviceHoursVerifiedAt', '2026-10-27'
  )
)
ON CONFLICT(key) DO NOTHING;

UPDATE site_settings
SET value = value
  || CASE WHEN NOT (value ? 'serviceHours') THEN jsonb_build_object('serviceHours','Senin–Minggu, 08.00–21.00 WIB. Tanggal merah: libur.') ELSE '{}'::jsonb END
  || CASE WHEN NOT (value ? 'serviceHoursSource') THEN jsonb_build_object('serviceHoursSource','https://www.myequipmentindonesia.com/paket-usaha-laundry-pontianak/') ELSE '{}'::jsonb END
  || CASE WHEN NOT (value ? 'serviceHoursVerifiedAt') THEN jsonb_build_object('serviceHoursVerifiedAt','2026-10-27') ELSE '{}'::jsonb END,
  updated_at = now()
WHERE key = 'contact'
  AND (NOT (value ? 'serviceHours') OR NOT (value ? 'serviceHoursSource') OR NOT (value ? 'serviceHoursVerifiedAt'));

import Image from 'next/image';

export interface PartnerBrand {
  name: string;
  logo: string;
  category: string;
}

export const partnerBrands: PartnerBrand[] = [
  { name: 'Speed Queen', logo: '/images/partners/speed-queen.png', category: 'Commercial Dryer & Washer' },
  { name: 'Maytag Commercial', logo: '/images/partners/maytag.png', category: 'Commercial Laundry' },
  { name: 'LG Commercial', logo: '/images/partners/lg.png', category: 'Front Load Washer' },
  { name: 'Electrolux', logo: '/images/partners/electrolux.png', category: 'Professional Laundry' },
  { name: 'Samsung', logo: '/images/partners/samsung.png', category: 'Smart Washer' },
  { name: 'Midea', logo: '/images/partners/midea.png', category: 'Laundry Appliance' },
  { name: 'Beko', logo: '/images/partners/beko.png', category: 'Commercial Washer' },
  { name: 'Huebsch', logo: '/images/partners/huebsch.png', category: 'Heavy Duty Equipment' },
  { name: 'UniMac', logo: '/images/partners/unimac.png', category: 'Industrial Laundry' },
  { name: 'IPSO', logo: '/images/partners/ipso.png', category: 'Laundromat Systems' },
  { name: 'Foggia', logo: '/images/partners/foggia.png', category: 'Laundry Machinery' },
  { name: 'Galanz', logo: '/images/partners/galanz.png', category: 'Commercial Equipment' },
  { name: 'Smartlink', logo: '/images/partners/smartlink.png', category: 'POS & IoT Laundry' },
];

export function HomePartnerSlider() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...partnerBrands, ...partnerBrands];

  return (
    <section className="home-partners-section wrap" aria-label="Our Partner - Merek Mesin & Ekosistem Terpercaya" data-reveal>
      <div className="home-partners-header">
        <span className="eyebrow">OUR PARTNER & BRAND RESMI</span>
        <h2>Didukung Merek Mesin & Teknologi Terbaik Dunia</h2>
        <p>
          Kami berkolaborasi dengan produsen mesin komersial terkemuka dan penyedia teknologi laundry modern untuk memastikan performa outlet Anda andal dan tahan lama.
        </p>
      </div>

      <div className="partner-marquee-container" aria-hidden="true">
        <div className="partner-marquee-track">
          {marqueeItems.map((brand, idx) => (
            <div className="partner-logo-card" key={`${brand.name}-${idx}`} title={`${brand.name} - ${brand.category}`}>
              <div className="partner-logo-img-wrap">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={140}
                  height={44}
                  className="partner-logo-img"
                />
              </div>
              <span className="partner-name-sr sr-only">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

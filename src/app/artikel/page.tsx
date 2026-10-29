import type { Metadata } from 'next';
import { getArticles } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';
import { YoutubePlayer } from '@/components/youtube-player';
import { InstagramProfileCard } from '@/components/instagram-profile-card';
import { ArticleCatalogView } from '@/components/article-catalog-view';
import { featuredVideos } from '@/data/featured-videos';

export const dynamic = 'force-dynamic';
type SearchParams = Promise<{ jenis?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const articles = await getArticles();
  return createPageMetadata({
    title: 'Artikel, Panduan & Edukasi Bisnis Laundry',
    description: 'Kumpulan artikel, panduan teknis peralatan mesin laundry, kalkulasi modal, SOP operasional, dan dokumentasi kegiatan My Equipment di Kalimantan Barat.',
    canonical: '/artikel',
    robots: articles.length ? { index: true, follow: true } : { index: false, follow: true },
  });
}

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  const [articles, { jenis }] = await Promise.all([getArticles(), searchParams]);
  const siteUrl = getSiteUrl();

  const articlesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/artikel#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Artikel & Panduan Bisnis Laundry',
            item: `${siteUrl}/artikel`,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/artikel#collection`,
        name: 'Artikel, Panduan & Edukasi Bisnis Laundry Kalbar',
        description:
          'Wawasan bisnis laundry, panduan teknis peralatan, dan dokumentasi pendampingan mitra My Equipment di Kalimantan Barat.',
        url: `${siteUrl}/artikel`,
      },
    ],
  };

  return (
    <main className="article-page wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema).replace(/</g, '\\u003c') }}
      />
      {/* Editorial Hero Header */}
      <header className="article-list-hero">
        <span className="eyebrow">PUSAT EDUKASI & INFORMASI</span>
        <h1>Artikel, Panduan & <em>Kegiatan</em></h1>
        <p>Wawasan bisnis laundry, panduan teknis peralatan, dan dokumentasi pendampingan mitra My Equipment di Kalimantan Barat.</p>
      </header>

      {/* Interactive Catalog: Search, Filter Tabs, Featured Spotlight, & 3-Col Grid */}
      <ArticleCatalogView articles={articles} initialCategory={jenis} />

      {/* Community & Media Hub: Balanced 2-Column Section */}
      <section className="article-community-hub" aria-labelledby="community-heading">
        <div className="community-hub-header">
          <span className="eyebrow">MEDIA & KOMUNITAS RESMI</span>
          <h2 id="community-heading">Terhubung dengan My Equipment Indonesia</h2>
          <p>Ikuti pembaruan kegiatan harian, tips cepat di Instagram, serta video tutorial teknis di YouTube.</p>
        </div>

        <div className="community-hub-grid">
          <div className="community-col">
            <InstagramProfileCard variant="full" />
          </div>
          <div className="community-col">
            <div className="youtube-showcase-card">
              <div className="youtube-showcase-header">
                <span className="article-channel-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
                  </svg>
                </span>
                <div>
                  <span className="youtube-channel-tag">KANAL YOUTUBE RESMI</span>
                  <h3>ShortMQ Indonesia</h3>
                  <p>Tutorial mesin, review perlengkapan, dan tips operasional laundry.</p>
                </div>
                <a
                  href="https://www.youtube.com/@ShortMQIndonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-sub-btn"
                >
                  Kunjungi Kanal ↗
                </a>
              </div>
              <div className="youtube-featured-player">
                <YoutubePlayer url={featuredVideos[0].url} title={featuredVideos[0].title} />
              </div>
              <div className="youtube-video-minilist">
                {featuredVideos.slice(1).map((video, idx) => (
                  <div key={video.url} className="youtube-mini-item">
                    <span className="youtube-mini-badge">Video {idx + 2}</span>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="youtube-mini-title">
                      {video.title} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

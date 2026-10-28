import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';
import { YoutubePlayer } from '@/components/youtube-player';
import { featuredVideos } from '@/data/featured-videos';

export const dynamic = 'force-dynamic';
type SearchParams = Promise<{ jenis?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const articles = await getArticles();
  return createPageMetadata({
    title: 'Artikel & Kegiatan',
    description: 'Artikel dan dokumentasi kegiatan My Equipment Indonesia.',
    canonical: '/artikel',
    robots: articles.length ? { index: true, follow: true } : { index: false, follow: true },
  });
}

const dateLabel = (date: string | null) => date
  ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date.slice(0, 10)}T00:00:00Z`))
  : '';

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  const [articles, { jenis }] = await Promise.all([getArticles(), searchParams]);
  const filtered = jenis === 'artikel' || jenis === 'kegiatan';
  const items = filtered ? articles.filter((item) => item.type === (jenis === 'artikel' ? 'article' : 'activity')) : articles;

  return <main className="article-page wrap">
    <header className="article-list-hero">
      <span className="eyebrow">CERITA MY EQUIPMENT</span>
      <h1>Artikel & <em>Kegiatan</em></h1>
      <p>Catatan, panduan, dan dokumentasi kegiatan My Equipment Indonesia.</p>
    </header>

    <section className="article-channel" aria-label="Kanal YouTube ShortMQ Indonesia">
      <span className="article-channel-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg></span>
      <div>
        <span className="article-channel-label">VIDEO YOUTUBE</span>
        <h2>Ikuti ShortMQ Indonesia</h2>
        <p>Tonton video dan konten dari kanal YouTube ShortMQ Indonesia.</p>
      </div>
      <a href="https://www.youtube.com/@ShortMQIndonesia" target="_blank" rel="noopener noreferrer">Kunjungi kanal <span aria-hidden="true">↗</span></a>
    </section>

    <nav className="article-filters" aria-label="Filter artikel">
      <Link href="/artikel" aria-current={!filtered ? 'page' : undefined}>Semua</Link>
      <Link href="/artikel?jenis=artikel" aria-current={jenis === 'artikel' ? 'page' : undefined}>Artikel</Link>
      <Link href="/artikel?jenis=kegiatan" aria-current={jenis === 'kegiatan' ? 'page' : undefined}>Kegiatan</Link>
    </nav>

    {items.length ? <div className="article-card-grid">
      {items.map((article) => <article className="article-card" key={article.id}>
        <Link href={`/artikel/${article.slug}`} className="article-card-link">
          {article.coverImage
            ? <div className="article-card-image"><Image src={article.coverImage} alt={article.coverAlt} fill sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 33vw"/></div>
            : <div className="article-card-image article-card-placeholder" aria-hidden="true"><span>ME</span></div>}
          <div className="article-card-copy">
            <div><span className="article-type">{article.type === 'activity' ? 'Kegiatan' : 'Artikel'}</span>{article.type === 'activity' && article.eventDate && <time dateTime={article.eventDate}>{dateLabel(article.eventDate)}</time>}</div>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <span className="article-read-link">Baca selengkapnya <span aria-hidden="true">→</span></span>
          </div>
        </Link>
      </article>)}
    </div> : <section className="article-empty">
      <span className="eyebrow">RUANG CERITA</span>
      <h2>{articles.length ? 'Belum ada konten pada kategori ini' : 'Artikel sedang disiapkan'}</h2>
      <p>{articles.length ? 'Pilih kategori lain untuk melihat konten yang tersedia.' : 'Dokumentasi dan tulisan terbaru akan muncul di sini setelah diterbitkan.'}</p>
      {articles.length > 0 && <Link className="button button-outline" href="/artikel">Lihat semua</Link>}
    </section>}

    <section className="article-video-list" aria-labelledby="article-video-heading">
      <div className="article-video-list-heading">
        <div><span className="eyebrow">VIDEO PILIHAN</span><h2 id="article-video-heading">ShortMQ Indonesia di YouTube</h2></div>
        <a href="https://www.youtube.com/@ShortMQIndonesia" target="_blank" rel="noopener noreferrer">Lihat kanal lengkap ↗</a>
      </div>
      <div className="article-video-grid">
        {featuredVideos.map((video, index) => <article className="article-video-card" key={video.url}>
          <YoutubePlayer url={video.url} title={video.title}/>
          <div><span className="article-type">ShortMQ Indonesia</span><h3>Video pilihan {index + 1}</h3></div>
        </article>)}
      </div>
    </section>
  </main>;
}

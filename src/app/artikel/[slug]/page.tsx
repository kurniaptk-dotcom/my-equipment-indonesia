import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleMarkdown } from '@/components/article-markdown';
import { YoutubePlayer } from '@/components/youtube-player';
import { InstagramProfileCard } from '@/components/instagram-profile-card';
import { waLink } from '@/data/catalog';
import { getArticleBySlug, getArticles, getContactSettings, getSeoSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-dynamic';
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const [article, seo] = await Promise.all([getArticleBySlug(slug), getSeoSettings()]);
  if (!article) return { title: 'Artikel tidak ditemukan' };
  const description = article.excerpt || article.title;
  const image = article.coverImage ?? seo.socialImage;
  const imageAlt = article.coverImage ? article.coverAlt : seo.socialImageAlt;
  const url = `${getSiteUrl()}/artikel/${article.slug}`;

  return {
    title: `${article.title} | My Equipment Indonesia`,
    description,
    alternates: { canonical: `/artikel/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description,
      url,
      siteName: seo.siteName,
      images: [{ url: image, alt: imageAlt }],
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [image],
    },
  };
}

const dateLabel = (date: string) =>
  new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${date.slice(0, 10)}T00:00:00Z`)
  );

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} mnt baca`;
}

export default async function ArticleDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const [article, allArticles, seo, contact] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
    getSeoSettings(),
    getContactSettings(),
  ]);

  if (!article) notFound();

  const site = getSiteUrl();
  const readingTime = calculateReadingTime(article.contentMarkdown);
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const asideArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 4);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${site}/artikel/${article.slug}#article`,
        headline: article.title,
        description: article.excerpt || article.title,
        url: `${site}/artikel/${article.slug}`,
        mainEntityOfPage: `${site}/artikel/${article.slug}`,
        author: {
          '@type': 'Organization',
          name: seo.siteName,
          url: site,
        },
        publisher: {
          '@type': 'Organization',
          name: seo.siteName,
          url: site,
          logo: {
            '@type': 'ImageObject',
            url: `${site}/images/laundry-hero.webp`,
          },
        },
        datePublished: article.publishedAt ?? article.updatedAt,
        dateModified: article.updatedAt,
        articleSection: article.type === 'activity' ? 'Dokumentasi Kegiatan' : 'Panduan Bisnis & Edukasi',
        image: [
          article.coverImage
            ? article.coverImage.startsWith('http')
              ? article.coverImage
              : `${site}${article.coverImage}`
            : `${site}/images/laundry-hero.webp`,
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${site}/artikel/${article.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: `${site}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Artikel & Panduan',
            item: `${site}/artikel`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `${site}/artikel/${article.slug}`,
          },
        ],
      },
    ],
  };

  const articleWaUrl = waLink(
    `Halo My Equipment, saya membaca panduan/artikel “${article.title}” di website (${site}/artikel/${article.slug}) dan ingin berkonsultasi lebih lanjut.`,
    contact.whatsapp
  );

  return (
    <main className="article-detail-page wrap">
      {/* Editorial Breadcrumb */}
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>›</span>
        <Link href="/artikel">Artikel & Panduan</Link>
        <span>›</span>
        <span aria-current="page">{article.title}</span>
      </nav>

      {/* Main Article Container */}
      <article className="article-content-container">
        {/* Article Header */}
        <header className="article-detail-header">
          <div className="article-header-meta">
            <span className="article-type">
              {article.type === 'activity' ? 'Dokumentasi Kegiatan' : 'Panduan Bisnis & Edukasi'}
            </span>
            <span className="article-header-reading-time">⏱ {readingTime}</span>
          </div>

          <h1>{article.title}</h1>

          {article.excerpt && <p className="article-lead-text">{article.excerpt}</p>}

          {/* Author & Publish Meta Bar */}
          <div className="article-author-strip">
            <div className="author-strip-profile">
              <div className="author-avatar" aria-hidden="true">ME</div>
              <div>
                <span className="author-name">Tim Teknis & Konsultan Laundry</span>
                <span className="author-publisher">My Equipment Indonesia</span>
              </div>
            </div>

            <div className="author-strip-dates">
              {article.publishedAt && (
                <div>
                  <span className="meta-label">Diterbitkan</span>
                  <time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time>
                </div>
              )}
              {article.type === 'activity' && article.eventLocation && (
                <div>
                  <span className="meta-label">Lokasi</span>
                  <span>{article.eventLocation}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        {article.coverImage && (
          <figure className="article-cover">
            <Image
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              fill
              priority
              sizes="(max-width:900px) 100vw, 1100px"
            />
          </figure>
        )}

        {/* 2-Column Editorial & Aside Layout */}
        <div className="article-detail-layout">
          {/* Main Reading Column */}
          <div className="article-main-column">
            {/* Takeaway / Summary Box */}
            {article.excerpt && (
              <div className="article-takeaway-card">
                <span className="takeaway-badge">💡 Ringkasan Inti</span>
                <p>{article.excerpt}</p>
              </div>
            )}

            <ArticleMarkdown markdown={article.contentMarkdown} />

            {/* Video Terkait (if any) */}
            {article.youtubeUrl && (
              <div className="article-video-wrap">
                <h2>Video Terkait Panduan Ini</h2>
                <YoutubePlayer url={article.youtubeUrl} title={article.title} />
              </div>
            )}

            {/* Quick Share / Consultation Banner inside content */}
            <div className="article-share-bar">
              <span>Bermanfaat? Bagikan artikel ini:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Rekomendasi bacaan: "${article.title}" di My Equipment: ${site}/artikel/${article.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
              >
                Bagikan ke WhatsApp ↗
              </a>
            </div>
          </div>

          {/* Sticky Sidebar (300px - 320px) */}
          <aside className="article-detail-aside">
            {/* Instagram Verified Profile Card */}
            <InstagramProfileCard variant="aside" />

            {/* Quick Consultation CTA */}
            <div className="article-aside-cta">
              <span className="aside-cta-badge">KONSULTASI GRATIS</span>
              <h3>Butuh Solusi untuk Laundry Anda?</h3>
              <p>Diskusikan pemilihan mesin, instalasi, dan kalkulasi modal langsung bersama tim ahli kami.</p>
              <a href={articleWaUrl} target="_blank" rel="noopener noreferrer" className="button aside-cta-btn">
                Tanya via WhatsApp ↗
              </a>
            </div>

            {/* Recommended Articles Mini List */}
            {asideArticles.length > 0 && (
              <div className="article-aside-nav">
                <span className="aside-nav-title">PANDUAN LAINNYA</span>
                <ul className="aside-article-list">
                  {asideArticles.map((item) => (
                    <li key={item.id}>
                      <Link href={`/artikel/${item.slug}`} className="aside-article-link">
                        <span className="aside-item-type">{item.type === 'activity' ? 'Kegiatan' : 'Panduan'}</span>
                        <h4>{item.title}</h4>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/artikel" className="aside-all-link">← Lihat semua artikel & panduan</Link>
              </div>
            )}
          </aside>
        </div>
      </article>

      {/* Bottom Full-Width WhatsApp CTA Banner */}
      <section className="article-whatsapp-cta" aria-label="Konsultasi berdasarkan artikel">
        <div>
          <span className="eyebrow">BUTUH INFORMASI LEBIH LANJUT?</span>
          <h2>Diskusikan Kebutuhan Laundry Anda Sekarang</h2>
          <p>Dapatkan rekomendasi paket mesin komersial, suku cadang, dan pendampingan manajemen operasional laundry bersama My Equipment.</p>
        </div>
        <Link className="button" href={articleWaUrl} target="_blank" rel="noopener noreferrer">
          Tanya via WhatsApp <span aria-hidden="true">↗</span>
        </Link>
      </section>

      {/* Bottom Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="article-related-section" aria-labelledby="related-heading">
          <div className="related-section-header">
            <span className="eyebrow">BACAAN REKOMENDASI</span>
            <h2 id="related-heading">Artikel & Panduan Terkait</h2>
          </div>
          <div className="article-card-grid">
            {relatedArticles.map((item) => (
              <article className="article-card article-card-modern" key={item.id}>
                <Link href={`/artikel/${item.slug}`} className="article-card-link">
                  <div className="article-card-image">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.coverAlt || item.title}
                        fill
                        sizes="(max-width:700px) 100vw, 33vw"
                        className="article-card-img"
                      />
                    ) : (
                      <div className="article-card-placeholder" aria-hidden="true">
                        <span>ME</span>
                      </div>
                    )}
                    <span className="article-badge-overlay">
                      {item.type === 'activity' ? 'Kegiatan' : 'Panduan'}
                    </span>
                  </div>
                  <div className="article-card-copy">
                    <span className="article-reading-time">⏱ {calculateReadingTime(item.contentMarkdown)}</span>
                    <h3 className="article-card-title">{item.title}</h3>
                    <p className="article-card-excerpt">{item.excerpt}</p>
                    <span className="article-read-link">Baca panduan →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </main>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleMarkdown } from '@/components/article-markdown';
import { YoutubePlayer } from '@/components/youtube-player';
import { InstagramProfileCard } from '@/components/instagram-profile-card';
import { waLink } from '@/data/catalog';
import { getArticleBySlug, getContactSettings, getSeoSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic='force-dynamic';
type Params=Promise<{slug:string}>;
export async function generateMetadata({params}:{params:Params}):Promise<Metadata>{
  const {slug}=await params; const [article,seo]=await Promise.all([getArticleBySlug(slug),getSeoSettings()]);
  if(!article)return {title:'Artikel tidak ditemukan'};
  const description=article.excerpt||article.title;
  const image=article.coverImage??seo.socialImage; const imageAlt=article.coverImage?article.coverAlt:seo.socialImageAlt; const url=`${getSiteUrl()}/artikel/${article.slug}`;
  return {title:article.title,description,alternates:{canonical:`/artikel/${article.slug}`},openGraph:{type:'article',title:article.title,description,url,siteName:seo.siteName,images:[{url:image,alt:imageAlt}],publishedTime:article.publishedAt??undefined,modifiedTime:article.updatedAt},twitter:{card:'summary_large_image',title:article.title,description,images:[image]}};
}
const dateLabel=(date:string)=>new Intl.DateTimeFormat('id-ID',{dateStyle:'long',timeZone:'UTC'}).format(new Date(`${date.slice(0,10)}T00:00:00Z`));
export default async function ArticleDetail({params}:{params:Params}){
  const {slug}=await params; const [article,seo,contact]=await Promise.all([getArticleBySlug(slug),getSeoSettings(),getContactSettings()]); if(!article)notFound();
  const site=getSiteUrl();
  const structuredData={'@context':'https://schema.org','@type':'BlogPosting',headline:article.title,description:article.excerpt||article.title,url:`${site}/artikel/${article.slug}`,mainEntityOfPage:`${site}/artikel/${article.slug}`,author:{'@type':'Organization',name:seo.siteName},publisher:{'@type':'Organization',name:seo.siteName,url:site},datePublished:article.publishedAt??article.updatedAt,dateModified:article.updatedAt,articleSection:article.type==='activity'?'Kegiatan':'Artikel',image:[article.coverImage??seo.socialImage]};
  return <main className="article-detail-page wrap">
    <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Beranda</Link><span>›</span><Link href="/artikel">Artikel</Link><span>›</span><span aria-current="page">{article.title}</span></nav>
    <article>
      <header className="article-detail-header"><span className="article-type">{article.type==='activity'?'Kegiatan':'Artikel'}</span>{article.type==='activity'&&(article.eventDate||article.eventLocation)&&<div className="article-event-meta">{article.eventDate&&<time dateTime={article.eventDate}>{dateLabel(article.eventDate)}</time>}{article.eventLocation&&<span>{article.eventLocation}</span>}</div>}<h1>{article.title}</h1>{article.excerpt&&<p>{article.excerpt}</p>}</header>
      {article.coverImage&&<figure className="article-cover"><Image src={article.coverImage} alt={article.coverAlt} fill priority sizes="(max-width:900px) 100vw, 1100px"/></figure>}
      <div className="article-detail-layout">
        <ArticleMarkdown markdown={article.contentMarkdown}/>
        <aside className="article-detail-aside">
          <InstagramProfileCard variant="aside" />
          <div className="article-aside-nav">
            <span>MY EQUIPMENT INDONESIA</span>
            <p>Artikel dan dokumentasi kegiatan.</p>
            <Link href="/artikel">← Semua artikel</Link>
          </div>
        </aside>
      </div>
      {article.youtubeUrl&&<div className="article-video-wrap"><h2>Video terkait</h2><YoutubePlayer url={article.youtubeUrl} title={article.title}/></div>}
    </article>
    <section className="article-whatsapp-cta" aria-label="Konsultasi berdasarkan artikel">
      <div><span className="eyebrow">BUTUH INFORMASI LEBIH LANJUT?</span><h2>Diskusikan dengan tim My Equipment.</h2><p>Ceritakan apa yang ingin Anda ketahui dari artikel atau dokumentasi ini.</p></div>
      <Link className="button" href={waLink(`Halo My Equipment, saya membaca ${article.type==='activity'?'dokumentasi kegiatan':'artikel'} “${article.title}” dan ingin bertanya lebih lanjut. Sumber: ${site}/artikel/${article.slug}`,contact.whatsapp)} target="_blank" rel="noreferrer">Tanya via WhatsApp <span aria-hidden="true">↗</span></Link>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/>
  </main>;
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { youtubeVideoId } from '@/lib/article-content';

export function YoutubePlayer({ url, title }: { url: string; title: string }) {
  const [started,setStarted]=useState(false);
  const [thumbnailFailed,setThumbnailFailed]=useState(false);
  const thumbnailRef=useRef<HTMLImageElement>(null);
  const id=youtubeVideoId(url);
  useEffect(()=>{
    const thumbnail=thumbnailRef.current;
    if(thumbnail?.complete&&thumbnail.naturalWidth===0) setThumbnailFailed(true);
  },[id,started]);
  if(!id) return <p className="article-video-fallback">URL video tidak valid.</p>;
  return <section className="article-video" aria-label={`Video: ${title}`}>
    {started ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> : <button type="button" className={`article-video-play${thumbnailFailed?' has-fallback-thumbnail':''}`} onClick={()=>setStarted(true)} aria-label={`Putar video: ${title}`}><img ref={thumbnailRef} className="article-video-thumbnail" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" referrerPolicy="no-referrer" onError={()=>setThumbnailFailed(true)} hidden={thumbnailFailed}/><span className="article-video-play-icon" aria-hidden="true">▶</span><b>Putar video</b><small>YouTube dimuat setelah Anda memilih putar</small></button>}
    <a href={url} target="_blank" rel="noreferrer">Buka langsung di YouTube ↗</a>
  </section>;
}

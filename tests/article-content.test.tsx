import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { YoutubePlayer } from '../src/components/youtube-player';
import { parseSeoSettings } from '../src/lib/seo-settings';
import { isAllowedArticleImage, markdownImageSources, youtubeVideoId } from '../src/lib/article-content';

test('accepts supported YouTube watch, short and embed links only', () => {
  assert.equal(youtubeVideoId('https://www.youtube.com/watch?v=abcdefghijk'), 'abcdefghijk');
  assert.equal(youtubeVideoId('https://youtu.be/abcdefghijk?t=10'), 'abcdefghijk');
  assert.equal(youtubeVideoId('https://youtube.com/embed/abcdefghijk'), 'abcdefghijk');
  assert.equal(youtubeVideoId('https://youtube.com.evil.example/watch?v=abcdefghijk'), null);
  assert.equal(youtubeVideoId('http://youtube.com/watch?v=abcdefghijk'), null);
  assert.equal(youtubeVideoId('https://youtube.com/watch?v=short'), null);
});

test('allows local images and CMS media paths only', () => {
  assert.equal(isAllowedArticleImage('/images/outlet.webp', ''), true);
  assert.equal(isAllowedArticleImage('/images/../private.png', ''), false);
  assert.equal(isAllowedArticleImage('/images/%2e%2e/private.png', ''), false);
  assert.equal(isAllowedArticleImage('https://cdn.example.test/cms/photo.webp','https://cdn.example.test/cms'), true);
  assert.equal(isAllowedArticleImage('http://localhost:9000/cms/photo.webp','http://localhost:9000/cms'), true);
  assert.equal(isAllowedArticleImage('https://outside.example.test/photo.webp','https://cdn.example.test/cms'), false);
  assert.deepEqual(markdownImageSources('![Mesin laundry](/images/mesin.webp)\n![Foto](https://cdn.example.test/cms/a.webp)'), [
    { alt:'Mesin laundry',src:'/images/mesin.webp' },{ alt:'Foto',src:'https://cdn.example.test/cms/a.webp' },
  ]);
});

test('GFM formatting renders and raw HTML stays escaped', () => {
  const html=renderToStaticMarkup(React.createElement(ReactMarkdown,{remarkPlugins:[remarkGfm]},'| Nama | Status |\n| --- | --- |\n| Mesin | Siap |\n\n<script>alert(1)</script>'));
  assert.match(html,/<table>/);
  assert.match(html,/&lt;script&gt;/);
  assert.doesNotMatch(html,/<script>/);
});

test('YouTube player starts as an accessible play control without loading an iframe', () => {
  const html=renderToStaticMarkup(React.createElement(YoutubePlayer,{url:'https://youtu.be/abcdefghijk',title:'Dokumentasi kegiatan'}));
  assert.match(html,/type="button"/);
  assert.match(html,/Putar video: Dokumentasi kegiatan/);
  assert.doesNotMatch(html,/<iframe/);
  assert.match(html,/Buka langsung di YouTube/);
});

test('SEO settings validate text lengths and require alt text for a social image', () => {
  const valid={siteName:'My Equipment Indonesia',defaultTitle:'My Equipment Indonesia | Solusi Laundry',description:'Perlengkapan usaha laundry dan konsultasi My Equipment Indonesia.',socialImage:'/images/laundry-hero.webp',socialImageAlt:'Perlengkapan laundry'};
  assert.equal(parseSeoSettings(valid).siteName,'My Equipment Indonesia');
  assert.throws(()=>parseSeoSettings({...valid,siteName:'A'}));
  assert.throws(()=>parseSeoSettings({...valid,description:'Pendek'}));
  assert.throws(()=>parseSeoSettings({...valid,socialImageAlt:''}));
  assert.equal(parseSeoSettings({...valid,socialImage:'',socialImageAlt:''}).socialImage,'');
});

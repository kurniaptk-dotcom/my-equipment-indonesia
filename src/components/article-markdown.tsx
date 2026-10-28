import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isAllowedArticleImage } from '@/lib/article-content';

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  return <div className="article-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    img({ src, alt }) {
      if (typeof src !== 'string' || !alt || !isAllowedArticleImage(src)) return null;
      return <figure><img src={src} alt={alt} loading="lazy"/><figcaption>{alt}</figcaption></figure>;
    },
    a({ href, children }) {
      if (!href || (!href.startsWith('/') && !/^https:\/\//i.test(href) && !/^mailto:/i.test(href))) return <>{children}</>;
      const external = /^https:\/\//i.test(href);
      return <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>;
    },
  }}>{markdown}</ReactMarkdown></div>;
}

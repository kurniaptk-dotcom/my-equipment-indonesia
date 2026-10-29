import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isAllowedArticleImage } from '@/lib/article-content';

function getNodeText(node: unknown): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    return getNodeText(props?.children);
  }
  return '';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="article-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ children }) {
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h2 id={id} className="article-heading-h2">
                <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
                  #
                </a>
                <span>{children}</span>
              </h2>
            );
          },
          h3({ children }) {
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h3 id={id} className="article-heading-h3">
                <span>{children}</span>
              </h3>
            );
          },
          table({ children }) {
            return (
              <div className="article-table-wrap">
                <table className="article-table">{children}</table>
              </div>
            );
          },
          blockquote({ children }) {
            return <blockquote className="article-blockquote">{children}</blockquote>;
          },
          img({ src, alt }) {
            if (typeof src !== 'string' || !alt || !isAllowedArticleImage(src)) return null;
            return (
              <figure className="article-body-figure">
                <img src={src} alt={alt} loading="lazy" />
                <figcaption>{alt}</figcaption>
              </figure>
            );
          },
          a({ href, children }) {
            if (!href || (!href.startsWith('/') && !/^https:\/\//i.test(href) && !/^mailto:/i.test(href))) {
              return <>{children}</>;
            }
            const external = /^https:\/\//i.test(href);
            return (
              <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function parseHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const hashes = match[1];
    const rawText = match[2].replace(/[*_`]/g, '').trim();
    const id = rawText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();

    if (id && rawText) {
      items.push({
        id,
        text: rawText,
        level: hashes.length as 2 | 3,
      });
    }
  }

  return items;
}

import MarkdownIt from 'markdown-it';

export async function loadMarkdown(slug: string): Promise<string> {
  // Astroでは、import.meta.glob を使って直接ファイルを読み込む
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const filePath = path.join(process.cwd(), `src/data/${slug}.md`);
  const content = await fs.readFile(filePath, 'utf-8');
  
  // フロントマターを除去してHTMLに変換
  const markdownContent = content.replace(/---[\s\S]*?---/, '').trim();
  const md = new MarkdownIt();
  return md.render(markdownContent);
}

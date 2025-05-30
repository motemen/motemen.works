# Gatsby から Astro への移行手順

## 現在のプロジェクト構成

このプロジェクトは以下の構成でGatsbyを使用している：

- **フレームワーク**: Gatsby 5.12.6
- **UI**: React 18.2.0 + MUI (@mui/material, @mui/icons-material)
- **スタイリング**: Emotion + PostCSS
- **データソース**: 
  - TSVファイル（作品リスト）
  - Markdownファイル（プロフィール、職務経歴）
- **主要機能**:
  - Google Analytics連携
  - TSV→GraphQLデータ変換
  - Markdown→HTMLレンダリング
  - TypeScript型生成

## 移行手順

### 1. プロジェクト初期化

```bash
# 新しいAstroプロジェクトを作成
npm create astro@latest motemen-works-astro

# 必要な依存関係をインストール
cd motemen-works-astro
pnpm add @astrojs/react @astrojs/typescript @astrojs/tailwind
pnpm add react react-dom
pnpm add @types/react @types/react-dom
```

### 2. astro.config.mjs 設定

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
});
```

### 3. データ移行

#### 3.1 TSVデータの処理
Gatsbyの`gatsby-transformer-csv`の代替として、以下のアプローチを使用：

```typescript
// src/utils/loadWorks.ts
export interface Work {
  Date: string;
  Name: string;
  Tags: string;
  URL?: string;
  'Repository URL'?: string;
  'Article URL'?: string;
  Select: string;
  Deprecated: string;
}

export async function loadWorks(): Promise<Work[]> {
  const response = await fetch('/src/data/works.tsv');
  const text = await response.text();
  const lines = text.split('\n');
  const headers = lines[0].split('\t');
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split('\t');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || '';
        return obj;
      }, {} as Work);
    });
}
```

#### 3.2 Markdownデータの処理
```typescript
// src/utils/loadMarkdown.ts
export async function loadMarkdown(slug: string): Promise<string> {
  const { compile } = await import('@mdx-js/mdx');
  const response = await fetch(`/src/data/${slug}.md`);
  const content = await response.text();
  
  // フロントマターを除去してHTMLに変換
  const markdownContent = content.replace(/---[\s\S]*?---/, '').trim();
  const result = await compile(markdownContent);
  return result;
}
```

### 4. コンポーネント移行

#### 4.1 Layout コンポーネント
```astro
---
// src/layouts/Layout.astro
export interface Props {
  title?: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="motemen - ソフトウェアエンジニア" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=swap" rel="stylesheet" />
    <title>{title ? `${title} | ` : ''}motemen</title>
  </head>
  <body>
    <main>
      <h1>
        <a href="/">motemen</a>
      </h1>
      <slot />
    </main>
  </body>
</html>
```

#### 4.2 WorksItem コンポーネント移行
```tsx
// src/components/WorksItem.tsx
import React from 'react';

interface Props {
  name: string;
  url?: string;
  articleURL?: string;
  repositoryURL?: string;
  tags: string[];
  year: number;
  deprecated: boolean;
}

export default function WorksItem({ 
  name, url, articleURL, repositoryURL, tags, year, deprecated 
}: Props) {
  // 既存のロジックをそのまま移行
  return (
    <li className={deprecated ? 'deprecated' : ''}>
      {/* 既存のJSXをそのまま使用 */}
    </li>
  );
}
```

### 5. ページ移行

#### 5.1 トップページ
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import WorksItem from '../components/WorksItem';
import { loadWorks } from '../utils/loadWorks';
import { loadMarkdown } from '../utils/loadMarkdown';

const works = await loadWorks();
const selectedWorks = works.filter(work => work.Select === 'TRUE');
const profileHTML = await loadMarkdown('profile');
const experiencesHTML = await loadMarkdown('experiences');
---

<Layout>
  <section class="profile">
    <div set:html={profileHTML}></div>
  </section>

  <section class="works">
    <h2>選集</h2>
    <ul>
      {selectedWorks.map(work => (
        <WorksItem
          key={work.Name}
          name={work.Name}
          url={work.URL}
          articleURL={work['Article URL']}
          repositoryURL={work['Repository URL']}
          tags={work.Tags.split(',')}
          year={parseInt(work.Date?.substring(0, 4))}
          deprecated={work.Deprecated === 'TRUE'}
          client:load
        />
      ))}
    </ul>
    <a href="/works">
      ➔ すべての作品を見る ({works.length})
    </a>
  </section>

  <section class="experiences">
    <h2>職務経歴</h2>
    <div set:html={experiencesHTML}></div>
  </section>

  <!-- リンクセクションは静的なのでそのまま移行 -->
</Layout>
```

### 6. スタイル移行

#### 6.1 CSS移行
```css
/* src/styles/global.css */
/* 既存のsite.cssの内容をそのまま移行 */
```

#### 6.2 astro.config.mjsでCSS読み込み
```javascript
export default defineConfig({
  // ...
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/global.css";`
        }
      }
    }
  }
});
```

### 7. スクリプト移行

#### 7.1 package.json更新
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev", 
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "update-works": "curl -L -o ./src/data/works.tsv 'https://docs.google.com/spreadsheets/d/19jtTn6MWEcCAryBreABNOTyQ8Trd7OzRg7_X0QqZjQU/export?format=tsv&gid=0'"
  }
}
```

### 8. Analytics設定

Astroでは`@astrojs/partytown`を使用してGoogle Analyticsを設定：

```javascript
// astro.config.mjs
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [
    // ...
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
```

```astro
<!-- Layoutコンポーネントのheadセクションに追加 -->
<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=UA-34276254-1"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-34276254-1');
</script>
```

### 9. ビルドとデプロイ

Astroの静的サイト生成でビルド：
```bash
pnpm build
```

### 10. 移行後の確認事項

- [ ] 全ページが正常に表示される
- [ ] TSVデータが正しく読み込まれる
- [ ] Markdownが正しくレンダリングされる
- [ ] リンクが正常に動作する
- [ ] Google Analyticsが動作する
- [ ] TypeScriptエラーがない
- [ ] ビルドが成功する

## 移行の利点

- **パフォーマンス向上**: Astroの部分的ハイドレーションによりJavaScriptの送信量が削減される
- **シンプルな構成**: GraphQLレイヤーが不要になり、データ処理がシンプルになる
- **高速な開発**: Astroの高速なHMRとビルド
- **SEO最適化**: 優れた静的サイト生成とSSR対応
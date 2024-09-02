# NextJS について

NextJS は React のフレームワーク.<br>
React は ウェブアプリケーションのフロントエンドを構築するための JavaScript ライブラリ.

## Project の作成

```bash
npx create-next-app hello-world
```

以下の順に質問されるので、回答する.

| 質問                                                                      | 回答 |
| ------------------------------------------------------------------------- | ---- |
| Ok to proceed? (y)                                                        | y    |
| ✔ Would you like to use TypeScript? … No / Yes                            | Yes  |
| ✔ Would you like to use ESLint? … No / Yes                                | Yes  |
| ✔ Would you like to use Tailwind CSS? … No / Yes                          | Yes  |
| ✔ Would you like to use `src/` directory? … No / Yes                      | Yes  |
| ✔ Would you like to use App Router? (recommended) … No / Yes              | Yes  |
| ✔ Would you like to customize the default import alias (@/\*)? … No / Yes | No   |

作成したら、以下のコマンドでディレクトリに移動する.

```bash
cd hello-world
```

## プロジェクトの起動

```bash
# 開発モードで起動
# ソースコードの変更を検知して自動で画面をリロードしてくれる
npm run dev

# 本番モードで起動
# リモートサーバーにデプロイする際に使用
npm run build
npm run start
```

以下でブラウザからアクセスできる.

[http://localhost:3000](http://localhost:3000)

---

## App Router について

NextJS 13 で導入されたルーティング機能.
ディレクトリ構造と URL を結びつけてくれる.

### App Router の構成ファイル

| ファイル名                                    | 説明                                   |
| --------------------------------------------- | -------------------------------------- |
| `src/app/globals.css`                         | 全てのページで適用する CSS             |
| `src/app/favicon.ico`                         | ページのタイトルバーに表示するアイコン |
| `src/app/layout.tsx`                          | 全てのページで共通のレイアウト         |
| `src/app/page.tsx`                            | ルートパスで表示するページ             |
| `src/app/<任意のサブディレクトリ>/layout.tsx` | サブパスで共通のレイアウト             |
| `src/app/<任意のサブディレクトリ>/page.tsx`   | サブパスで表示するページ               |

基本的に`page.tsx`を作成、編集していけば新しいページを作成できる.

### 新しいページを作成してみる

1. src/app に新しいディレクトリを作成する.
   ```bash
   mkdir -p src/app/hello
   ```
2. 作成したディレクトリに `page.tsx` を作成する.
   ```tsx
   // src/app/hello/page.tsx
   export default function Hello() {
     return <h1>Hello, World!</h1>;
   }
   ```
3. ブラウザで以下の URL にアクセスする.
   [http://localhost:3000/hello](http://localhost:3000/hello)

デフォルトの CSS が影響して見た目が悪いので、`globals.css`を編集して見た目を整える.

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ここから下を全て削除する */

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    ) rgb(var(--background-start-rgb));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### サブパスのページを作成してみる

先ほどと同様に`src/app/hello/child`ディレクトリを作成し、`page.tsx`を作成する.

```tsx
// src/app/hello/child/page.tsx
export default function Child() {
  return <h1>Hello, Child!</h1>;
}
```

ブラウザで以下の URL にアクセスする.
[http://localhost:3000/hello/child](http://localhost:3000/hello/child)

### サブパスで共通のレイアウトを作成してみる

layout.tsx はサブパス全てに適用される.

以下のように`layout.tsx`を作成する.

```tsx
// src/app/hello/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 space-y-10">
      <h1>This page is using a layout component</h1>
      {children}
    </div>
  );
}
```

layout.tsx のフォーマットは以下の通り.<br/>
children にはそのページのコンポーネントが入る (e.g. <Hello />, <Child />)

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

以下にアクセスして見比べてみる.

- [http://localhost:3000/hello](http://localhost:3000/hello)
- [http://localhost:3000/hello/child](http://localhost:3000/hello/child)

### パスパラメータを取得してみる

`src/app/hello/[name]/page.tsx`を作成する.

```tsx
// src/app/hello/[name]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function Name() {
  const params = useParams();

  return <h1>Hello, {params.name}!</h1>;
}
```

`use client`は NextJS 13 で導入されたクライアントサイドのみで実行されるコードを指定するディレクティブ. 簡単に言うと、ユーザのアクセスや操作によって動的に変化するコンテンツに使用する.

ブラウザで以下の URL にアクセスする.
[http://localhost:3000/hello/John](http://localhost:3000/hello/John)

### クエリパラメータを取得してみる

`src/app/hello/double/page.tsx`を作成する.

```tsx
// src/app/hello/double/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Double() {
  const query = useSearchParams().get("number");
  const input = useMemo(() => (query ? parseInt(query) : 0), [query]);

  return (
    <h1>
      {input} * 2 = {input * 2}
    </h1>
  );
}
```

ブラウザで以下の URL にアクセスする.

- [http://localhost:3000/hello/double?number=5](http://localhost:3000/hello/double?number=5)
- [http://localhost:3000/hello/double?number=10](http://localhost:3000/hello/double?number=10)

### ページのリダイレクトを行う

`src/app/hello/redirect/page.tsx`を作成する.

```tsx
// src/app/hello/redirect/page.tsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="space-x-10">
      <Link href="/hello">Go to Hello</Link>
      <Link href="/hello/child">Go to Child</Link>
    </nav>
  );
}
```

# cloudensis.com

Cloudensis合同会社のコーポレートサイト

[@cloudensis/create-hono](https://github.com/cloudensis/create-hono) のテンプレートをベースにしています。

## コマンド

| コマンド            | 内容               |
| ------------------- | ------------------ |
| `npm run dev`       | 開発サーバーを起動 |
| `npm run build`     | ビルドと SSG       |
| `npm test`          | テスト             |
| `npm run lint`      | lint               |
| `npm run format`    | 整形               |
| `npm run typecheck` | 型チェック         |

## ルーティング

`src/routes` 以下の `index.ts` / `index.tsx` がルートになります。

| ファイル                          | パス                   |
| --------------------------------- | ---------------------- |
| `routes/index.tsx`                | `/`                    |
| `routes/posts/[id]/index.tsx`     | `/posts/:id`           |
| `routes/docs/[...path]/index.tsx` | `/docs/a`, `/docs/a/b` |

- HTTP メソッド名（`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`）でハンドラーを export します。
- 固定 → パラメータ → catch-all の順に優先されます。
- 同じ URL にマッチするルートがあると起動時にエラーになります。

## SSG

`ssg = true` を export すると、`npm run build` で GET を静的 HTML に書き出します。動的ルートでは `ssgParams` も必要です。

```tsx
export const ssg = true;
export const ssgParams = () => [{ id: "1" }, { id: "2" }];
```

SSG は Node で実行するため、`cloudflare:workers` や binding は使えません。
SSG したページは Worker を経由しないため、セキュリティヘッダーは `public/_headers` で付与しています。

## デプロイ

GitHub で Release を公開すると `.github/workflows/deploy.yaml` がデプロイします。
プレビューは `.github/workflows/preview.yaml` を手動実行してください。

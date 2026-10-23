# cloudensis.com

Cloudensis合同会社のコーポレートサイト。

## ローカル環境構築

```sh
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

## デプロイ

Cloudflare CLI（[cf](https://www.npmjs.com/package/cf)）を使う。設定は `cloudflare.config.ts`。

```sh
npx cf auth login
npx cf previews deploy   # 現在のブランチ名で Preview をデプロイ
npx cf deploy            # 本番にデプロイ
```

通常は GitHub Actions から行う（本番: Release の公開時、Preview: 手動実行）。

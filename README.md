# www

Cloudensis合同会社のコーポレートサイト。Hono + Cloudflare Workers で動作する。

## ローカル開発

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー（http://localhost:5173） |
| `npm run lint` | Biome による Lint / フォーマット検査 |
| `npm run build` | 本番ビルド |
| `npm run cf-typegen` | バインディングの型定義を再生成（`wrangler.jsonc` を変更したら実行） |

ローカルではメールは実際には送信されず、内容が `.wrangler/tmp/email/` に書き出される。

## 環境変数・バインディング

| 名前 | 種別 | 説明 |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | `vars`（`wrangler.jsonc`） | Cloudflare Turnstile のサイトキー（公開値） |
| `TURNSTILE_SECRET_KEY` | secret | Turnstile のシークレットキー。本番は `npx wrangler secret put TURNSTILE_SECRET_KEY`、ローカルは `.dev.vars` |
| `EMAIL` | `send_email` | お問い合わせメールの送信。宛先は `contact@cloudensis.com` に固定 |
| `CONTACT_RATE_LIMITER` | `ratelimits` | お問い合わせフォームのレート制限 |

## 本番環境の前提

お問い合わせフォームが動作するために、Cloudflare ダッシュボードで以下を設定しておく。

1. **メール送信元ドメインの検証**: `noreply@cloudensis.com` から送信するため、`cloudensis.com` を送信ドメインとして検証する（SPF / DKIM の DNS レコード）。未検証だと `E_SENDER_NOT_VERIFIED` で送信に失敗する。
2. **宛先の受信設定**: `contact@cloudensis.com` で受信できるようにしておく（Email Routing など）。
3. **Turnstile**: ウィジェットを作成し、サイトキーを `wrangler.jsonc` に、シークレットキーを `wrangler secret put` で登録する。
4. **デプロイ後の確認**: フォームから 1 件送信し、`contact@cloudensis.com` で受信できることを確認する。送信失敗時のログは Workers Logs（observability）で確認できる。

## デプロイ

```bash
npm run build
npx wrangler deploy
```

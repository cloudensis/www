# cloudensis.com

Cloudensis合同会社のコーポレートサイト。

## ローカル環境構築

```sh
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

### Turnstile

お問い合わせフォームのボット対策に [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) を使っている。

本番用サイトキーは `wrangler.jsonc` の `vars` で定義しているが、このキーは `localhost` を許可ホスト名に含まないため、ローカル開発でそのまま使うとウィジェットが「エラーコード: 110200 (Domain not allowed)」で失敗する。

そのため `.dev.vars.example` では[テストキー](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)を指定している。ローカル開発時は `.dev.vars` の値が `wrangler.jsonc` の `vars` より優先されるので、`.dev.vars` をコピーしておけば検証が常に成功する。

検証の失敗時の挙動を確認したい場合は、`.dev.vars` のキーを以下に差し替える。

| 用途 | `TURNSTILE_SITE_KEY` | `TURNSTILE_SECRET_KEY` |
| --- | --- | --- |
| 常に成功（既定） | `1x00000000000000000000AA` | `1x0000000000000000000000000000000AA` |
| 常に失敗 | `2x00000000000000000000AB` | `2x0000000000000000000000000000000AA` |

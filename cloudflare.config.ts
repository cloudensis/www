import { bindings, defineConfig } from "cf/config";

// `cf previews deploy` で作る Preview も本番と同じ設定・バインディングを使う
export default defineConfig((ctx) => ({
	worker: {
		name: "cloudensis",
		compatibilityDate: "2026-09-18",
		entrypoint: "./src/index.tsx",
		observability: {
			logs: {
				enabled: true,
				invocationLogs: true,
				persist: true,
			},
		},
		env: {
			// .dev.vars で上書きできるのは secret だけなので、
			// ローカル開発では Turnstile のテスト用サイトキー（常に成功）を使う
			TURNSTILE_SITE_KEY: bindings.text(
				ctx.mode === "development"
					? "1x00000000000000000000AA"
					: "0x4AAAAAAE74sVfBuWWTb_at",
			),
			TURNSTILE_SECRET_KEY: bindings.secret(),
			EMAIL: bindings.sendEmail({}),
			// お問い合わせフォームの POST: 同一 IP から 60 秒間に 5 回まで
			CONTACT_RATE_LIMITER: bindings.rateLimit({
				namespace: "1001",
				simple: { limit: 5, period: 60 },
			}),
		},
	},
}));

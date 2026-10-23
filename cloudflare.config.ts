import { defineConfig } from "cf/config";

// `cf previews deploy` で作る Preview も本番と同じ設定を使う
export default defineConfig(({ mode }) => ({
	worker: {
		name: "cloudensis",
		compatibilityDate: "2026-09-18",
		// 本番は @hono/vite-ssg で書き出した静的アセットだけを配信する。
		// 開発時のみ Hono アプリを Worker として動かす。
		...(mode === "development"
			? { entrypoint: "./src/index.tsx" }
			: { assets: { notFoundHandling: "404-page" as const } }),
		observability: {
			logs: {
				enabled: true,
				invocationLogs: true,
				persist: true,
			},
		},
	},
}));

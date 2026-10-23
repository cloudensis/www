import { defineConfig } from "cf/config";

// `cf previews deploy` で作る Preview も本番と同じ設定を使う
export default defineConfig(() => ({
	worker: {
		name: "cloudensis",
		compatibilityDate: "2026-09-18",
		// Worker のコードは持たず、ビルドした静的アセットだけを配信する
		assets: {
			notFoundHandling: "404-page",
		},
		observability: {
			logs: {
				enabled: true,
				invocationLogs: true,
				persist: true,
			},
		},
	},
}));

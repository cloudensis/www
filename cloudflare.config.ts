import { defineConfig } from "cf/config";

// `cf previews deploy` で作る Preview も本番と同じ設定・バインディングを使う
export default defineConfig(() => ({
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
	},
}));

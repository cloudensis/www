import { defineConfig } from "cf/config";

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

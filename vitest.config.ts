import { defineConfig } from "vitest/config";

// vite.config.ts は Cloudflare プラグインを含むため、テストでは読み込まない
export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
	},
});

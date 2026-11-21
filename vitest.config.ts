import { defineConfig } from "vitest/config";

// vite.config.ts は Cloudflare のプラグインを含むため、テストでは使わない
export default defineConfig({
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
	},
});

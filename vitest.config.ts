import { defineConfig } from "vitest/config";

export default defineConfig({
	// vite.config.ts と同じく、.tsx を含む "#/" の import を解決する
	resolve: { alias: { "#/": "/" } },
	test: {
		include: ["src/**/*.test.ts"],
		// テストが1件もない状態でも CI を失敗させない
		passWithNoTests: true,
	},
});

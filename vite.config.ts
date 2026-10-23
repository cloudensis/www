import { cloudflare } from "@cloudflare/vite-plugin";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

export default defineConfig({
	resolve: { alias: { "#/": "/" } },
	plugins: [
		cloudflare(),
		tailwindcss(),
		// 開発時に Worker として動かしたときのホットリロード用。
		// Tailwind の Scanner が addWatchFile で登録するファイルが client の
		// モジュールグラフに載るため、morph 方式の SSR ホットリロードは発火しない。
		// フルリロード方式にして確実に反映させる。
		ssrPlugin({ hotReload: { morph: false } }),
		ssg(),
	],
	build: {
		rollupOptions: {
			input: ["src/interfaces/styles/global.css"],
			// HTML から固定のパスで参照するため、ハッシュを付けない
			output: { assetFileNames: "assets/[name][extname]" },
		},
	},
});

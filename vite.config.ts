import { cloudflare } from "@cloudflare/vite-plugin";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

export default defineConfig(({ mode, command }) => {
	if (mode === "ssg") {
		return {
			plugins: [tailwindcss(), ssg({ entry: "./src/ssg.tsx" })],
			// SSG の描画でも import.meta.env が効くよう Vite で変換する（ViteClient を出力しないため）
			resolve: { noExternal: ["vite-ssr-components"] },
			build: {
				outDir: "dist/ssg",
				emptyOutDir: true,
				// CSS を assets/global.css として書き出す（Worker と SSG の両方から参照する）
				rollupOptions: {
					input: ["./src/global.css"],
					output: {
						assetFileNames: "assets/[name][extname]",
					},
				},
			},
		};
	}

	const isServe = command === "serve";

	return {
		plugins: [
			cloudflare(),
			tailwindcss(),
			// ssrPlugin は dev のホットリロード用。build で使うとクライアントビルド（publicDir のコピー）が省略される
			// Tailwind の Scanner が addWatchFile で登録するファイルが client の
			// モジュールグラフに載るため、morph 方式の SSR ホットリロードは発火しない。
			// フルリロード方式にして確実に反映させる。
			isServe && ssrPlugin({ hotReload: { morph: false } }),
		],
		// dev では手書きの public/ のみ、build では public/ + SSG 出力を配信する
		publicDir: isServe ? "public" : "dist/ssg",
	};
});

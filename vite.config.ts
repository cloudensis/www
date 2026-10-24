import { cloudflare } from "@cloudflare/vite-plugin";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

export default defineConfig(({ command, mode }) => {
	// SSG ビルド。静的ページの HTML と Tailwind の CSS を public/ に出力し、
	// 続けて実行する `cf build` が public/ を静的アセットとして取り込む。
	if (mode === "ssg") {
		return {
			plugins: [tailwindcss(), ssg({ entry: "./src/ssg.tsx" })],
			// 出力先が public/ 自身なので、publicDir としての読み込みは行わない。
			publicDir: false,
			build: {
				outDir: "public",
				emptyOutDir: false,
				rollupOptions: {
					input: ["src/global.css"],
					output: {
						// 生成 HTML はビルドマニフェストを参照できないため、
						// スタイルシートを固定 URL で参照できるようハッシュを付けない。
						assetFileNames: "assets/[name][extname]",
					},
				},
			},
		};
	}

	return {
		plugins: [
			cloudflare(),
			tailwindcss(),
			// ssrPlugin はビルド時に builder.buildApp を差し替え、client エントリー
			// がないと client 環境のビルドを丸ごと省略する。このプロジェクトは
			// SSG ビルドへ移行して client エントリーを持たないため、ビルドで有効に
			// すると public/ が静的アセットへコピーされなくなる。dev server 限定で
			// 読み込む。
			//
			// Tailwind の Scanner が addWatchFile で登録するファイルが client の
			// モジュールグラフに載るため、morph 方式の SSR ホットリロードは発火しない。
			// フルリロード方式にして確実に反映させる。
			...(command === "serve"
				? [ssrPlugin({ hotReload: { morph: false } })]
				: []),
		],
	};
});

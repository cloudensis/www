import { cloudflare } from "@cloudflare/vite-plugin";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

const css = "src/interfaces/styles/global.css";

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
		linkBuiltCss(),
	],
	build: {
		rollupOptions: { input: [css] },
	},
});

/**
 * SSG で書き出した HTML の CSS の参照先を、ビルドしたハッシュ付きのファイルに置き換える。
 * ssg() より後に置き、書き出された HTML が bundle に入ってから実行する。
 */
function linkBuiltCss(): Plugin {
	return {
		name: "link-built-css",
		apply: "build",
		enforce: "post",
		generateBundle(_, bundle) {
			const files = Object.values(bundle);
			const built = files.find(
				(file) => file.type === "asset" && file.originalFileNames.includes(css),
			);
			if (!built) {
				this.error(`ビルドした ${css} が見つかりません`);
			}
			for (const file of files) {
				if (file.type === "asset" && file.fileName.endsWith(".html")) {
					file.source = String(file.source).replaceAll(
						`/${css}`,
						`/${built.fileName}`,
					);
				}
			}
		},
	};
}

/// <reference types="node" />

import { readFileSync } from "node:fs";
import { cloudflare } from "@cloudflare/vite-plugin";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

const SSG_OUT_DIR = "dist/ssg";
const GLOBAL_CSS = "src/global.css";

/**
 * ハッシュ付きの CSS のパスを、SSG の描画で import.meta.env.VITE_GLOBAL_CSS_HREF として参照できるようにする。
 * @hono/vite-ssg は自身の generateBundle（enforce: "post"）の中で描画用の Vite サーバーを立てるため、
 * それより前の generateBundle で環境変数に入れておけば、描画時の import.meta.env に反映される。
 */
function exposeGlobalCssHref(): Plugin {
	return {
		name: "expose-global-css-href",
		apply: "build",
		generateBundle(_options, bundle) {
			const css = Object.values(bundle).find(
				(file) =>
					file.type === "asset" && file.originalFileNames.includes(GLOBAL_CSS),
			);
			if (!css) throw new Error(`${GLOBAL_CSS} の出力が見つからない`);
			process.env.VITE_GLOBAL_CSS_HREF = `/${css.fileName}`;
		},
	};
}

/** SSG のビルドで出力したマニフェストから、ハッシュ付きの CSS のパスを読む */
function readGlobalCssHref(): string {
	const manifest = JSON.parse(
		readFileSync(`${SSG_OUT_DIR}/.vite/manifest.json`, "utf8"),
	) as Record<string, { file: string }>;
	const entry = manifest[GLOBAL_CSS];
	if (!entry) throw new Error(`manifest に ${GLOBAL_CSS} がない`);
	return `/${entry.file}`;
}

export default defineConfig(({ mode, command }) => {
	if (mode === "ssg") {
		return {
			plugins: [
				tailwindcss(),
				exposeGlobalCssHref(),
				ssg({ entry: "./src/ssg.tsx" }),
			],
			// SSG の描画でも import.meta.env が効くよう Vite で変換する（ViteClient を出力しないため）
			resolve: { noExternal: ["vite-ssr-components"] },
			build: {
				outDir: SSG_OUT_DIR,
				emptyOutDir: true,
				// Worker のビルドが CSS のパスを読むために出力する（.assetsignore で配信対象から外している）
				manifest: true,
				// CSS とフォントのファイル名にハッシュを付け、/assets/* を長期キャッシュできるようにする（public/_headers）
				rollupOptions: {
					input: [`./${GLOBAL_CSS}`],
					output: {
						assetFileNames: "assets/[name]-[hash][extname]",
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
		publicDir: isServe ? "public" : SSG_OUT_DIR,
		// Worker が描画する 404 / 500 ページも、SSG と同じハッシュ付きの CSS を参照する
		define: isServe
			? {}
			: {
					"import.meta.env.VITE_GLOBAL_CSS_HREF": JSON.stringify(
						readGlobalCssHref(),
					),
				},
	};
});

import path from "node:path";
import { type Plugin, runnerImport } from "vite";

/**
 * HTML ファイルの中身を、対応する JSX モジュールの default export を描画した結果で
 * 置き換える。描画はビルド時（開発時はリクエストごと）に行うため、
 * 配信されるのは静的な HTML だけになる。
 *
 * @param pages HTML ファイル（プロジェクトルートからの相対パス）→ JSX モジュールのパス
 */
export function staticPages(pages: Record<string, string>): Plugin {
	let root = "";

	return {
		name: "static-pages",
		configResolved(config) {
			root = config.root;
		},
		configureServer(server) {
			// ページの JSX はクライアントのモジュールグラフに載らないため、
			// 変更時はフルリロードで反映させる。
			server.watcher.on("change", (file) => {
				if (/\.tsx?$/.test(file) && file.startsWith(path.join(root, "src"))) {
					server.ws.send({ type: "full-reload" });
				}
			});
		},
		transformIndexHtml: {
			order: "pre",
			async handler(_html, ctx) {
				// 開発時は @cloudflare/vite-plugin 経由で ctx.path に絶対パスが渡ってくる
				const file = ctx.path.startsWith(`${root}/`)
					? path.relative(root, ctx.path)
					: ctx.path.slice(1);
				const page = pages[file];
				if (!page) {
					return;
				}
				const { module } = await runnerImport<{ default: unknown }>(
					path.join(root, page),
					{ root, resolve: { alias: { "#/": `${root}/` } } },
				);
				return `<!doctype html>${await module.default}`;
			},
		},
	};
}

import devServer from "@hono/vite-dev-server";
import ssg from "@hono/vite-ssg";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
	plugins: [
		command === "serve"
			? devServer({
					entry: "./src/frontend/index.tsx",
				})
			: ssg({
					entry: "./src/frontend/index.tsx",
				}),
		// サーバーサイドコード (.ts, .tsx) の変更時にブラウザを自動でフルリロードさせる
		command === "serve"
			? {
					name: "hono-html-reload",
					handleHotUpdate({ file, server }) {
						if (file.endsWith(".ts") || file.endsWith(".tsx")) {
							server.ws.send({ type: "full-reload" });
							return [];
						}
					},
				}
			: [],
	],
}));

import { cloudflare } from "@cloudflare/vite-plugin";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: { alias: { "#/": "/" } },
	plugins: [cloudflare(), tailwindcss(), ssg()],
	build: {
		rollupOptions: {
			input: ["src/interfaces/styles/global.css"],
			// HTML から固定のパスで参照するため、ハッシュを付けない
			output: { assetFileNames: "assets/[name][extname]" },
		},
	},
});

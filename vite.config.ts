import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { staticPages } from "./plugins/static-pages.ts";

export default defineConfig({
	resolve: { alias: { "#/": "/" } },
	plugins: [
		cloudflare(),
		tailwindcss(),
		staticPages({
			"index.html": "src/interfaces/routes/index.tsx",
			"404.html": "src/interfaces/routes/not-found/index.tsx",
		}),
	],
	build: {
		rollupOptions: { input: ["index.html", "404.html"] },
	},
});

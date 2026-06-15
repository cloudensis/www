import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(() => ({
	plugins: [
		tailwindcss(),
		ssg({
			entry: "./src/frontend/index.tsx",
		}),
	],
	build: {
		rolldownOptions: {
			input: ["./src/frontend/style.css"],
			output: {
				assetFileNames: "src/frontend/style.css",
			},
		},
	},
}));

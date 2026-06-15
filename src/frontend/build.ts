import * as fs from "node:fs/promises";
import { toSSG } from "hono/ssg";
import { app } from "#/frontend/index";

async function main() {
	const result = await toSSG(app, fs);

	if (result.success) {
		console.log("success to ssg");
		console.log(`generated files count: ${result.files.length}`);
	} else {
		console.error("failed to ssg", result.error);
	}
}

main().catch(console.error);

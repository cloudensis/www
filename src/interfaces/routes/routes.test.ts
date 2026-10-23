import { describe, expect, it } from "vitest";
import app from "#/src/index";

const origin = "http://localhost";

describe("ページのルーティング", () => {
	it.each(["/", "/privacy"])("%s を表示する", async (path) => {
		const res = await app.request(`${origin}${path}`);
		expect(res.status).toBe(200);
	});

	it.each(["/contact", "/contact/complete"])(
		"削除したお問い合わせページ %s は 404 を返す",
		async (path) => {
			const res = await app.request(`${origin}${path}`);
			expect(res.status).toBe(404);
		},
	);
});

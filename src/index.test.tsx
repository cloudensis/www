import { describe, expect, it } from "vitest";
import app from "./index";
import ssg from "./ssg";

describe("Worker", () => {
	it("存在しないパスは 404 ページを返す", async () => {
		const res = await app.request("/does-not-exist");

		expect(res.status).toBe(404);
		expect(res.headers.get("content-type")).toContain("text/html");
		expect(await res.text()).toContain("ページが見つかりません");
	});

	it("レスポンスにセキュリティヘッダーを付与する", async () => {
		const res = await app.request("/does-not-exist");

		expect(res.headers.get("content-security-policy")).toContain(
			"default-src 'self'",
		);
		expect(res.headers.get("strict-transport-security")).toContain("max-age=");
		expect(res.headers.get("x-content-type-options")).toBe("nosniff");
	});
});

describe("SSG", () => {
	it("トップページに必須のメタ情報と会社概要を含む", async () => {
		const res = await ssg.request("/");
		const html = await res.text();

		expect(res.status).toBe(200);
		expect(html).toContain('<html lang="ja">');
		expect(html).toContain('<meta name="description"');
		expect(html).toContain(
			'<link rel="canonical" href="https://cloudensis.com/"',
		);
		expect(html).toContain('<meta property="og:image"');
		expect(html).toContain('rel="stylesheet"');
		expect(html).toContain("Cloudensis合同会社");
		expect(html).toContain("〒980-0021");
	});

	it("sitemap.xml にサイトの URL を載せる", async () => {
		const res = await ssg.request("/sitemap.xml");

		expect(res.headers.get("content-type")).toContain("application/xml");
		expect(await res.text()).toContain("<loc>https://cloudensis.com/</loc>");
	});

	it("robots.txt で sitemap.xml の場所を示す", async () => {
		const res = await ssg.request("/robots.txt");

		expect(await res.text()).toContain(
			"Sitemap: https://cloudensis.com/sitemap.xml",
		);
	});
});

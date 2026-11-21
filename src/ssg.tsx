import { Hono } from "hono";
import { site } from "./const";
import { renderer } from "./middleware";
import { HomeTemplate } from "./template";

/**
 * ビルド時に静的ファイルとして書き出すページ。
 * 本番では dist/ssg の静的アセットとして配信され、Worker を経由しない。
 */
const ssg = new Hono();

/** sitemap.xml に載せるページのパス。ページを追加したらここにも追加する */
export const pagePaths = ["/"] as const;

ssg.use(renderer);

ssg.get("/", (c) => c.render(<HomeTemplate />));

ssg.get("/robots.txt", (c) =>
	c.text(
		[
			"User-agent: *",
			"Allow: /",
			"",
			`Sitemap: ${new URL("/sitemap.xml", site.url)}`,
			"",
		].join("\n"),
	),
);

ssg.get("/sitemap.xml", (c) => {
	const urls = pagePaths
		.map(
			(path) => `  <url>\n    <loc>${new URL(path, site.url)}</loc>\n  </url>`,
		)
		.join("\n");
	return c.body(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		200,
		{ "Content-Type": "application/xml; charset=UTF-8" },
	);
});

export default ssg;

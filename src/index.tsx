import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { ErrorTemplate } from "./components/templates";
import { type RouteModule, registerRoutes } from "./lib/router";
import { securityHeaders } from "./middleware";
import { renderer } from "./renderer";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.use(trimTrailingSlash({ alwaysRedirect: true }));
app.use(securityHeaders, renderer);

registerRoutes(
	app,
	import.meta.glob<RouteModule>("./routes/**/index.{ts,tsx}", { eager: true }),
);

app.notFound((c) => {
	c.status(404);
	return c.render(
		<ErrorTemplate
			title="ページが見つかりません"
			message="お探しのページは移動または削除された可能性があります。URLをご確認ください。"
		/>,
		{
			title: "ページが見つかりません",
			description: "お探しのページは見つかりませんでした。",
			noindex: true,
		},
	);
});

app.onError((c) => {
	console.error("Unhandled error", c.error);
	c.status(500);
	return c.render(
		<ErrorTemplate
			title="エラーが発生しました"
			message="申し訳ありません。処理中に問題が発生しました。時間をおいて、再度お試しください。"
		/>,
		{
			title: "エラーが発生しました",
			description: "処理中に問題が発生しました。",
			noindex: true,
		},
	);
});

export default app;

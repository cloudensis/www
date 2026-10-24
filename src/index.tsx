import { Hono } from "hono";
import { renderer, securityHeaders } from "./middleware";
import ssg from "./ssg";
import { ErrorTemplate } from "./template";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.use(securityHeaders, renderer);

// SSG 対象のページは本番では静的アセットとして配信されるため、開発時のみ Worker で描画する
if (import.meta.env.DEV) {
	app.route("/", ssg);
}

app.notFound((c) => {
	c.status(404);
	return c.render(
		<ErrorTemplate
			title="ページが見つかりません"
			message="お探しのページは移動または削除された可能性があります。URLをご確認ください。"
		/>,
	);
});

app.onError(async (error, c) => {
	console.error("Unhandled error", error);
	c.status(500);
	return c.render(
		<ErrorTemplate
			title="エラーが発生しました"
			message="申し訳ありません。処理中に問題が発生しました。時間をおいて、再度お試しください。"
		/>,
	);
});

export default app;

import { type Context, Hono } from "hono";
import type { Env } from "#/src/interfaces/app";
import { renderer } from "#/src/interfaces/middleware/renderer";
import { paths } from "#/src/interfaces/paths";
import { registerHome } from "#/src/interfaces/routes/index";
import { Template as NotFoundTemplate } from "#/src/interfaces/routes/not-found/template";

const app = new Hono<Env>();

app.use(renderer);

registerHome(app);

// 本番ではビルド時に 404.html として書き出し、静的アセットの 404-page として返す
const renderNotFound = (c: Context<Env>) =>
	c.render(<NotFoundTemplate />, {
		title: "ページが見つかりません",
		noindex: true,
	});

app.get(paths.notFound, renderNotFound);

// 開発時に Worker として動かしたとき用
app.notFound((c) => {
	c.status(404);
	return renderNotFound(c);
});

export default app;

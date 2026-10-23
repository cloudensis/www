import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import type { Env } from "#/src/interfaces/app";
import { renderer } from "#/src/interfaces/middleware/renderer";
import { securityHeaders } from "#/src/interfaces/middleware/secure-headers";
import { Template as ErrorTemplate } from "#/src/interfaces/routes/error/template";
import { registerHome } from "#/src/interfaces/routes/index";
import { Template as NotFoundTemplate } from "#/src/interfaces/routes/not-found/template";

const app = new Hono<Env>();

app.use(securityHeaders, renderer, csrf());

registerHome(app);

app.notFound((c) => {
	c.status(404);
	return c.render(<NotFoundTemplate />, {
		title: "ページが見つかりません",
		noindex: true,
	});
});

app.onError(async (c, next) => {
	// CSRF の 403 など、意図して投げられた HTTP エラーは組み込みのハンドラーでそのまま返す
	if (c.error instanceof HTTPException) {
		return next();
	}

	console.error("Unhandled error", c.error);
	c.status(500);
	return c.render(<ErrorTemplate />, {
		title: "エラーが発生しました",
		noindex: true,
	});
});

export default app;

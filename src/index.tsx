import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";
import { contactRateLimit } from "#/src/interfaces/middleware/rate-limit";
import { renderer } from "#/src/interfaces/middleware/renderer";
import { contactCompleteRoutes } from "#/src/interfaces/routes/contact/complete/index";
import { contactRoutes } from "#/src/interfaces/routes/contact/index";
import { Template as ErrorTemplate } from "#/src/interfaces/routes/error/template";
import { homeRoutes } from "#/src/interfaces/routes/index";
import { Template as NotFoundTemplate } from "#/src/interfaces/routes/not-found/template";
import { privacyRoutes } from "#/src/interfaces/routes/privacy/index";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
	secureHeaders({
		contentSecurityPolicy: {
			defaultSrc: ["'self'"],
			// Turnstile のウィジェット
			scriptSrc: ["'self'", "https://challenges.cloudflare.com"],
			frameSrc: ["https://challenges.cloudflare.com"],
			// Tailwind の開発時インジェクションと Turnstile のインラインスタイル
			styleSrc: ["'self'", "'unsafe-inline'"],
			imgSrc: ["'self'", "data:"],
			fontSrc: ["'self'"],
			connectSrc: ["'self'"],
			objectSrc: ["'none'"],
			baseUri: ["'self'"],
			formAction: ["'self'"],
			frameAncestors: ["'none'"],
		},
	}),
);
app.use(renderer);
app.use(csrf());

// お問い合わせフォーム: ボディサイズ上限とレート制限
app.use("/contact", bodyLimit({ maxSize: 64 * 1024 }));
app.use("/contact", contactRateLimit);

app.route("/", homeRoutes);
app.route("/", contactRoutes);
app.route("/", contactCompleteRoutes);
app.route("/", privacyRoutes);

app.notFound((c) => {
	c.status(404);
	return c.render(<NotFoundTemplate />);
});

app.onError((error, c) => {
	// CSRF の 403 など、意図して投げられた HTTP エラーはそのまま返す
	if (error instanceof HTTPException) {
		return error.getResponse();
	}

	console.error("Unhandled error", error);
	c.status(500);
	return c.render(<ErrorTemplate />);
});

export default app;

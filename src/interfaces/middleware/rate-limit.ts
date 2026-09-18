import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

/**
 * お問い合わせフォームの POST を IP 単位で制限する。
 * 上限は wrangler.jsonc の ratelimits（CONTACT_RATE_LIMITER）で設定する。
 */
export const contactRateLimit: MiddlewareHandler<{
	Bindings: CloudflareBindings;
}> = async (c, next) => {
	if (c.req.method !== "POST") {
		return next();
	}

	const key = c.req.header("CF-Connecting-IP") ?? "unknown";
	const { success } = await c.env.CONTACT_RATE_LIMITER.limit({ key });
	if (!success) {
		throw new HTTPException(429, {
			message:
				"送信回数が上限に達しました。しばらく時間をおいて、再度お試しください。",
		});
	}

	await next();
};

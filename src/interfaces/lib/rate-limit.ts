import type { Context } from "hono";
import type { Env } from "#/src/interfaces/app";

/**
 * お問い合わせの送信が IP 単位の上限を超えているかを判定する。
 * 上限は wrangler.jsonc の ratelimits（CONTACT_RATE_LIMITER）で設定する。
 *
 * 上限超過時にフォームの入力内容を保ったままエラーを表示できるよう、
 * 例外は投げずに結果だけを返す。
 */
export async function isContactRateLimited(c: Context<Env>): Promise<boolean> {
	const key = c.req.header("CF-Connecting-IP") ?? "unknown";
	const { success } = await c.env.CONTACT_RATE_LIMITER.limit({ key });
	return !success;
}

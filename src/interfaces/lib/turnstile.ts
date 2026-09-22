const siteverifyUrl =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

const timeoutMs = 10_000;

type SiteverifyResponse = {
	success: boolean;
	"error-codes"?: string[];
};

type VerifyTurnstileInput = {
	secretKey: string;
	token: string;
	remoteIp?: string;
};

/**
 * Turnstile のトークンを Cloudflare の siteverify API で検証する。
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function verifyTurnstile({
	secretKey,
	token,
	remoteIp,
}: VerifyTurnstileInput): Promise<boolean> {
	if (token === "") return false;

	const body = new FormData();
	body.append("secret", secretKey);
	body.append("response", token);
	if (remoteIp) body.append("remoteip", remoteIp);

	// 通信エラーやタイムアウト、不正な応答は検証失敗として扱い、
	// 呼び出し側でフォームの入力内容を保ったままエラーを表示できるようにする
	try {
		const response = await fetch(siteverifyUrl, {
			method: "POST",
			body,
			signal: AbortSignal.timeout(timeoutMs),
		});
		if (!response.ok) {
			console.error("Turnstile siteverify request failed", response.status);
			return false;
		}

		const result = (await response.json()) as SiteverifyResponse;
		if (result.success !== true) {
			console.warn("Turnstile verification failed", result["error-codes"]);
			return false;
		}
		return true;
	} catch (error) {
		console.error("Turnstile siteverify request errored", error);
		return false;
	}
}

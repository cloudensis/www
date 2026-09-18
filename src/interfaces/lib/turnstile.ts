const siteverifyUrl =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

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

	const response = await fetch(siteverifyUrl, { method: "POST", body });
	if (!response.ok) {
		console.error("Turnstile siteverify request failed", response.status);
		return false;
	}

	const result = (await response.json()) as SiteverifyResponse;
	if (!result.success) {
		console.warn("Turnstile verification failed", result["error-codes"]);
	}
	return result.success;
}

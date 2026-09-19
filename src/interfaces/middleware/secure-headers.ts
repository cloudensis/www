import { secureHeaders } from "hono/secure-headers";

/**
 * 全レスポンスにセキュリティヘッダーを付与する。
 * Content-Security-Policy 以外（HSTS や X-Content-Type-Options など）は
 * secureHeaders の既定値をそのまま利用する。
 */
export const securityHeaders = secureHeaders({
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
});

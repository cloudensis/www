import { secureHeaders } from "hono/secure-headers";

/**
 * 全レスポンスにセキュリティヘッダーを付与する。
 * Content-Security-Policy 以外（HSTS や X-Content-Type-Options など）は
 * secureHeaders の既定値をそのまま利用する。
 */
export const securityHeaders = secureHeaders({
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
		// Tailwind の開発時インジェクション
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

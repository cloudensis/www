import { secureHeaders } from "hono/secure-headers";

/**
 * 全レスポンスにセキュリティヘッダーを付与する。
 * Content-Security-Policy 以外（HSTS や X-Content-Type-Options など）は
 * secureHeaders の既定値をそのまま利用する。
 * SSG したページは Worker を経由しないため、public/_headers でも同等のヘッダーを付与している。
 */
export const securityHeaders = secureHeaders({
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
		// 開発時は Vite がスタイルをインラインで注入するため unsafe-inline を許可する
		styleSrc: import.meta.env.DEV ? ["'self'", "'unsafe-inline'"] : ["'self'"],
		imgSrc: ["'self'", "data:"],
		fontSrc: ["'self'"],
		connectSrc: ["'self'"],
		objectSrc: ["'none'"],
		baseUri: ["'self'"],
		formAction: ["'self'"],
		frameAncestors: ["'none'"],
	},
});

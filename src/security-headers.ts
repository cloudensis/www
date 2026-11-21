/**
 * セキュリティヘッダーの唯一の定義。
 *
 * - Worker が返すレスポンス（404 / 500）には src/middleware.tsx のミドルウェアが付与する。
 * - 静的アセット（SSG した HTML を含む）は Worker を経由しないため、
 *   SSG のビルド時にこの定義から dist/ssg/_headers を生成する（vite.config.ts）。
 *
 * どちらも同じ定義から作るので、内容が食い違わない。
 */

type Options = {
	/** 開発時は Vite がスタイルをインラインで注入するため、style-src に 'unsafe-inline' を許可する */
	dev?: boolean;
};

export function getSecurityHeaders({
	dev = false,
}: Options = {}): Record<string, string> {
	const csp: Record<string, string[]> = {
		"default-src": ["'self'"],
		"script-src": ["'self'"],
		"style-src": dev ? ["'self'", "'unsafe-inline'"] : ["'self'"],
		"img-src": ["'self'", "data:"],
		"font-src": ["'self'"],
		"connect-src": ["'self'"],
		"object-src": ["'none'"],
		"base-uri": ["'self'"],
		"form-action": ["'self'"],
		"frame-ancestors": ["'none'"],
	};

	return {
		"Content-Security-Policy": Object.entries(csp)
			.map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
			.join("; "),
		"Strict-Transport-Security": "max-age=15552000; includeSubDomains",
		"X-Content-Type-Options": "nosniff",
		// frame-ancestors 'none' に合わせる（CSP 非対応の古いブラウザ向け）
		"X-Frame-Options": "DENY",
		"Referrer-Policy": "no-referrer",
		"Cross-Origin-Opener-Policy": "same-origin",
		"Cross-Origin-Resource-Policy": "same-origin",
		"Origin-Agent-Cluster": "?1",
		"X-DNS-Prefetch-Control": "off",
		"X-Permitted-Cross-Domain-Policies": "none",
		// XSS Auditor は誤検知を悪用されるおそれがあるため、明示的に無効にする
		"X-XSS-Protection": "0",
		// サイトで使わないブラウザ機能を無効にする
		"Permissions-Policy":
			"camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
	};
}

/** Cloudflare の静的アセット用 _headers ファイルの内容を作る */
export function toHeadersFile(headers: Record<string, string>): string {
	const lines = Object.entries(headers).map(
		([name, value]) => `  ${name}: ${value}`,
	);
	return [
		"# このファイルは src/security-headers.ts から生成している。直接編集しない。",
		"/*",
		...lines,
		"",
	].join("\n");
}

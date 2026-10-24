import { LogoLockup } from "@cloudensis/design-system/brand/cloudensis/logo-lockup";
import { jsxRenderer } from "hono/jsx-renderer";
import { secureHeaders } from "hono/secure-headers";
import { ViteClient } from "vite-ssr-components/hono";
import { company, site } from "./const";

/**
 * 全レスポンスにセキュリティヘッダーを付与する。
 * Content-Security-Policy 以外（HSTS や X-Content-Type-Options など）は
 * secureHeaders の既定値をそのまま利用する。
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

export const renderer = jsxRenderer(({ children }) => {
	const ogImageUrl = new URL("/ogp.png", site.url).toString();

	return (
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{site.name}</title>
				<meta name="description" content={site.description} />
				<link rel="canonical" href={site.url} />

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={site.name} />
				<meta property="og:title" content={site.name} />
				<meta property="og:description" content={site.description} />
				<meta property="og:url" content={site.url} />
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:locale" content="ja_JP" />
				<meta name="twitter:card" content="summary_large_image" />

				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="apple-touch-icon" href="/logo.png" />

				<ViteClient />
				<link
					href={import.meta.env.DEV ? "/src/global.css" : "/assets/global.css"}
					rel="stylesheet"
				/>
			</head>
			<body class="flex min-h-svh flex-col">
				<Header />
				<main class="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
});

function Header() {
	return (
		<header class="sticky top-0 z-10 flex h-14 items-center border-default border-b bg-default px-4 lg:px-6">
			<LogoLockup class="text-lg" />
		</header>
	);
}

function Footer() {
	return (
		<footer class="flex flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm lg:px-8">
			<span>
				&copy; {new Date().getFullYear()} {company.name}
			</span>
			<nav class="flex flex-wrap gap-x-4 gap-y-2">
				<a
					href="https://github.com/cloudensis/"
					class="underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				<a
					href="https://x.com/cloudensis/"
					class="underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					X
				</a>
			</nav>
		</footer>
	);
}

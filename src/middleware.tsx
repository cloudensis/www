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

/** ページごとに c.render の第 2 引数で渡すメタ情報 */
export type PageMeta = {
	/** ページ名。省略するとトップページの title（site.title）になる */
	title?: string;
	/** 省略すると site.description になる */
	description?: string;
	/** canonical / og:url に使うパス。エラーページなど URL が一意でないページでは省略する */
	path?: string;
	/** 検索エンジンにインデックスさせない（エラーページなど） */
	noindex?: boolean;
};

export const renderer = jsxRenderer(
	({ children, title, description = site.description, path, noindex }) => {
		const pageTitle = title ? `${title} | ${company.name}` : site.title;
		const canonicalUrl = path ? new URL(path, site.url).toString() : undefined;
		const ogImageUrl = new URL("/ogp.png", site.url).toString();

		return (
			<html lang="ja">
				<head>
					<meta charset="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<title>{pageTitle}</title>
					<meta name="description" content={description} />
					{noindex && <meta name="robots" content="noindex" />}
					{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

					<meta property="og:type" content="website" />
					<meta property="og:site_name" content={site.name} />
					<meta property="og:title" content={pageTitle} />
					<meta property="og:description" content={description} />
					{canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
					<meta property="og:image" content={ogImageUrl} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta property="og:image:alt" content={`${site.name} のロゴ`} />
					<meta property="og:locale" content="ja_JP" />
					<meta name="twitter:card" content="summary_large_image" />

					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<link rel="apple-touch-icon" href="/logo.png" />

					<ViteClient />
					<link
						href={
							import.meta.env.DEV ? "/src/global.css" : "/assets/global.css"
						}
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
	},
);

function Header() {
	return (
		<header class="sticky top-0 z-10 flex h-14 items-center border-b border-(--border-color-default) bg-(--background-color-default) px-4 lg:px-6">
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

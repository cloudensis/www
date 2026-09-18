import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { site } from "#/src/domains/company/constants";
import { Footer } from "#/src/interfaces/components/layout/footer";
import { Header } from "#/src/interfaces/components/layout/header";

type PageMeta = {
	/** ページ固有のタイトル。省略時はサイト名のみ */
	title?: string;
	/** meta description。省略時はサイト共通の説明文 */
	description?: string;
	/** 検索エンジンにインデックスさせないページ */
	noindex?: boolean;
};

declare module "hono" {
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: Hono の型をモジュール拡張するには interface が必要
		(
			content: string | Promise<string>,
			props?: PageMeta,
		): Response | Promise<Response>;
	}
}

export const renderer = jsxRenderer(
	({ children, title, description, noindex }) => {
		const c = useRequestContext();
		const pageTitle = title ? `${title} | ${site.name}` : site.name;
		const pageDescription = description ?? site.description;
		const canonicalUrl = new URL(c.req.path, site.url).toString();
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
					<meta name="description" content={pageDescription} />
					{noindex && <meta name="robots" content="noindex" />}
					<link rel="canonical" href={canonicalUrl} />

					<meta property="og:type" content="website" />
					<meta property="og:site_name" content={site.name} />
					<meta property="og:title" content={pageTitle} />
					<meta property="og:description" content={pageDescription} />
					<meta property="og:url" content={canonicalUrl} />
					<meta property="og:image" content={ogImageUrl} />
					<meta property="og:locale" content="ja_JP" />
					<meta name="twitter:card" content="summary" />

					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<link rel="apple-touch-icon" href="/logo.png" />

					<ViteClient />
					<Link href="/src/interfaces/styles/global.css" rel="stylesheet" />
				</head>
				<body class="flex min-h-svh flex-col bg-neutral-100 font-light text-neutral-600">
					<Header />
					<main class="flex-1">{children}</main>
					<Footer />
				</body>
			</html>
		);
	},
);

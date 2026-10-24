import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { ViteClient } from "vite-ssr-components/hono";
import { site } from "#/src/domains/company/constants";
import { Footer } from "#/src/interfaces/components/footer";
import { Header } from "#/src/interfaces/components/header";

type PageMeta = {
	/** ページ名。`{ページ名} | {サイト名}` の形でタイトルに使う。省略時はサイト名のみ。 */
	title?: string;
	/** 省略時はサイト共通の説明文を使う。 */
	description?: string;
	/** 404 ページなど、検索結果に載せないページで true にする。 */
	noindex?: boolean;
};

declare module "hono" {
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: ContextRenderer は interface の宣言マージで拡張する
		(
			content: string | Promise<string>,
			meta?: PageMeta,
		): Response | Promise<Response>;
	}
}

export const renderer = jsxRenderer(({ children, ...props }) => {
	const c = useRequestContext();
	const meta: PageMeta = props;
	const title = meta.title ? `${meta.title} | ${site.name}` : site.name;
	const description = meta.description ?? site.description;
	const canonicalUrl = new URL(c.req.path, site.url).toString();
	const ogImageUrl = new URL("/ogp.png", site.url).toString();

	return (
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
				<meta name="description" content={description} />
				{meta.noindex ? (
					<meta name="robots" content="noindex" />
				) : (
					<link rel="canonical" href={canonicalUrl} />
				)}

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={site.name} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				{!meta.noindex && <meta property="og:url" content={canonicalUrl} />}
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:locale" content="ja_JP" />
				<meta name="twitter:card" content="summary_large_image" />

				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="apple-touch-icon" href="/logo.png" />

				{
					// ViteClient は node_modules から読み込まれ import.meta.env を参照できず、
					// SSG のビルド時にも開発用のスクリプトを出力してしまうため、ここで判定する
					import.meta.env.DEV && <ViteClient />
				}
				<link
					href={
						// 本番は vite.config.ts で固定のファイル名にしてビルドした CSS を参照する
						import.meta.env.DEV
							? "/src/interfaces/styles/global.css"
							: "/assets/global.css"
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
});

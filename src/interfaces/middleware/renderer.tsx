import { Footer } from "@cloudensis/design-system/components/layout/footer";
import { Header } from "@cloudensis/design-system/components/layout/header";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { company, site } from "#/src/domains/company/constants";
import { paths } from "#/src/interfaces/paths";

type PageMeta = {
	/** ページ名。`{ページ名} | {サイト名}` の形でタイトルに使う。省略時はサイト名のみ。 */
	title?: string;
	/** 省略時はサイト共通の説明文を使う。 */
	description?: string;
	/** 404 やエラー画面など、検索結果に載せないページで true にする。 */
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

// 通常のページのメタ情報。404 やエラー画面は c.render の第2引数で渡す。
const pageMeta: Record<string, PageMeta> = {
	[paths.contact]: {
		title: "お問い合わせ",
		description:
			"cloudensisへのお問い合わせはこちらから。ソフトウェア開発支援、技術教育、自社プロダクト開発に関するご相談を受け付けています。",
	},
	[paths.contactComplete]: { title: "お問い合わせ完了", noindex: true },
	[paths.privacy]: {
		title: "プライバシーポリシー",
		description: `${company.name}のプライバシーポリシー（個人情報の取扱いについて）です。`,
	},
};

export const renderer = jsxRenderer(({ children, ...props }) => {
	const c = useRequestContext();
	const meta: PageMeta = { ...pageMeta[c.req.path], ...props };
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

				<ViteClient />
				<Link href="/src/interfaces/styles/global.css" rel="stylesheet" />
			</head>
			<body class="flex min-h-svh flex-col">
				<Header homeHref={paths.home} title={site.name} />
				<main class="flex-1">{children}</main>
				<Footer
					copyrightHolder={site.name}
					links={[
						{
							href: "https://github.com/cloudensis/",
							label: "GitHub",
							external: true,
						},
						{
							href: paths.privacy,
							label: "プライバシーポリシー",
							external: true,
						},
					]}
				/>
			</body>
		</html>
	);
});

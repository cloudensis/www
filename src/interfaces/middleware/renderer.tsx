import { Footer } from "@cloudensis/design-system/components/layout/footer";
import { Header } from "@cloudensis/design-system/components/layout/header";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { company, site } from "#/src/domains/company/constants";
import { paths } from "#/src/interfaces/paths";

export const renderer = jsxRenderer(({ children }) => {
	const c = useRequestContext();
	const canonicalUrl = new URL(c.req.path, site.url).toString();
	const ogImageUrl = new URL("/ogp.png", site.url).toString();

	return (
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{site.name}</title>
				<meta name="description" content={site.description} />
				<link rel="canonical" href={canonicalUrl} />

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={site.name} />
				<meta property="og:title" content={site.name} />
				<meta property="og:description" content={site.description} />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:locale" content="ja_JP" />
				<meta name="twitter:card" content="summary" />

				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="apple-touch-icon" href="/logo.png" />

				<ViteClient />
				<Link href="/src/interfaces/styles/global.css" rel="stylesheet" />
			</head>
			<body class="flex min-h-svh flex-col">
				<Header homeHref={paths.home} title={site.name} />
				<main class="flex-1">{children}</main>
				<Footer
					copyrightHolder={company.name}
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

import { LogoLockup } from "@cloudensis/design-system/brand/cloudensis/logo-lockup";
import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { company, site } from "./const";

export type Meta = {
	title: string;
	description: string;
	noindex?: boolean;
};

type Render = (content: string | Promise<string>, meta: Meta) => Response;

declare module "hono" {
	interface ContextRenderer extends Render {}
}

export const renderer = jsxRenderer(
	({ children, title, description, noindex }, c) => {
		const url = new URL(c.req.path, site.url).toString();
		const ogImageUrl = new URL("/ogp.png", site.url).toString();

		return (
			<html lang="ja">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>{title}</title>
					<meta name="description" content={description} />
					{noindex ? (
						<meta name="robots" content="noindex, nofollow" />
					) : (
						<link rel="canonical" href={url} />
					)}

					<meta property="og:type" content="website" />
					<meta property="og:site_name" content={site.name} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:url" content={url} />
					<meta property="og:image" content={ogImageUrl} />
					<meta property="og:locale" content="ja_JP" />
					<meta name="twitter:card" content="summary_large_image" />

					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<link rel="apple-touch-icon" href="/logo.png" />

					<Link href="/src/style.css" rel="stylesheet" />
					<ViteClient />
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
		<header class="border-default bg-default sticky top-0 z-10 flex h-14 items-center border-b px-4 lg:px-6">
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

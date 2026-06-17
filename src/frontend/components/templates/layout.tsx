import type { Child } from "hono/jsx";

type LayoutProps = {
	children: Child;
	title?: string;
	description?: string;
	path?: string;
};

const SITE_URL = "https://cloudensis.com";
const DEFAULT_TITLE = "Cloudensis合同会社";
const DEFAULT_DESCRIPTION =
	"Cloudensis合同会社は、Go・TypeScript・Next.jsなどのモダンな技術スタックによるシステム開発支援、技術教育、自社プロダクト開発を行う仙台の合同会社です。";

export function Layout({
	children,
	title = DEFAULT_TITLE,
	description = DEFAULT_DESCRIPTION,
	path = "/",
}: LayoutProps) {
	const url = `${SITE_URL}${path}`;
	return (
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content={description} />
				<link rel="canonical" href={url} />
				<link rel="icon" href="/logo.svg" />
				<link rel="stylesheet" href="/src/frontend/style.css" />
				<title>{title}</title>

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={DEFAULT_TITLE} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={url} />
				<meta property="og:image" content={`${SITE_URL}/og-image.png`} />
				<meta property="og:locale" content="ja_JP" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
			</head>
			<body>{children}</body>
		</html>
	);
}

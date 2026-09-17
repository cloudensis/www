import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";
import { Footer } from "#/src/interfaces/components/layout/footer";
import { Header } from "#/src/interfaces/components/layout/header";

export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>cloudensis</title>
				<link rel="icon" type="image/x-icon" href="/favicon.svg" />

				<ViteClient />
				<Link href="/src/interfaces/styles/global.css" rel="stylesheet" />
			</head>
			<body class="bg-neutral-100 font-light text-neutral-600">
				<Header />
				<main class="mx-auto max-w-5xl space-y-20 px-4 lg:px-8">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
});

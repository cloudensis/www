import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

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
			<body class="bg-neutral-100 font-light text-neutral-600">{children}</body>
		</html>
	);
});

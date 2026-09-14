import { jsxRenderer } from "hono/jsx-renderer";
import { ViteClient } from "vite-ssr-components/hono";

export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang="ja">
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon.svg" />
				<ViteClient />
			</head>
			<body>{children}</body>
		</html>
	);
});

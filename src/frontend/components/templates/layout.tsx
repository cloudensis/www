import type { Child } from "hono/jsx";

type LayoutProps = {
	children: Child;
};

export function Layout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="/src/frontend/style.css" />
				<title>cloudensis</title>
			</head>
			<body>{children}</body>
		</html>
	);
}

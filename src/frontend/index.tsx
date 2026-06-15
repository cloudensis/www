import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.html(
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="/src/frontend/style.css" />
				<title>cloudensis</title>
			</head>
			<body>
				<h1 class="text-blue-800 text-2xl">home test</h1>
			</body>
		</html>,
	);
});

export default app;

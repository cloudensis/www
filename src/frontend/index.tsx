import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.html(
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>cloudensis</title>
			</head>
			<body>
				<h1>home</h1>
			</body>
		</html>,
	);
});

export default app;

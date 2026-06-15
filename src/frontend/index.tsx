import { Hono } from "hono";
import { Home } from "./components/templates/home";
import { Layout } from "./components/templates/layout";

const app = new Hono();

app.get("/", (c) => {
	return c.html(
		<Layout>
			<Home />
		</Layout>,
	);
});

export default app;

import { Hono } from "hono";
import { renderer } from "#/src/interfaces/middleware/renderer";
import { homeRoutes } from "#/src/interfaces/routes/index";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer);

app.route("/", homeRoutes);

export default app;

import { Hono } from "hono";
import { renderer } from "#/src/interfaces/middleware/renderer";
import { homeRoutes } from "#/src/interfaces/routes/index";
import { privacyRoutes } from "#/src/interfaces/routes/privacy/index";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer);

app.route("/", homeRoutes);
app.route("/", privacyRoutes);

export default app;

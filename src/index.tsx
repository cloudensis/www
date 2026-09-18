import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { renderer } from "#/src/interfaces/middleware/renderer";
import { contactCompleteRoutes } from "#/src/interfaces/routes/contact/complete/index";
import { contactRoutes } from "#/src/interfaces/routes/contact/index";
import { homeRoutes } from "#/src/interfaces/routes/index";
import { privacyRoutes } from "#/src/interfaces/routes/privacy/index";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer);
app.use(csrf());

app.route("/", homeRoutes);
app.route("/", contactRoutes);
app.route("/", contactCompleteRoutes);
app.route("/", privacyRoutes);

export default app;

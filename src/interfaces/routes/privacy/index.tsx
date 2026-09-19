import { Hono } from "hono";
import { Template } from "./template";

export const privacyRoutes = new Hono<{ Bindings: CloudflareBindings }>();

privacyRoutes.get("/privacy", async (c) => {
	return c.render(<Template />);
});

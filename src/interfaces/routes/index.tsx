import { Hono } from "hono";
import { Template } from "./template";

export const homeRoutes = new Hono<{ Bindings: CloudflareBindings }>();

homeRoutes.get("/", async (c) => {
	return c.render(<Template />);
});

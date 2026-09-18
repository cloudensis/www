import { Hono } from "hono";
import { Template } from "./template";

export const contactCompleteRoutes = new Hono<{
	Bindings: CloudflareBindings;
}>();

contactCompleteRoutes.get("/contact/complete", async (c) => {
	return c.render(<Template />, {
		title: "お問い合わせを受け付けました",
		noindex: true,
	});
});

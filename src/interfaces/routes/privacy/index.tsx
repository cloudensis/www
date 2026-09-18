import { Hono } from "hono";
import { Template } from "./template";

export const privacyRoutes = new Hono<{ Bindings: CloudflareBindings }>();

privacyRoutes.get("/privacy", async (c) => {
	return c.render(<Template />, {
		title: "プライバシーポリシー",
		description:
			"Cloudensis合同会社のウェブサイトにおける個人情報の取扱いについて定めたプライバシーポリシーです。",
	});
});

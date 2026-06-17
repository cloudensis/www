import { Hono } from "hono";
import { Home } from "./components/templates/home";
import { Layout } from "./components/templates/layout";
import { Privacy } from "./components/templates/privacy";

const app = new Hono();

app.get("/", (c) => {
	return c.html(
		<Layout>
			<Home />
		</Layout>,
	);
});

app.get("/privacy", (c) => {
	return c.html(
		<Layout
			title="プライバシーポリシー | Cloudensis合同会社"
			description="Cloudensis合同会社のプライバシーポリシーです。お問い合わせフォームで取得する個人情報の取り扱いについて記載しています。"
			path="/privacy"
		>
			<Privacy />
		</Layout>,
	);
});

export default app;

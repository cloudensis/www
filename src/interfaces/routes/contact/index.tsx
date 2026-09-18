import { Hono } from "hono";
import { contactEmail } from "#/src/domains/contact/constants";
import {
	formatContactEmail,
	validateContact,
} from "#/src/domains/contact/contact";
import { verifyTurnstile } from "#/src/interfaces/lib/turnstile";
import { type ContactFormValues, emptyValues, Template } from "./template";

export const contactRoutes = new Hono<{ Bindings: CloudflareBindings }>();

const contactDescription =
	"ソフトウェア開発支援、技術教育、自社プロダクトに関するご相談・ご依頼はこちらからお問い合わせください。";

contactRoutes.get("/contact", async (c) => {
	// 事業内容からの導線: /contact?type=... でお問い合わせ種別を事前選択する
	const values = { ...emptyValues, type: c.req.query("type") ?? "" };
	return c.render(
		<Template turnstileSiteKey={c.env.TURNSTILE_SITE_KEY} values={values} />,
		{ title: "お問い合わせ", description: contactDescription },
	);
});

contactRoutes.post("/contact", async (c) => {
	const turnstileSiteKey = c.env.TURNSTILE_SITE_KEY;
	// フォーム以外の Content-Type で送られた場合は 400 を返す
	const form = await c.req.formData().catch(() => null);
	if (form === null) {
		return c.text("Bad Request", 400);
	}
	const values: ContactFormValues = {
		name: text(form, "name"),
		companyName: text(form, "company-name"),
		email: text(form, "email"),
		type: text(form, "contact-type"),
		message: text(form, "message"),
		consent: form.get("consent") !== null,
	};
	const result = validateContact({ ...values, consent: form.get("consent") });

	if (!result.success) {
		c.status(400);
		return c.render(
			<Template
				turnstileSiteKey={turnstileSiteKey}
				values={values}
				errors={result.errors}
			/>,
			{ title: "お問い合わせ", description: contactDescription },
		);
	}

	const verified = await verifyTurnstile({
		secretKey: c.env.TURNSTILE_SECRET_KEY,
		token: text(form, "cf-turnstile-response"),
		remoteIp: c.req.header("CF-Connecting-IP"),
	});

	if (!verified) {
		c.status(403);
		return c.render(
			<Template
				turnstileSiteKey={turnstileSiteKey}
				values={values}
				errors={[
					"ボットでないことの確認に失敗しました。ページを再読み込みして、もう一度お試しください。",
				]}
			/>,
			{ title: "お問い合わせ", description: contactDescription },
		);
	}

	const { contact } = result;
	const { subject, text: body } = formatContactEmail(contact);

	try {
		await c.env.EMAIL.send({
			from: { name: "cloudensis", email: contactEmail.from },
			to: contactEmail.to,
			replyTo: { name: contact.name, email: contact.email },
			subject,
			text: body,
		});
	} catch (error) {
		console.error("Failed to send contact email", error);
		c.status(500);
		return c.render(
			<Template
				turnstileSiteKey={turnstileSiteKey}
				values={values}
				errors={["送信に失敗しました。時間をおいて、再度お試しください。"]}
			/>,
			{ title: "お問い合わせ", description: contactDescription },
		);
	}

	return c.redirect("/contact/complete", 303);
});

function text(form: FormData, key: string): string {
	const value = form.get(key);
	return typeof value === "string" ? value : "";
}

import { Hono } from "hono";
import { contactEmail } from "#/src/domains/contact/constants";
import {
	formatContactEmail,
	validateContact,
} from "#/src/domains/contact/contact";
import { verifyTurnstile } from "#/src/interfaces/lib/turnstile";
import { type ContactFormValues, Template } from "./template";

export const contactRoutes = new Hono<{ Bindings: CloudflareBindings }>();

contactRoutes.get("/contact", async (c) => {
	return c.render(<Template turnstileSiteKey={c.env.TURNSTILE_SITE_KEY} />);
});

contactRoutes.post("/contact", async (c) => {
	const turnstileSiteKey = c.env.TURNSTILE_SITE_KEY;
	const form = await c.req.formData();
	const values: ContactFormValues = {
		name: text(form, "name"),
		companyName: text(form, "company-name"),
		email: text(form, "email"),
		type: text(form, "contact-type"),
		message: text(form, "message"),
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
		);
	}

	return c.redirect("/contact/complete", 303);
});

function text(form: FormData, key: string): string {
	const value = form.get(key);
	return typeof value === "string" ? value : "";
}

import { bodyLimit } from "hono/body-limit";
import { contactEmail } from "#/src/domains/contact/constants";
import {
	formatContactEmail,
	isContactType,
	validateContact,
} from "#/src/domains/contact/contact";
import type { App } from "#/src/interfaces/app";
import { isContactRateLimited } from "#/src/interfaces/lib/rate-limit";
import { verifyTurnstile } from "#/src/interfaces/lib/turnstile";
import { paths } from "#/src/interfaces/paths";
import { type ContactFormValues, emptyValues, Template } from "./template";

export const registerContact = (app: App) => {
	app.get(paths.contact, (c) => {
		// 事業内容からの導線: /contact?type=<key> でお問い合わせ種別を事前選択する
		const type = c.req.query("type") ?? "";
		const values = { ...emptyValues, type: isContactType(type) ? type : "" };
		return c.render(
			<Template turnstileSiteKey={c.env.TURNSTILE_SITE_KEY} values={values} />,
		);
	});

	app.post(
		paths.contact,
		// ボディサイズ上限とレート制限は、body を受け取る POST にのみ掛ける
		bodyLimit({ maxSize: 64 * 1024 }),
		async (c) => {
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

			if (await isContactRateLimited(c)) {
				c.status(429);
				return c.render(
					<Template
						turnstileSiteKey={turnstileSiteKey}
						values={values}
						errors={[
							"送信回数が上限に達しました。しばらく時間をおいて、再度お試しください。",
						]}
					/>,
				);
			}

			const result = validateContact({
				...values,
				consent: form.get("consent"),
			});

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

			return c.redirect(paths.contactComplete, 303);
		},
	);
};

function text(form: FormData, key: string): string {
	const value = form.get(key);
	return typeof value === "string" ? value : "";
}

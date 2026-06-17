import { Hono } from "hono";

type Bindings = {
	RESEND_API_KEY: string;
};

type ContactPayload = {
	name: string;
	company: string;
	email: string;
	inquiryType: string;
	message: string;
	consent: boolean;
};

const CONTACT_FROM = "noreply@cloudensis.com";
const CONTACT_TO = "kanaru.ssk@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function isValidContactPayload(body: unknown): body is ContactPayload {
	if (typeof body !== "object" || body === null) return false;
	const { name, company, email, inquiryType, message, consent } =
		body as Record<string, unknown>;
	return (
		typeof name === "string" &&
		name.trim().length > 0 &&
		typeof company === "string" &&
		company.trim().length > 0 &&
		typeof email === "string" &&
		EMAIL_PATTERN.test(email) &&
		typeof inquiryType === "string" &&
		inquiryType.trim().length > 0 &&
		typeof message === "string" &&
		message.trim().length > 0 &&
		consent === true
	);
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api", (c) => {
	return c.text("OK");
});

app.post("/api/contact", async (c) => {
	const body = await c.req.json().catch(() => null);

	if (!isValidContactPayload(body)) {
		return c.json({ error: "invalid request" }, 400);
	}

	const { name, company, email, inquiryType, message } = body;

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: CONTACT_FROM,
			to: CONTACT_TO,
			reply_to: email,
			subject: `【お問い合わせ】${inquiryType}`,
			html: `
				<p><strong>会社名:</strong> ${escapeHtml(company)}</p>
				<p><strong>名前:</strong> ${escapeHtml(name)}</p>
				<p><strong>メールアドレス:</strong> ${escapeHtml(email)}</p>
				<p><strong>お問い合わせ種別:</strong> ${escapeHtml(inquiryType)}</p>
				<p><strong>メッセージ:</strong><br>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
			`,
		}),
	});

	if (!res.ok) {
		return c.json({ error: "failed to send" }, 502);
	}

	return c.json({ ok: true });
});

export default app;

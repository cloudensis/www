import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import app from "#/src/index";

const origin = "http://localhost";

function createEnv() {
	return {
		TURNSTILE_SITE_KEY: "site-key",
		TURNSTILE_SECRET_KEY: "secret-key",
		EMAIL: { send: vi.fn(async () => ({ messageId: "id" })) },
		CONTACT_RATE_LIMITER: { limit: vi.fn(async () => ({ success: true })) },
	};
}

function validForm(overrides: Record<string, string> = {}) {
	return new URLSearchParams({
		name: "佐々木 太郎",
		"company-name": "株式会社サンプル",
		email: "taro@example.com",
		"contact-type": "other",
		message: "お問い合わせのテストです。",
		consent: "on",
		"cf-turnstile-response": "token",
		...overrides,
	});
}

function postContact(
	env: ReturnType<typeof createEnv>,
	body: URLSearchParams,
	headers: Record<string, string> = { Origin: origin },
) {
	return app.request(
		`${origin}/contact`,
		{ method: "POST", body, headers },
		env as unknown as CloudflareBindings,
	);
}

function stubTurnstile(success: boolean) {
	const fetchMock = vi.fn(async () => Response.json({ success }));
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
}

describe("GET /contact", () => {
	it("type クエリで指定したお問い合わせ種別を選択済みにする", async () => {
		const res = await app.request(
			`${origin}/contact?type=technical-education`,
			{},
			createEnv() as unknown as CloudflareBindings,
		);
		expect(res.status).toBe(200);
		expect(await res.text()).toMatch(
			/<option value="technical-education" selected="">/,
		);
	});

	it("定義外の type クエリは無視する", async () => {
		const res = await app.request(
			`${origin}/contact?type=hack`,
			{},
			createEnv() as unknown as CloudflareBindings,
		);
		expect(res.status).toBe(200);
		expect(await res.text()).not.toContain('selected=""');
	});
});

describe("POST /contact", () => {
	let env: ReturnType<typeof createEnv>;

	beforeEach(() => {
		env = createEnv();
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("正しい入力ではメールを送信し、完了ページへリダイレクトする", async () => {
		stubTurnstile(true);
		const res = await postContact(env, validForm());

		expect(res.status).toBe(303);
		expect(res.headers.get("Location")).toBe("/contact/complete");
		expect(env.EMAIL.send).toHaveBeenCalledOnce();
		expect(env.EMAIL.send).toHaveBeenCalledWith(
			expect.objectContaining({
				to: "contact@cloudensis.com",
				replyTo: { name: "佐々木 太郎", email: "taro@example.com" },
				subject: "【お問い合わせ】その他（佐々木 太郎 様）",
			}),
		);
	});

	it("入力エラーでは 400 を返し、Turnstile の検証もメール送信も行わない", async () => {
		const fetchMock = stubTurnstile(true);
		const res = await postContact(env, validForm({ email: "not-an-email" }));

		expect(res.status).toBe(400);
		const html = await res.text();
		expect(html).toContain("メールアドレスの形式が正しくありません。");
		// 入力内容を保持して再表示する
		expect(html).toContain('value="佐々木 太郎"');
		expect(fetchMock).not.toHaveBeenCalled();
		expect(env.EMAIL.send).not.toHaveBeenCalled();
	});

	it("Turnstile の検証に失敗した場合は 403 を返し、メールを送信しない", async () => {
		stubTurnstile(false);
		const res = await postContact(env, validForm());

		expect(res.status).toBe(403);
		expect(await res.text()).toContain(
			"ボットでないことの確認に失敗しました。",
		);
		expect(env.EMAIL.send).not.toHaveBeenCalled();
	});

	it("メール送信に失敗した場合は 500 を返し、入力内容を保持する", async () => {
		stubTurnstile(true);
		env.EMAIL.send.mockRejectedValueOnce(new Error("send failed"));
		const res = await postContact(env, validForm());

		expect(res.status).toBe(500);
		const html = await res.text();
		expect(html).toContain("送信に失敗しました。");
		expect(html).toContain('value="佐々木 太郎"');
	});

	it("別オリジンからの送信は CSRF 対策で拒否する", async () => {
		const fetchMock = stubTurnstile(true);
		const res = await postContact(env, validForm(), {
			Origin: "https://evil.example.com",
		});

		expect(res.status).toBe(403);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(env.EMAIL.send).not.toHaveBeenCalled();
	});
});

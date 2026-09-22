import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

const input = { secretKey: "secret", token: "token" };

describe("verifyTurnstile", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("トークンが空の場合は API を呼ばずに false を返す", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		expect(await verifyTurnstile({ ...input, token: "" })).toBe(false);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("検証に成功した場合は true を返す", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => Response.json({ success: true })),
		);
		expect(await verifyTurnstile(input)).toBe(true);
	});

	it("検証に失敗した場合は false を返す", async () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.stubGlobal(
			"fetch",
			vi.fn(async () =>
				Response.json({ success: false, "error-codes": ["invalid"] }),
			),
		);
		expect(await verifyTurnstile(input)).toBe(false);
	});

	it.each([
		["通信エラー", async () => Promise.reject(new TypeError("network"))],
		["HTTP エラー", async () => new Response("error", { status: 500 })],
		["JSON でない応答", async () => new Response("<html>")],
	])("%sの場合は例外を投げずに false を返す", async (_label, impl) => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.stubGlobal("fetch", vi.fn(impl));
		expect(await verifyTurnstile(input)).toBe(false);
	});
});

import { describe, expect, it } from "vitest";
import {
	contactTypeLabel,
	formatContactEmail,
	validateContact,
} from "./contact";

const validInput = {
	name: "佐々木 太郎",
	companyName: "株式会社サンプル",
	email: "taro@example.com",
	type: "other",
	message: "お問い合わせのテストです。",
	consent: "on",
};

describe("validateContact", () => {
	it("正しい入力を受け付け、前後の空白を除去する", () => {
		const result = validateContact({ ...validInput, name: "  佐々木 太郎  " });
		expect(result).toEqual({
			success: true,
			contact: {
				name: "佐々木 太郎",
				companyName: "株式会社サンプル",
				email: "taro@example.com",
				type: "other",
				message: "お問い合わせのテストです。",
			},
		});
	});

	it("文字列以外の値は空として扱う", () => {
		const result = validateContact({
			name: undefined,
			companyName: null,
			email: 1,
			type: {},
			message: [],
			consent: undefined,
		});
		expect(result.success).toBe(false);
		if (result.success) return;
		expect(result.errors).toContain("お名前を入力してください。");
		expect(result.errors).toContain("メールアドレスを入力してください。");
		expect(result.errors).toContain("お問い合わせ種別を選択してください。");
		expect(result.errors).toContain("お問い合わせ内容を入力してください。");
		expect(result.errors).toContain("プライバシーポリシーへの同意が必要です。");
	});

	it.each([
		["改行", "Taro\r\nBcc: victim@example.com"],
		["タブ", "Taro\tSasaki"],
		["C1 制御文字", `Taro${String.fromCodePoint(0x85)}Sasaki`],
	])("お名前に%sが含まれる場合は拒否する", (_label, name) => {
		const result = validateContact({ ...validInput, name });
		expect(result.success).toBe(false);
		if (result.success) return;
		expect(result.errors).toEqual([
			"お名前に使用できない文字が含まれています。",
		]);
	});

	it("会社名に改行が含まれる場合は拒否する", () => {
		const result = validateContact({
			...validInput,
			companyName: "X社\nX-Injected: yes",
		});
		expect(result.success).toBe(false);
		if (result.success) return;
		expect(result.errors).toEqual([
			"会社名に使用できない文字が含まれています。",
		]);
	});

	it("お問い合わせ内容の改行は許容する", () => {
		const result = validateContact({ ...validInput, message: "1行目\n2行目" });
		expect(result.success).toBe(true);
	});

	it.each(["not-an-email", "a b@example.com", "taro@example"])(
		"メールアドレス %s は拒否する",
		(email) => {
			const result = validateContact({ ...validInput, email });
			expect(result.success).toBe(false);
			if (result.success) return;
			expect(result.errors).toEqual([
				"メールアドレスの形式が正しくありません。",
			]);
		},
	);

	it.each(["hack", "その他"])(
		"定義外のお問い合わせ種別 %s は拒否する",
		(type) => {
			const result = validateContact({ ...validInput, type });
			expect(result.success).toBe(false);
			if (result.success) return;
			expect(result.errors).toEqual(["お問い合わせ種別を選択してください。"]);
		},
	);

	it("文字数上限を超える場合は拒否する", () => {
		const result = validateContact({
			...validInput,
			name: "あ".repeat(101),
			message: "あ".repeat(4001),
		});
		expect(result.success).toBe(false);
		if (result.success) return;
		expect(result.errors).toEqual([
			"お名前は100文字以内で入力してください。",
			"お問い合わせ内容は4000文字以内で入力してください。",
		]);
	});
});

describe("contactTypeLabel", () => {
	it("key に対応する日本語ラベルを返す", () => {
		expect(contactTypeLabel("system-development")).toBe(
			"システム開発支援について",
		);
		expect(contactTypeLabel("other")).toBe("その他");
	});
});

describe("formatContactEmail", () => {
	it("件名と本文を組み立てる", () => {
		const { subject, text } = formatContactEmail({
			name: "佐々木 太郎",
			companyName: "株式会社サンプル",
			email: "taro@example.com",
			type: "other",
			message: "本文",
		});
		expect(subject).toBe("【お問い合わせ】その他（佐々木 太郎 様）");
		expect(text).toContain("■ お名前\n佐々木 太郎");
		expect(text).toContain("■ 会社名\n株式会社サンプル");
		expect(text).toContain("■ メールアドレス\ntaro@example.com");
		expect(text).toContain("■ お問い合わせ内容\n本文");
	});
});

export const contactTypes = [
	"システム開発支援について",
	"技術教育について",
	"自社プロダクトについて",
	"その他",
] as const;

export type ContactType = (typeof contactTypes)[number];

export type Contact = {
	name: string;
	companyName: string;
	email: string;
	type: ContactType;
	message: string;
};

export type ContactInput = {
	name: unknown;
	companyName: unknown;
	email: unknown;
	type: unknown;
	message: unknown;
	consent: unknown;
};

export type ValidateContactResult =
	| { success: true; contact: Contact }
	| { success: false; errors: string[] };

const maxLength = {
	name: 100,
	companyName: 100,
	email: 254,
	message: 4000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 改行などの制御文字。メールヘッダ（件名・Reply-To の表示名）に入る項目では拒否する。
const controlCharPattern = /\p{Cc}/u;

function toText(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function hasControlChar(value: string): boolean {
	return controlCharPattern.test(value);
}

function isContactType(value: string): value is ContactType {
	return (contactTypes as readonly string[]).includes(value);
}

export function validateContact(input: ContactInput): ValidateContactResult {
	const errors: string[] = [];

	const name = toText(input.name);
	if (name === "") {
		errors.push("お名前を入力してください。");
	} else if (name.length > maxLength.name) {
		errors.push(`お名前は${maxLength.name}文字以内で入力してください。`);
	} else if (hasControlChar(name)) {
		errors.push("お名前に使用できない文字が含まれています。");
	}

	// 会社名は任意。所属のない個人からのお問い合わせや開示等の請求を妨げないため。
	const companyName = toText(input.companyName);
	if (companyName.length > maxLength.companyName) {
		errors.push(`会社名は${maxLength.companyName}文字以内で入力してください。`);
	} else if (hasControlChar(companyName)) {
		errors.push("会社名に使用できない文字が含まれています。");
	}

	const email = toText(input.email);
	if (email === "") {
		errors.push("メールアドレスを入力してください。");
	} else if (email.length > maxLength.email || !emailPattern.test(email)) {
		errors.push("メールアドレスの形式が正しくありません。");
	}

	const type = toText(input.type);
	if (!isContactType(type)) {
		errors.push("お問い合わせ種別を選択してください。");
	}

	const message = toText(input.message);
	if (message === "") {
		errors.push("お問い合わせ内容を入力してください。");
	} else if (message.length > maxLength.message) {
		errors.push(
			`お問い合わせ内容は${maxLength.message}文字以内で入力してください。`,
		);
	}

	if (toText(input.consent) === "") {
		errors.push("プライバシーポリシーへの同意が必要です。");
	}

	if (errors.length > 0 || !isContactType(type)) {
		return { success: false, errors };
	}

	return {
		success: true,
		contact: { name, companyName, email, type, message },
	};
}

export function formatContactEmail(contact: Contact): {
	subject: string;
	text: string;
} {
	const subject = `【お問い合わせ】${contact.type}（${contact.name} 様）`;
	const text = [
		"Webサイトのお問い合わせフォームから、新しいお問い合わせが届きました。",
		"",
		"■ お名前",
		contact.name,
		"",
		"■ 会社名",
		contact.companyName === "" ? "（未入力）" : contact.companyName,
		"",
		"■ メールアドレス",
		contact.email,
		"",
		"■ お問い合わせ種別",
		contact.type,
		"",
		"■ お問い合わせ内容",
		contact.message,
		"",
	].join("\n");

	return { subject, text };
}

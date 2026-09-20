import { Button } from "@cloudensis/design-system/components/ui/button";
import { contactTypes } from "#/src/domains/contact/contact";
import { Input } from "#/src/interfaces/components/ui/input";
import { Select } from "#/src/interfaces/components/ui/select";
import { Textarea } from "#/src/interfaces/components/ui/textarea";
import { paths } from "#/src/interfaces/paths";

export type ContactFormValues = {
	name: string;
	companyName: string;
	email: string;
	type: string;
	message: string;
	consent: boolean;
};

export const emptyValues: ContactFormValues = {
	name: "",
	companyName: "",
	email: "",
	type: "",
	message: "",
	consent: false,
};

type TemplateProps = {
	turnstileSiteKey: string;
	values?: ContactFormValues;
	errors?: string[];
};

export function Template({
	turnstileSiteKey,
	values = emptyValues,
	errors = [],
}: TemplateProps) {
	return (
		<div class="mx-auto max-w-5xl space-y-12 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">お問い合わせ</h1>

			{errors.length > 0 && (
				<div
					role="alert"
					class="rounded border border-red-600 px-4 py-3 text-red-700"
				>
					<p class="mb-2 font-medium">入力内容をご確認ください。</p>
					<ul class="list-disc space-y-1 pl-6">
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>
			)}

			<form action="/contact" method="post" class="space-y-6">
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div class="space-y-2">
						<label class="block" htmlFor="name">
							お名前
						</label>
						<Input
							id="name"
							name="name"
							type="text"
							autocomplete="name"
							placeholder="山田 太郎"
							value={values.name}
							required
						/>
					</div>

					<div class="space-y-2">
						<label class="block" htmlFor="company-name">
							会社名（任意）
						</label>
						<Input
							id="company-name"
							name="company-name"
							type="text"
							autocomplete="organization"
							placeholder="株式会社サンプル"
							value={values.companyName}
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div class="space-y-2">
						<label class="block" htmlFor="email">
							メールアドレス
						</label>
						<Input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder="taro@example.com"
							value={values.email}
							required
						/>
					</div>
					<div class="space-y-2">
						<label class="block" htmlFor="contact-type">
							お問い合わせ種別
						</label>
						<Select id="contact-type" name="contact-type" required>
							<option value="">選択してください</option>
							{contactTypes.map(({ key, label }) => (
								<option key={key} value={key} selected={values.type === key}>
									{label}
								</option>
							))}
						</Select>
					</div>
				</div>

				<div class="space-y-2">
					<label class="block" htmlFor="message">
						お問い合わせ内容
					</label>
					<Textarea
						id="message"
						name="message"
						rows={4}
						placeholder="ご依頼内容・ご相談内容をご記入ください"
						required
					>
						{values.message}
					</Textarea>
				</div>

				<div class="flex items-center justify-center gap-2">
					<Input
						id="consent"
						name="consent"
						type="checkbox"
						checked={values.consent}
						required
					/>
					<label htmlFor="consent">
						<a
							href={paths.privacy}
							class="underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							プライバシーポリシー
						</a>
						に同意する
					</label>
				</div>

				<div
					class="cf-turnstile mx-auto w-fit"
					data-sitekey={turnstileSiteKey}
					data-language="ja"
				/>

				<Button type="submit" class="mx-auto block w-48">
					送信
				</Button>
			</form>

			<script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				async
				defer
			/>
		</div>
	);
}

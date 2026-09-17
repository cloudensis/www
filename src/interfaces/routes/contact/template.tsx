import { contactTypes } from "#/src/domains/contact/contact";
import { Button } from "#/src/interfaces/components/ui/button";
import { Input } from "#/src/interfaces/components/ui/input";
import { Select } from "#/src/interfaces/components/ui/select";
import { Textarea } from "#/src/interfaces/components/ui/textarea";

export type ContactFormValues = {
	name: string;
	companyName: string;
	email: string;
	type: string;
	message: string;
};

const emptyValues: ContactFormValues = {
	name: "",
	companyName: "",
	email: "",
	type: "",
	message: "",
};

type TemplateProps = {
	values?: ContactFormValues;
	errors?: string[];
};

export function Template({ values = emptyValues, errors = [] }: TemplateProps) {
	return (
		<main class="mx-auto max-w-5xl space-y-12 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">お問い合わせ</h1>

			{errors.length > 0 && (
				<div class="rounded border border-red-600 px-4 py-3 text-red-700">
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
							placeholder="山田 太郎"
							value={values.name}
							required
						/>
					</div>

					<div class="space-y-2">
						<label class="block" htmlFor="company-name">
							会社名
						</label>
						<Input
							id="company-name"
							name="company-name"
							type="text"
							placeholder="株式会社サンプル"
							value={values.companyName}
							required
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
							{contactTypes.map((type) => (
								<option key={type} value={type} selected={values.type === type}>
									{type}
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
					<Input id="consent" name="consent" type="checkbox" required />
					<label htmlFor="consent">
						<a
							href="/privacy"
							class="underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							プライバシーポリシー
						</a>
						に同意する
					</label>
				</div>

				<Button type="submit" class="mx-auto block w-48">
					送信
				</Button>
			</form>
		</main>
	);
}

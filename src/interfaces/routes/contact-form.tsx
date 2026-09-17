import { Button } from "#/src/interfaces/components/ui/button";
import { Input } from "#/src/interfaces/components/ui/input";
import { Select } from "#/src/interfaces/components/ui/select";
import { Textarea } from "#/src/interfaces/components/ui/textarea";

export function ContactForm() {
	return (
		<form class="space-y-6">
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
						required
					/>
				</div>
				<div class="space-y-2">
					<label class="block" htmlFor="inquiry-type">
						お問い合わせ種別
					</label>
					<Select id="inquiry-type" name="inquiry-type" required>
						<option value="">選択してください</option>
						<option value="システム開発支援について">
							システム開発支援について
						</option>
						<option value="技術教育について">技術教育について</option>
						<option value="自社プロダクトについて">
							自社プロダクトについて
						</option>
						<option value="その他">その他</option>
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
				></Textarea>
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
						Privacy Policy
					</a>
					に同意する
				</label>
			</div>

			<Button type="submit" class="mx-auto block w-48">
				送信
			</Button>
		</form>
	);
}

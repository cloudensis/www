import { Section } from "#/src/interfaces/components/layout/section";
import { Button, LinkButton } from "#/src/interfaces/components/ui/button";
import { Input } from "#/src/interfaces/components/ui/input";
import { Select } from "#/src/interfaces/components/ui/select";
import { Textarea } from "#/src/interfaces/components/ui/textarea";

export function Template() {
	return (
		<div>
			<FirstView />
			<Section id="services" title="事業内容">
				<Services />
			</Section>
			<Section id="company" title="会社概要">
				<CompanyOverview />
			</Section>
			<Section id="contact" title="お問い合わせ">
				<ContactForm />
			</Section>
		</div>
	);
}

function FirstView() {
	return (
		<div class="py-16">
			<p class="font-medium text-neutral-800 text-xl leading-normal lg:text-4xl">
				よりシンプルで
				<br />
				より価値を生むソフトウェア
			</p>
			<p class="my-6 max-w-2xl text-sm leading-normal">
				AIによって、ソフトウェアは誰でも作れるようになりました。
				いま、エンジニアの仕事は「何を作るか」ではなく「何を作らないか」を決めることです。
				よりシンプルで保守しやすく、事業価値を生み続ける実装は何か。
				それを見極める力が、エンジニアの価値だと考えています。
			</p>
			<LinkButton href="#contact">お問い合わせ</LinkButton>
		</div>
	);
}

function Services() {
	return (
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div>
				<h3 class="mb-3 font-medium">ソフトウェア開発支援</h3>
				<p>
					Go, TypeScript,
					Next.jsなどのモダンな技術スタックを用いたWebアプリケーション開発、およびGoogle
					Cloud, AWS,
					Cloudflareを中心としたクラウドインフラの構築・技術支援を行います。
				</p>
			</div>

			<div>
				<h3 class="mb-3 font-medium">技術教育</h3>
				<p>
					高度IT人材の育成に向けたプログラミング・AI活用の教育カリキュラムの提供、および技術情報コンテンツの企画・制作を行います。
				</p>
			</div>

			<div>
				<h3 class="mb-3 font-medium">自社プロダクト開発</h3>
				<p>
					Web標準技術やクラウドネイティブなアーキテクチャを活用した、自社オリジナルのWebアプリケーション・デジタルコンテンツの企画・開発を行います。
				</p>
			</div>
		</div>
	);
}

function CompanyOverview() {
	return (
		<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
			<dt>会社名</dt>
			<dd>Cloudensis合同会社</dd>

			<dt>設立</dt>
			<dd>2026年4月1日</dd>

			<dt>本社所在地</dt>
			<dd>宮城県仙台市青葉区中央2-11-19 仙南ビル4階 -A</dd>
		</dl>
	);
}

function ContactForm() {
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

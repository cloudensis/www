import type { Child } from "hono/jsx";
import { Footer } from "#/src/interfaces/components/layout/footer";
import { Header } from "#/src/interfaces/components/layout/header";
import { LinkButton } from "#/src/interfaces/components/ui/button";

export function Template() {
	return (
		<div>
			<Header />
			<main class="mx-auto max-w-5xl space-y-20 px-4 lg:px-8">
				<FirstView />
				<Section title="事業内容">
					<Services />
				</Section>
				<Section title="会社概要">
					<CompanyOverview />
				</Section>
				<Section title="お問い合わせ">
					<ContactForm />
				</Section>
			</main>

			<Footer />
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
			<p class="my-4 max-w-2xl text-sm leading-normal">
				AIによって、ソフトウェアは誰でも作れるようになりました。
				いま、エンジニアの仕事は「何を作るか」ではなく「何を作らないか」を決めることです。
				よりシンプルで保守しやすく、事業価値を生み続ける実装は何か。
				それを見極める力が、エンジニアの価値だと考えています。
			</p>
			<LinkButton href="#contact">お問い合わせ</LinkButton>
		</div>
	);
}

type SectionProps = {
	title: string;
	children: Child;
};

function Section({ title, children }: SectionProps) {
	return (
		<section>
			<h2 class="mb-4 font-medium text-2xl">{title}</h2>
			<div>{children}</div>
		</section>
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
		<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
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
		<form id="contact-form" class="space-y-6">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div class="space-y-2">
					<label
						class="block text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide"
						htmlFor="name"
					>
						Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="山田 太郎"
						class="w-full rounded-cloudensis-sm border border-cloudensis-hairline bg-cloudensis-surface-soft px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink transition-colors focus:border-cloudensis-ink focus:bg-cloudensis-canvas focus:outline-hidden"
						required
					/>
				</div>
				<div class="space-y-2">
					<label
						class="block text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide"
						htmlFor="company"
					>
						Company
					</label>
					<input
						id="company"
						name="company"
						type="text"
						placeholder="株式会社サンプル"
						class="w-full rounded-cloudensis-sm border border-cloudensis-hairline bg-cloudensis-surface-soft px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink transition-colors focus:border-cloudensis-ink focus:bg-cloudensis-canvas focus:outline-hidden"
						required
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div class="space-y-2">
					<label
						class="block text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide"
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="taro@example.com"
						class="w-full rounded-cloudensis-sm border border-cloudensis-hairline bg-cloudensis-surface-soft px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink transition-colors focus:border-cloudensis-ink focus:bg-cloudensis-canvas focus:outline-hidden"
						required
					/>
				</div>
				<div class="space-y-2">
					<label
						class="block text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide"
						htmlFor="inquiryType"
					>
						Inquiry Type
					</label>
					<select
						id="inquiryType"
						name="inquiryType"
						class="w-full rounded-cloudensis-sm border border-cloudensis-hairline bg-cloudensis-surface-soft px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink transition-colors focus:border-cloudensis-ink focus:bg-cloudensis-canvas focus:outline-hidden"
						required
					>
						<option value="">選択してください</option>
						<option value="システム開発支援について">
							システム開発支援について
						</option>
						<option value="技術教育について">技術教育について</option>
						<option value="自社プロダクトについて">
							自社プロダクトについて
						</option>
						<option value="その他">その他</option>
					</select>
				</div>
			</div>

			<div class="space-y-2">
				<label
					class="block text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide"
					htmlFor="message"
				>
					Message
				</label>
				<textarea
					id="message"
					name="message"
					rows={4}
					placeholder="ご依頼内容・ご相談内容をご記入ください"
					class="w-full resize-none rounded-cloudensis-sm border border-cloudensis-hairline bg-cloudensis-surface-soft px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink transition-colors focus:border-cloudensis-ink focus:bg-cloudensis-canvas focus:outline-hidden"
					required
				></textarea>
			</div>

			<div class="flex items-start space-x-2">
				<input
					id="consent"
					name="consent"
					type="checkbox"
					class="mt-1 accent-cloudensis-ink"
					required
				/>
				<label
					htmlFor="consent"
					class="text-cloudensis-caption-md text-cloudensis-mute"
				>
					<a href="/privacy" class="text-cloudensis-ink underline">
						Privacy Policy
					</a>
					に同意する
				</label>
			</div>

			<button
				type="submit"
				class="w-full rounded-cloudensis-sm bg-cloudensis-ink py-3 text-cloudensis-caption-md text-cloudensis-on-dark leading-cloudensis-button-md transition-[transform,background-color] duration-200 hover:bg-cloudensis-ink-deep active:scale-98 disabled:opacity-50"
			>
				送信
			</button>

			<div
				id="contact-status"
				class="text-cloudensis-caption-md text-cloudensis-mute"
			/>
		</form>
	);
}

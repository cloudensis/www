import type { Child } from "hono/jsx";
import { Footer } from "#/src/interfaces/components/layout/footer";
import { Header } from "#/src/interfaces/components/layout/header";

export function Template() {
	return (
		<div>
			<Header />
			<main class="mx-auto max-w-5xl space-y-16 px-5">
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

				<section class="bg-cloudensis-canvas px-6 pt-24 pb-cloudensis-section">
					<div class="mx-auto max-w-240">
						<div class="mb-4 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-widest">
							[ Sendai, Japan ]
						</div>
						<h1 class="font-bold text-cloudensis-display-xl text-cloudensis-ink leading-cloudensis-display-xl max-sm:text-3xl">
							確かな技術力で、事業の可能性を広げる。
						</h1>
						<p class="mt-4 max-w-2xl text-cloudensis-body text-cloudensis-body-md leading-cloudensis-body-md">
							Go・TypeScript・Next.jsなどのモダンな技術スタックで、Webアプリケーション開発からクラウドインフラ構築までを支援します。
						</p>
						<div class="mt-8 flex items-center space-x-6">
							<a
								href="#services"
								class="rounded-cloudensis-sm bg-cloudensis-ink px-5 py-1 text-cloudensis-caption-md text-cloudensis-on-dark leading-cloudensis-button-md transition-[transform,background-color] duration-200 hover:bg-cloudensis-ink-deep active:scale-95"
							>
								View Services
							</a>
							<a
								href="#contact"
								class="text-cloudensis-ink underline transition-opacity hover:opacity-70"
							>
								Contact &rarr;
							</a>
						</div>

						<div class="mt-16 bg-cloudensis-surface-dark px-8 py-10 text-cloudensis-on-dark">
							<div class="mb-6 text-cloudensis-ash text-cloudensis-caption-md">
								$ cloudensis --stack
							</div>
							<div class="space-y-3 text-cloudensis-body-md leading-cloudensis-body-md">
								<div>
									<span class="text-cloudensis-ash">[+]</span> Go — Backend
									&amp; API
								</div>
								<div>
									<span class="text-cloudensis-ash">[+]</span> TypeScript /
									Next.js — Application &amp; Frontend
								</div>
								<div>
									<span class="text-cloudensis-ash">[+]</span> Google Cloud /
									AWS / Cloudflare — Infrastructure
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					id="about"
					class="border-cloudensis-hairline border-t bg-cloudensis-canvas px-6 py-cloudensis-section"
				>
					<div class="mx-auto max-w-240">
						<h2 class="mb-8 border-cloudensis-hairline border-b pb-4 font-bold text-cloudensis-heading-md text-cloudensis-ink uppercase tracking-wide">
							[01] About
						</h2>
						<p class="mb-12 max-w-2xl text-cloudensis-body text-cloudensis-body-md leading-cloudensis-body-md">
							Cloudensis合同会社は、目先の効率だけでなく、コードの一行ひとつひとつに責任を持つことを大切にしています。Web標準とクラウドネイティブなアーキテクチャに対する深い理解を土台に、保守性と拡張性を兼ね備えたシステムを設計し、お客様の事業が長く成長し続けるための技術基盤を提供します。
						</p>
						<dl class="divide-y divide-cloudensis-hairline border-cloudensis-hairline border-t">
							<div class="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
								<dt class="shrink-0 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide sm:w-28">
									Founded
								</dt>
								<dd class="text-cloudensis-body-md text-cloudensis-ink">
									2026年4月1日
								</dd>
							</div>
							<div class="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
								<dt class="shrink-0 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide sm:w-28">
									Address
								</dt>
								<dd class="text-cloudensis-body-md text-cloudensis-ink">
									〒980-0021
									<br />
									宮城県仙台市青葉区中央2-11-19 仙南ビル4階-A
								</dd>
							</div>
							<div class="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
								<dt class="shrink-0 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide sm:w-28">
									Capital
								</dt>
								<dd class="text-cloudensis-body-md text-cloudensis-ink">
									1,000,000円
								</dd>
							</div>
						</dl>
					</div>
				</section>

				<section
					id="contact"
					class="border-cloudensis-hairline border-t bg-cloudensis-canvas px-6 py-cloudensis-section"
				>
					<div class="mx-auto max-w-160">
						<h2 class="mb-8 border-cloudensis-hairline border-b pb-4 font-bold text-cloudensis-heading-md text-cloudensis-ink uppercase tracking-wide">
							[03] Contact
						</h2>
						<p class="mb-8 text-cloudensis-body text-cloudensis-body-md">
							ご依頼やご相談がございましたら、下記フォームよりお気軽にお問い合わせください。
						</p>

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
								Send
							</button>

							<div
								id="contact-status"
								class="text-cloudensis-caption-md text-cloudensis-mute"
							/>
						</form>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}

function FirstView() {
	return (
		<div>
			<p class="text-xl">確かな技術力で、事業の可能性を広げる。</p>
			<p>
				Go・TypeScript・Next.jsなどのモダンな技術スタックで、Webアプリケーション開発からクラウドインフラ構築までを支援します。
			</p>
			<div class="bg-neutral-950 p-4 font-mono text-neutral-300 leading-7">
				<div>
					<span class="text-blue-500">$</span> cloudensis --stack
				</div>
				<div>
					<span class="text-blue-500">[+]</span> TypeScript Go
				</div>
				<div>
					<span class="text-blue-500">[+]</span> Hono Next.js
				</div>
				<div>
					<span class="text-blue-500">[+]</span> Cloudflare Google Cloud AWS
				</div>
			</div>
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
			<h2 class="mb-4 text-xl">{title}</h2>
			<div>{children}</div>
		</section>
	);
}

function Services() {
	return (
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div>
				<h3 class="mb-3 font-bold">ソフトウェア開発支援</h3>
				<p>
					Go, TypeScript,
					Next.jsなどのモダンな技術スタックを用いたWebアプリケーション開発、およびGoogle
					Cloud, AWS,
					Cloudflareを中心としたクラウドインフラの構築・技術支援を行います。
				</p>
			</div>

			<div>
				<h3 class="mb-3 font-bold">技術教育</h3>
				<p>
					高度IT人材の育成に向けたプログラミング・AI活用の教育カリキュラムの提供、および技術情報コンテンツの企画・制作を行います。
				</p>
			</div>

			<div>
				<h3 class="mb-3 font-bold">自社プロダクト開発</h3>
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

const contactFormScript = `
document.addEventListener('DOMContentLoaded', function () {
	var form = document.getElementById('contact-form');
	var statusEl = document.getElementById('contact-status');
	if (!form || !statusEl) return;

	form.addEventListener('submit', async function (e) {
		e.preventDefault();
		var submitBtn = form.querySelector('button[type="submit"]');
		submitBtn.disabled = true;
		statusEl.textContent = '送信中...';
		statusEl.className = 'mt-4 text-cloudensis-caption-md text-cloudensis-mute';

		var data = {
			name: form.name.value,
			company: form.company.value,
			email: form.email.value,
			inquiryType: form.inquiryType.value,
			message: form.message.value,
			consent: form.consent.checked,
		};

		try {
			var res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error('request failed');
			form.reset();
			statusEl.textContent = '[ok] お問い合わせを受け付けました。ご連絡ありがとうございます。';
			statusEl.className = 'mt-4 text-cloudensis-caption-md text-cloudensis-ink';
		} catch (err) {
			statusEl.textContent = '[error] 送信に失敗しました。お手数ですが時間をおいて再度お試しください。';
			statusEl.className = 'mt-4 text-cloudensis-caption-md text-cloudensis-danger';
		} finally {
			submitBtn.disabled = false;
		}
	});
});
`;

export function Home() {
	return (
		<div class="font-cloudensis-mono bg-cloudensis-canvas text-cloudensis-ink min-h-screen overflow-x-hidden antialiased">
			<nav class="bg-cloudensis-canvas text-cloudensis-ink h-cloudensis-global-nav border-b border-cloudensis-hairline sticky top-0 z-50 font-cloudensis-mono">
				<div class="max-w-240 mx-auto h-full px-6 flex items-center justify-between">
					<a
						href="/"
						class="flex items-center space-x-2 font-bold text-cloudensis-caption-md tracking-wide hover:opacity-70 transition-opacity"
					>
						<img src="/logo.svg" alt="" width="20" height="14" />
						<span>cloudensis</span>
					</a>

					{/* Desktop Menu links */}

					{/* Utility Right Menu */}
					<div class="flex items-center space-x-8">
						<div class="max-cloudensis-tablet:hidden! flex items-center space-x-4 text-cloudensis-caption-md text-cloudensis-mute">
							<a
								href="#about"
								class="hover:text-cloudensis-ink transition-colors"
							>
								[01] About
							</a>
							<a
								href="#services"
								class="hover:text-cloudensis-ink transition-colors"
							>
								[02] Services
							</a>
						</div>

						<a
							href="#contact"
							class="bg-cloudensis-ink hover:bg-cloudensis-ink-deep text-cloudensis-on-dark rounded-cloudensis-sm px-5 py-1 text-cloudensis-caption-md leading-cloudensis-button-md transition-[transform,background-color] duration-200 active:scale-95"
						>
							Contact
						</a>
						{/* Mobile Hamburger toggle */}
						<a
							href="#mobile-nav-overlay"
							class="hidden max-cloudensis-tablet:block! text-cloudensis-ink"
						>
							<svg
								class="w-5 h-5 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
							</svg>
							<span class="sr-only">メニューを開く</span>
						</a>
					</div>
				</div>
			</nav>

			{/* Mobile Nav Overlay (Target driven) */}
			<div
				id="mobile-nav-overlay"
				class="hidden target:flex lg:hidden fixed inset-0 bg-cloudensis-canvas z-50 p-6 flex-col justify-between font-cloudensis-mono"
			>
				<div>
					<div class="flex items-center justify-between pb-6 border-b border-cloudensis-hairline">
						<span class="font-bold uppercase tracking-wide text-cloudensis-caption-md">
							Cloudensis合同会社
						</span>
						<a href="/" class="text-cloudensis-ink">
							<svg
								class="w-6 h-6 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
							</svg>
							<span class="sr-only">メニューを閉じる</span>
						</a>
					</div>
					<div class="flex flex-col space-y-6 pt-8 text-cloudensis-heading-md text-cloudensis-ink">
						<a href="#about" onclick="window.location.hash=''">
							[01] About
						</a>
						<a href="#services" onclick="window.location.hash=''">
							[02] Services
						</a>
					</div>
				</div>
				<div class="pb-10">
					<a
						href="#contact"
						class="block w-full text-center bg-cloudensis-ink text-cloudensis-on-dark py-3 rounded-cloudensis-sm"
					>
						Contact
					</a>
				</div>
			</div>

			{/* Hero */}
			<section class="bg-cloudensis-canvas pt-24 pb-cloudensis-section px-6">
				<div class="max-w-240 mx-auto">
					<div class="text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-widest mb-4">
						[ Sendai, Japan ]
					</div>
					<h1 class="font-bold text-cloudensis-display-xl leading-cloudensis-display-xl text-cloudensis-ink max-sm:text-3xl">
						確かな技術力で、事業の可能性を広げる。
					</h1>
					<p class="text-cloudensis-body-md leading-cloudensis-body-md text-cloudensis-body mt-4 max-w-2xl">
						Go・TypeScript・Next.jsなどのモダンな技術スタックで、Webアプリケーション開発からクラウドインフラ構築までを支援します。
					</p>
					<div class="flex items-center space-x-6 mt-8">
						<a
							href="#services"
							class="bg-cloudensis-ink hover:bg-cloudensis-ink-deep text-cloudensis-on-dark px-5 py-1 rounded-cloudensis-sm text-cloudensis-caption-md leading-cloudensis-button-md transition-[transform,background-color] duration-200 active:scale-95"
						>
							View Services
						</a>
						<a
							href="#contact"
							class="text-cloudensis-ink underline hover:opacity-70 transition-opacity"
						>
							Contact &rarr;
						</a>
					</div>

					{/* Signature dark surface: the system's single elevated moment */}
					<div class="mt-16 bg-cloudensis-surface-dark text-cloudensis-on-dark px-8 py-10">
						<div class="text-cloudensis-caption-md text-cloudensis-ash mb-6">
							$ cloudensis --stack
						</div>
						<div class="space-y-3 text-cloudensis-body-md leading-cloudensis-body-md">
							<div>
								<span class="text-cloudensis-ash">[+]</span> Go — Backend &amp;
								API
							</div>
							<div>
								<span class="text-cloudensis-ash">[+]</span> TypeScript /
								Next.js — Application &amp; Frontend
							</div>
							<div>
								<span class="text-cloudensis-ash">[+]</span> Google Cloud / AWS
								/ Cloudflare — Infrastructure
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section 1: Company Profile (About Us) */}
			<section
				id="about"
				class="bg-cloudensis-canvas py-cloudensis-section px-6 border-t border-cloudensis-hairline"
			>
				<div class="max-w-240 mx-auto">
					<h2 class="text-cloudensis-heading-md font-bold uppercase tracking-wide text-cloudensis-ink pb-4 border-b border-cloudensis-hairline mb-8">
						[01] About
					</h2>
					<p class="text-cloudensis-body-md leading-cloudensis-body-md text-cloudensis-body max-w-2xl mb-12">
						Cloudensis合同会社は、目先の効率だけでなく、コードの一行ひとつひとつに責任を持つことを大切にしています。Web標準とクラウドネイティブなアーキテクチャに対する深い理解を土台に、保守性と拡張性を兼ね備えたシステムを設計し、お客様の事業が長く成長し続けるための技術基盤を提供します。
					</p>
					<dl class="border-t border-cloudensis-hairline divide-y divide-cloudensis-hairline">
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4">
							<dt class="sm:w-28 shrink-0 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide">
								Founded
							</dt>
							<dd class="text-cloudensis-body-md text-cloudensis-ink">
								2026年4月1日
							</dd>
						</div>
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4">
							<dt class="sm:w-28 shrink-0 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide">
								Address
							</dt>
							<dd class="text-cloudensis-body-md text-cloudensis-ink">
								〒980-0021
								<br />
								宮城県仙台市青葉区中央2-11-19 仙南ビル4階-A
							</dd>
						</div>
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4">
							<dt class="sm:w-28 shrink-0 text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide">
								Capital
							</dt>
							<dd class="text-cloudensis-body-md text-cloudensis-ink">
								1,000,000円
							</dd>
						</div>
					</dl>
				</div>
			</section>

			{/* Section 2: Business Description (Services) */}
			<section
				id="services"
				class="bg-cloudensis-canvas py-cloudensis-section px-6 border-t border-cloudensis-hairline"
			>
				<div class="max-w-240 mx-auto">
					<h2 class="text-cloudensis-heading-md font-bold uppercase tracking-wide text-cloudensis-ink pb-4 border-b border-cloudensis-hairline mb-8">
						[02] Services
					</h2>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-cloudensis-hairline border border-cloudensis-hairline">
						{/* Service 1: System Development */}
						<div class="bg-cloudensis-canvas p-8">
							<div class="text-cloudensis-caption-md text-cloudensis-mute mb-4">
								[01]
							</div>
							<h3 class="text-cloudensis-heading-md font-bold text-cloudensis-ink mb-3">
								システム開発支援
							</h3>
							<p class="text-cloudensis-body-md leading-cloudensis-body-md text-cloudensis-body">
								Go, TypeScript,
								Next.jsなどのモダンな技術スタックを用いたWebアプリケーション開発、およびGoogle
								Cloud, AWS,
								Cloudflareを中心としたクラウドインフラの構築・技術支援を行います。
							</p>
						</div>

						{/* Service 2: Technical Education */}
						<div class="bg-cloudensis-canvas p-8">
							<div class="text-cloudensis-caption-md text-cloudensis-mute mb-4">
								[02]
							</div>
							<h3 class="text-cloudensis-heading-md font-bold text-cloudensis-ink mb-3">
								技術教育
							</h3>
							<p class="text-cloudensis-body-md leading-cloudensis-body-md text-cloudensis-body">
								高度IT人材の育成に向けたプログラミング・AI活用の教育カリキュラムの提供、および技術情報コンテンツの企画・制作を行います。
							</p>
						</div>

						{/* Service 3: Product R&D */}
						<div class="bg-cloudensis-canvas p-8">
							<div class="text-cloudensis-caption-md text-cloudensis-mute mb-4">
								[03]
							</div>
							<h3 class="text-cloudensis-heading-md font-bold text-cloudensis-ink mb-3">
								自社プロダクト開発
							</h3>
							<p class="text-cloudensis-body-md leading-cloudensis-body-md text-cloudensis-body">
								Web標準技術やクラウドネイティブなアーキテクチャを活用した、自社オリジナルのWebアプリケーション・デジタルコンテンツの企画・開発を行います。
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Section 3: Contact Us */}
			<section
				id="contact"
				class="bg-cloudensis-canvas py-cloudensis-section px-6 border-t border-cloudensis-hairline"
			>
				<div class="max-w-[640px] mx-auto">
					<h2 class="text-cloudensis-heading-md font-bold uppercase tracking-wide text-cloudensis-ink pb-4 border-b border-cloudensis-hairline mb-8">
						[03] Contact
					</h2>
					<p class="text-cloudensis-body-md text-cloudensis-body mb-8">
						ご依頼やご相談がございましたら、下記フォームよりお気軽にお問い合わせください。
					</p>

					<form id="contact-form" class="space-y-6">
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div class="space-y-2">
								<label
									class="text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide block"
									htmlFor="name"
								>
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder="山田 太郎"
									class="w-full bg-cloudensis-surface-soft border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink focus:outline-hidden focus:border-cloudensis-ink focus:bg-cloudensis-canvas transition-colors"
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									class="text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide block"
									htmlFor="company"
								>
									Company
								</label>
								<input
									id="company"
									name="company"
									type="text"
									placeholder="株式会社サンプル"
									class="w-full bg-cloudensis-surface-soft border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink focus:outline-hidden focus:border-cloudensis-ink focus:bg-cloudensis-canvas transition-colors"
									required
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div class="space-y-2">
								<label
									class="text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide block"
									htmlFor="email"
								>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="taro@example.com"
									class="w-full bg-cloudensis-surface-soft border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink focus:outline-hidden focus:border-cloudensis-ink focus:bg-cloudensis-canvas transition-colors"
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									class="text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide block"
									htmlFor="inquiryType"
								>
									Inquiry Type
								</label>
								<select
									id="inquiryType"
									name="inquiryType"
									class="w-full bg-cloudensis-surface-soft border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink focus:outline-hidden focus:border-cloudensis-ink focus:bg-cloudensis-canvas transition-colors"
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
								class="text-cloudensis-caption-md text-cloudensis-mute uppercase tracking-wide block"
								htmlFor="message"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={4}
								placeholder="ご依頼内容・ご相談内容をご記入ください"
								class="w-full bg-cloudensis-surface-soft border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-body-md text-cloudensis-ink focus:outline-hidden focus:border-cloudensis-ink focus:bg-cloudensis-canvas transition-colors resize-none"
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
							class="w-full bg-cloudensis-ink hover:bg-cloudensis-ink-deep text-cloudensis-on-dark py-3 rounded-cloudensis-sm text-cloudensis-caption-md leading-cloudensis-button-md transition-[transform,background-color] duration-200 active:scale-98 disabled:opacity-50"
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

			<footer class="bg-cloudensis-canvas border-t border-cloudensis-hairline py-8 px-6 text-cloudensis-caption-md text-cloudensis-mute">
				<div class="max-w-240 mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
					<span>Copyright &copy; 2026 Cloudensis合同会社</span>
					<a
						href="/privacy"
						class="hover:text-cloudensis-ink transition-colors"
					>
						Privacy Policy
					</a>
				</div>
			</footer>

			<script dangerouslySetInnerHTML={{ __html: contactFormScript }} />
		</div>
	);
}

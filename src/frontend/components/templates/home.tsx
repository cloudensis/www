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
		statusEl.className = 'mt-4 text-center text-cloudensis-ink-muted-48';

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
			statusEl.textContent = 'お問い合わせを受け付けました。ご連絡ありがとうございます。';
			statusEl.className = 'mt-4 text-center text-cloudensis-primary';
		} catch (err) {
			statusEl.textContent = '送信に失敗しました。お手数ですが時間をおいて再度お試しください。';
			statusEl.className = 'mt-4 text-center text-red-500';
		} finally {
			submitBtn.disabled = false;
		}
	});
});
`;

export function Home() {
	return (
		<div class="font-cloudensis-text bg-white text-body min-h-screen overflow-x-hidden antialiased">
			<nav class="bg-black text-white h-cloudensis-global-nav border-b border-cloudensis-ink-muted-80 sticky top-0 z-50 font-cloudensis-text select-none">
				<div class="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
					<a
						href="/"
						class="flex items-center space-x-2 text-white font-semibold text-cloudensis-caption tracking-tight hover:opacity-80 transition-opacity"
					>
						<img
							src="/logo.svg"
							alt=""
							width="24"
							height="24"
							class="text-white stroke-white"
						/>
						<span class="font-cloudensis-display font-medium text-xs tracking-wide">
							Cloudensis合同会社
						</span>
					</a>

					{/* Desktop Menu links */}
					<div class="max-cloudensis-tablet:hidden! flex items-center space-x-8 text-cloudensis-fine-print tracking-tight text-cloudensis-body-muted">
						<a href="#about" class="hover:text-white transition-colors">
							会社概要
						</a>
						<a href="#services" class="hover:text-white transition-colors">
							事業内容
						</a>
						<a href="#contact" class="hover:text-white transition-colors">
							お問い合わせ
						</a>
					</div>

					{/* Utility Right Menu */}
					<div class="flex items-center space-x-6 text-cloudensis-fine-print text-cloudensis-body-muted">
						<a
							href="#contact"
							class="bg-cloudensis-body hover:bg-cloudensis-ink-muted-80 text-white rounded-cloudensis-sm px-3 py-1 font-normal text-xs border border-cloudensis-ink-muted-80 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95"
						>
							お問い合わせ
						</a>
						{/* Mobile Hamburger toggle */}
						<a
							href="#mobile-nav-overlay"
							class="hidden max-cloudensis-tablet:block! text-white"
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
				class="hidden target:flex lg:hidden fixed inset-0 bg-black z-50 p-6 flex-col justify-between"
			>
				<div>
					<div class="flex items-center justify-between pb-6 border-b border-cloudensis-ink-muted-80">
						<span class="font-cloudensis-display font-medium text-white text-cloudensis-button-large">
							Cloudensis合同会社
						</span>
						<a href="/" class="text-white">
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
					<div class="flex flex-col space-y-6 pt-8 text-cloudensis-lead-airy font-semibold text-cloudensis-body-muted">
						<a
							href="#about"
							class="hover:text-white transition-colors"
							onclick="window.location.hash=''"
						>
							会社概要
						</a>
						<a
							href="#services"
							class="hover:text-white transition-colors"
							onclick="window.location.hash=''"
						>
							事業内容
						</a>
						<a
							href="#contact"
							class="hover:text-white transition-colors"
							onclick="window.location.hash=''"
						>
							お問い合わせ
						</a>
					</div>
				</div>
				<div class="pb-10">
					<a
						href="#contact"
						class="block w-full text-center bg-cloudensis-primary hover:bg-cloudensis-primary-focus text-white py-3 rounded-full font-medium"
					>
						お問い合わせ
					</a>
				</div>
			</div>

			<section class="bg-white text-body pt-24 pb-cloudensis-section px-6 select-none flex flex-col items-center text-center">
				<div class="max-w-3xl w-full">
					<h1 class="font-cloudensis-display text-cloudensis-hero-display font-semibold leading-cloudensis-hero-display tracking-cloudensis-hero-display max-cloudensis-desktop:text-5xl max-sm:text-4xl max-cloudensis-small-phone:text-cloudensis-lead text-body">
						確かな技術力で、事業の可能性を広げる。
					</h1>
					<p class="text-cloudensis-lead font-normal leading-cloudensis-lead tracking-cloudensis-lead max-cloudensis-desktop:text-cloudensis-lead-airy max-sm:text-xl text-neutral-500 mt-4">
						Go・TypeScript・Next.jsなどのモダンな技術スタックで、
						Webアプリケーション開発からクラウドインフラ構築までを支援します。
					</p>
					<div class="flex justify-center space-x-6 mt-8">
						<a
							href="#services"
							class="bg-cloudensis-primary hover:bg-cloudensis-primary-focus px-6 py-2.5 rounded-full font-normal text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95 tracking-wide"
						>
							事業内容を見る
						</a>
						<a
							href="#contact"
							class="text-cloudensis-primary hover:underline flex items-center space-x-1 font-normal group"
						>
							<span>お問い合わせ</span>
							<span class="group-hover:translate-x-1 transition-transform inline-block">
								&rarr;
							</span>
						</a>
					</div>
				</div>
			</section>

			{/* Section 1: Company Profile (About Us) */}
			<section
				id="about"
				class="bg-cloudensis-canvas-parchment py-20 px-6 border-t border-cloudensis-hairline select-none"
			>
				<div class="max-w-3xl mx-auto text-center">
					<h2 class="font-cloudensis-display text-cloudensis-display-lg font-semibold leading-cloudensis-display-lg tracking-cloudensis-display-lg-nudge max-cloudensis-desktop:text-cloudensis-display-md max-sm:text-cloudensis-lead text-body mb-6">
						会社概要
					</h2>
					<p class="text-lg leading-normal text-cloudensis-ink-muted-48 max-w-2xl mx-auto mb-12">
						Cloudensis合同会社は、目先の効率だけでなく、コードの一行ひとつひとつに責任を持つことを大切にしています。Web標準とクラウドネイティブなアーキテクチャに対する深い理解を土台に、保守性と拡張性を兼ね備えたシステムを設計し、お客様の事業が長く成長し続けるための技術基盤を提供します。
					</p>
					<dl class="max-w-md mx-auto border-t border-cloudensis-hairline divide-y divide-cloudensis-hairline text-left">
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4">
							<dt class="sm:w-28 shrink-0 text-cloudensis-fine-print text-cloudensis-ink-muted-48 uppercase tracking-wider">
								設立
							</dt>
							<dd class="text-cloudensis-caption text-body">2026年4月1日</dd>
						</div>
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4">
							<dt class="sm:w-28 shrink-0 text-cloudensis-fine-print text-cloudensis-ink-muted-48 uppercase tracking-wider">
								所在地
							</dt>
							<dd class="text-cloudensis-caption text-body">
								〒980-0021
								<br />
								宮城県仙台市青葉区中央2-11-19 仙南ビル4階-A
							</dd>
						</div>
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4">
							<dt class="sm:w-28 shrink-0 text-cloudensis-fine-print text-cloudensis-ink-muted-48 uppercase tracking-wider">
								資本金
							</dt>
							<dd class="text-cloudensis-caption text-body">1,000,000円</dd>
						</div>
					</dl>
				</div>
			</section>

			{/* Section 2: Business Description (Services) */}
			<section
				id="services"
				class="bg-white py-20 px-6 border-t border-cloudensis-hairline select-none"
			>
				<div class="max-w-5xl mx-auto">
					<div class="text-center mb-16">
						<h2 class="font-cloudensis-display text-cloudensis-display-lg font-semibold leading-cloudensis-display-lg tracking-cloudensis-display-lg-nudge max-cloudensis-desktop:text-cloudensis-display-md max-sm:text-cloudensis-lead text-body">
							事業内容
						</h2>
						<p class="text-xl font-normal leading-relaxed text-cloudensis-ink-muted-48 mt-2">
							技術力を軸とした、3つの事業を展開しています。
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Service 1: System Development */}
						<div class="bg-cloudensis-canvas-parchment rounded-cloudensis-lg p-8 border border-cloudensis-hairline flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
							<div>
								<div class="text-xs uppercase tracking-widest text-cloudensis-primary font-semibold mb-4">
									事業内容 01
								</div>
								<h3 class="font-cloudensis-display text-2xl font-semibold text-body mb-3">
									システム開発支援
								</h3>
								<p class="text-cloudensis-caption leading-normal text-cloudensis-ink-muted-48">
									Go, TypeScript,
									Next.jsなどのモダンな技術スタックを用いたWebアプリケーション開発、およびGoogle
									Cloud, AWS,
									Cloudflareを中心としたクラウドインフラの構築・技術支援を行います。
								</p>
							</div>
						</div>

						{/* Service 2: Technical Education */}
						<div class="bg-cloudensis-canvas-parchment rounded-cloudensis-lg p-8 border border-cloudensis-hairline flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
							<div>
								<div class="text-xs uppercase tracking-widest text-cloudensis-primary font-semibold mb-4">
									事業内容 02
								</div>
								<h3 class="font-cloudensis-display text-2xl font-semibold text-body mb-3">
									技術教育
								</h3>
								<p class="text-cloudensis-caption leading-normal text-cloudensis-ink-muted-48">
									高度IT人材の育成に向けたプログラミング・AI活用の教育カリキュラムの提供、および技術情報コンテンツの企画・制作を行います。
								</p>
							</div>
						</div>

						{/* Service 3: Product R&D */}
						<div class="bg-cloudensis-canvas-parchment rounded-cloudensis-lg p-8 border border-cloudensis-hairline flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
							<div>
								<div class="text-xs uppercase tracking-widest text-cloudensis-primary font-semibold mb-4">
									事業内容 03
								</div>
								<h3 class="font-cloudensis-display text-2xl font-semibold text-body mb-3">
									自社プロダクト開発
								</h3>
								<p class="text-cloudensis-caption leading-normal text-cloudensis-ink-muted-48">
									Web標準技術やクラウドネイティブなアーキテクチャを活用した、自社オリジナルのWebアプリケーション・デジタルコンテンツの企画・開発を行います。
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section 3: Contact Us */}
			<section
				id="contact"
				class="bg-cloudensis-canvas-parchment py-20 px-6 border-t border-cloudensis-hairline select-none"
			>
				<div class="max-w-2xl mx-auto">
					<div class="text-center mb-12">
						<h2 class="font-cloudensis-display text-cloudensis-display-lg font-semibold leading-cloudensis-display-lg tracking-cloudensis-display-lg-nudge max-cloudensis-desktop:text-cloudensis-display-md max-sm:text-cloudensis-lead text-body">
							お問い合わせ
						</h2>
						<p class="text-cloudensis-ink-muted-48 mt-2">
							ご依頼やご相談がございましたら、下記フォームよりお気軽にお問い合わせください。
						</p>
					</div>

					<form
						id="contact-form"
						class="bg-white rounded-cloudensis-lg border border-cloudensis-hairline p-8 shadow-md space-y-6 select-text"
					>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div class="space-y-2">
								<label
									class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
									htmlFor="name"
								>
									名前
								</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder="山田 太郎"
									class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors"
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
									htmlFor="company"
								>
									会社名
								</label>
								<input
									id="company"
									name="company"
									type="text"
									placeholder="株式会社サンプル"
									class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors"
									required
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div class="space-y-2">
								<label
									class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
									htmlFor="email"
								>
									メールアドレス
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="taro@example.com"
									class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors"
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
									htmlFor="inquiryType"
								>
									お問い合わせ種別
								</label>
								<select
									id="inquiryType"
									name="inquiryType"
									class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors"
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
								class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
								htmlFor="message"
							>
								メッセージ
							</label>
							<textarea
								id="message"
								name="message"
								rows={4}
								placeholder="ご依頼内容・ご相談内容をご記入ください"
								class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors resize-none"
								required
							></textarea>
						</div>

						<div class="flex items-start space-x-2">
							<input
								id="consent"
								name="consent"
								type="checkbox"
								class="mt-1 accent-cloudensis-primary"
								required
							/>
							<label
								htmlFor="consent"
								class="text-cloudensis-fine-print text-cloudensis-ink-muted-48"
							>
								<a
									href="/privacy"
									class="text-cloudensis-primary hover:underline"
								>
									プライバシーポリシー
								</a>
								に同意する
							</label>
						</div>

						<button
							type="submit"
							class="w-full bg-cloudensis-primary hover:bg-cloudensis-primary-focus text-white py-3 rounded-cloudensis-sm font-medium text-sm transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-98 disabled:opacity-50"
						>
							送信する
						</button>

						<div
							id="contact-status"
							class="text-center text-cloudensis-fine-print"
						/>
					</form>
				</div>
			</section>

			<footer class="bg-cloudensis-canvas-parchment border-t border-cloudensis-hairline text-xs text-center py-12 px-8 text-cloudensis-ink-muted-48 select-none font-cloudensis-text space-y-2">
				<div>
					<a href="/privacy" class="hover:text-body transition-colors">
						プライバシーポリシー
					</a>
				</div>
				<div>Copyright &copy; 2026 Cloudensis合同会社</div>
			</footer>

			<script dangerouslySetInnerHTML={{ __html: contactFormScript }} />
		</div>
	);
}

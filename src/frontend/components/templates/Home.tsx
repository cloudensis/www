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
						<span class="font-cloudensis-display font-medium text-[13px] tracking-wide">
							cloudensis
						</span>
					</a>

					{/* Desktop Menu links */}
					<div class="max-[833px]:hidden! flex items-center space-x-8 text-cloudensis-fine-print tracking-tight text-cloudensis-body-muted">
						<a href="#about" class="hover:text-white transition-colors">
							Company
						</a>
						<a href="#services" class="hover:text-white transition-colors">
							Services
						</a>
						<a href="#contact" class="hover:text-white transition-colors">
							Contact
						</a>
					</div>

					{/* Utility Right Menu */}
					<div class="flex items-center space-x-6 text-cloudensis-fine-print text-cloudensis-body-muted">
						<a
							href="#contact"
							class="bg-cloudensis-body hover:bg-cloudensis-ink-muted-80 text-white rounded-cloudensis-sm px-3 py-1 font-normal text-[11px] border border-cloudensis-ink-muted-80 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95"
						>
							Inquire
						</a>
						{/* Mobile Hamburger toggle */}
						<a
							href="#mobile-nav-overlay"
							class="hidden max-[833px]:block! text-white"
						>
							<svg
								class="w-5 h-5 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
							</svg>
							<span class="sr-only">Open menu</span>
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
							cloudensis
						</span>
						<a href="/" class="text-white">
							<svg
								class="w-6 h-6 fill-current"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
							</svg>
							<span class="sr-only">Close menu</span>
						</a>
					</div>
					<div class="flex flex-col space-y-6 pt-8 text-cloudensis-lead-airy font-semibold text-cloudensis-body-muted">
						<a
							href="#about"
							class="hover:text-white transition-colors"
							onclick="window.location.hash=''"
						>
							Company
						</a>
						<a
							href="#services"
							class="hover:text-white transition-colors"
							onclick="window.location.hash=''"
						>
							Services
						</a>
						<a
							href="#contact"
							class="hover:text-white transition-colors"
							onclick="window.location.hash=''"
						>
							Contact
						</a>
					</div>
				</div>
				<div class="pb-10">
					<a
						href="#contact"
						class="block w-full text-center bg-cloudensis-primary hover:bg-cloudensis-primary-focus text-white py-3 rounded-full font-medium text-cloudensis-body"
					>
						Contact Us
					</a>
				</div>
			</div>

			<section class="bg-white text-body pt-[100px] pb-cloudensis-section px-6 select-none flex flex-col items-center text-center">
				<div class="max-w-[800px] w-full">
					<h1 class="font-cloudensis-display text-cloudensis-hero-display font-semibold leading-cloudensis-hero-display tracking-cloudensis-hero-display max-[1068px]:text-[48px] max-[640px]:text-[38px] max-[419px]:text-cloudensis-lead text-body">
						Engineering the Future of Global Infrastructure.
					</h1>
					<p class="text-cloudensis-lead font-normal leading-cloudensis-lead tracking-cloudensis-lead max-[1068px]:text-cloudensis-lead-airy max-[640px]:text-[20px] text-[#86868b] mt-4">
						High-performance compute, intelligence, and networks built for
						next-generation enterprises.
					</p>
					<div class="flex justify-center space-x-6 mt-8">
						<a
							href="#services"
							class="bg-cloudensis-primary hover:bg-cloudensis-primary-focus text-white px-6 py-2.5 rounded-full font-normal text-cloudensis-body transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95 tracking-wide"
						>
							Our Services
						</a>
						<a
							href="#contact"
							class="text-cloudensis-primary hover:underline flex items-center space-x-1 font-normal text-cloudensis-body group"
						>
							<span>Get in Touch</span>
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
				<div class="max-w-[800px] mx-auto text-center">
					<h2 class="font-cloudensis-display text-cloudensis-display-lg font-semibold leading-cloudensis-display-lg tracking-[-0.01em] max-[1068px]:text-cloudensis-display-md max-[640px]:text-cloudensis-lead text-body mb-6">
						Company Profile
					</h2>
					<p class="text-[19px] leading-normal text-cloudensis-ink-muted-48 max-w-[640px] mx-auto mb-12">
						Cloudensis Inc. constructs global systems that eliminate
						orchestrating infrastructure layers, powering runtime networks with
						low latency and developer autonomy.
					</p>
					<div class="grid grid-cols-3 gap-6 pt-4 border-t border-cloudensis-hairline">
						<div>
							<div class="text-[32px] font-bold text-cloudensis-primary font-cloudensis-display">
								12ms
							</div>
							<div class="text-cloudensis-fine-print text-cloudensis-ink-muted-48 uppercase tracking-wider mt-1">
								Avg Latency
							</div>
						</div>
						<div>
							<div class="text-[32px] font-bold text-cloudensis-primary font-cloudensis-display">
								99.99%
							</div>
							<div class="text-cloudensis-fine-print text-cloudensis-ink-muted-48 uppercase tracking-wider mt-1">
								Uptime SLA
							</div>
						</div>
						<div>
							<div class="text-[32px] font-bold text-cloudensis-primary font-cloudensis-display">
								250+
							</div>
							<div class="text-cloudensis-fine-print text-cloudensis-ink-muted-48 uppercase tracking-wider mt-1">
								Edge Nodes
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section 2: Business Description (Services) */}
			<section
				id="services"
				class="bg-white py-20 px-6 border-t border-cloudensis-hairline select-none"
			>
				<div class="max-w-5xl mx-auto">
					<div class="text-center mb-16">
						<h2 class="font-cloudensis-display text-cloudensis-display-lg font-semibold leading-cloudensis-display-lg tracking-[-0.01em] max-[1068px]:text-cloudensis-display-md max-[640px]:text-cloudensis-lead text-body">
							Our Services
						</h2>
						<p class="text-[20px] font-normal leading-[1.4] text-cloudensis-ink-muted-48 mt-2">
							High-efficiency products built for modern applications.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Service 1: Compute */}
						<div class="bg-cloudensis-canvas-parchment rounded-cloudensis-lg p-8 border border-cloudensis-hairline flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
							<div>
								<div class="text-[11px] uppercase tracking-[0.2em] text-cloudensis-primary font-semibold mb-4">
									Service Area 01
								</div>
								<h3 class="font-cloudensis-display text-[22px] font-semibold text-body mb-3">
									Edge Serverless Compute
								</h3>
								<p class="text-cloudensis-caption leading-normal text-cloudensis-ink-muted-48">
									V8-isolated serverless runtime environments yielding 0ms cold
									starts and near-zero execution overhead.
								</p>
							</div>
						</div>

						{/* Service 2: Network */}
						<div class="bg-cloudensis-canvas-parchment rounded-cloudensis-lg p-8 border border-cloudensis-hairline flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
							<div>
								<div class="text-[11px] uppercase tracking-[0.2em] text-cloudensis-primary font-semibold mb-4">
									Service Area 02
								</div>
								<h3 class="font-cloudensis-display text-[22px] font-semibold text-body mb-3">
									Intelligent Smart Route
								</h3>
								<p class="text-cloudensis-caption leading-normal text-cloudensis-ink-muted-48">
									Anycast routing grid optimizing traffic routes dynamically to
									achieve sub-millisecond roundtrips.
								</p>
							</div>
						</div>

						{/* Service 3: AI Inference */}
						<div class="bg-cloudensis-canvas-parchment rounded-cloudensis-lg p-8 border border-cloudensis-hairline flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
							<div>
								<div class="text-[11px] uppercase tracking-[0.2em] text-cloudensis-primary font-semibold mb-4">
									Service Area 03
								</div>
								<h3 class="font-cloudensis-display text-[22px] font-semibold text-body mb-3">
									Edge GPU AI Acceleration
								</h3>
								<p class="text-cloudensis-caption leading-normal text-cloudensis-ink-muted-48">
									Advanced LLMs and model pipeline logic executed directly at
									the edge layer with minimal trip latency.
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
				<div class="max-w-[600px] mx-auto">
					<div class="text-center mb-12">
						<h2 class="font-cloudensis-display text-cloudensis-display-lg font-semibold leading-cloudensis-display-lg tracking-[-0.01em] max-[1068px]:text-cloudensis-display-md max-[640px]:text-cloudensis-lead text-body">
							Contact Us
						</h2>
						<p class="text-cloudensis-body text-cloudensis-ink-muted-48 mt-2">
							Let's build something exceptional together. Reach out at{" "}
							<span class="text-cloudensis-primary">
								support@cloudensis.com
							</span>{" "}
							or send a message below.
						</p>
					</div>

					<form class="bg-white rounded-cloudensis-lg border border-cloudensis-hairline p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] space-y-6">
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div class="space-y-2">
								<label
									class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
									htmlFor="name"
								>
									Name
								</label>
								<input
									id="name"
									type="text"
									placeholder="Jane Doe"
									class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors"
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
									htmlFor="email"
								>
									Email
								</label>
								<input
									id="email"
									type="email"
									placeholder="jane@example.com"
									class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors"
									required
								/>
							</div>
						</div>

						<div class="space-y-2">
							<label
								class="text-cloudensis-fine-print font-semibold text-body uppercase tracking-wider block"
								htmlFor="message"
							>
								Message
							</label>
							<textarea
								id="message"
								rows={4}
								placeholder="Describe your project requirements here..."
								class="w-full bg-cloudensis-canvas-parchment border border-cloudensis-hairline rounded-cloudensis-sm px-4 py-2.5 text-cloudensis-caption text-body focus:outline-hidden focus:border-cloudensis-primary transition-colors resize-none"
								required
							></textarea>
						</div>

						<button
							type="submit"
							class="w-full bg-cloudensis-primary hover:bg-cloudensis-primary-focus text-white py-3 rounded-cloudensis-sm font-medium text-[15px] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-98"
						>
							Send Message
						</button>
					</form>
				</div>
			</section>

			<footer class="bg-cloudensis-canvas-parchment border-t border-cloudensis-hairline text-xs text-center py-12 px-8 text-cloudensis-ink-muted-48 select-none font-cloudensis-text">
				Copyright &copy; 2026 Cloudensis llc.
			</footer>
		</div>
	);
}

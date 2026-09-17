import type { Child } from "hono/jsx";
import { Footer } from "#/src/interfaces/components/layout/footer";
import { Header } from "#/src/interfaces/components/layout/header";
import { LinkButton } from "#/src/interfaces/components/ui/button";
import { ContactForm } from "./contact-form";

export function Template() {
	return (
		<div>
			<Header />
			<main class="mx-auto max-w-5xl space-y-20 px-4 lg:px-8">
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

type SectionProps = {
	id: string;
	title: string;
	children: Child;
};

function Section({ id, title, children }: SectionProps) {
	return (
		<section id={id}>
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

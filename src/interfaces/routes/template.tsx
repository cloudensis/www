import { company } from "#/src/domains/company/constants";
import { Section } from "#/src/interfaces/components/layout/section";
import { LinkButton } from "#/src/interfaces/components/ui/button";
import { DescriptionList } from "../components/ui/description-list";

export function Template() {
	return (
		<main class="mx-auto max-w-5xl space-y-20 px-4 py-12 lg:px-8">
			<FirstView />
			<Section id="services" title="事業内容">
				<Services />
			</Section>
			<Section id="company" title="会社概要">
				<CompanyOverview />
			</Section>
		</main>
	);
}

function FirstView() {
	return (
		<div>
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
			<LinkButton href="/contact">お問い合わせ</LinkButton>
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
		<DescriptionList
			items={[
				{ term: "会社名", details: company.name },
				{ term: "代表者", details: company.representative },
				{
					term: "設立",
					details: company.establishedOn.toLocaleDateString("ja-JP", {
						dateStyle: "long",
						timeZone: "Asia/Tokyo",
					}),
				},
				{
					term: "本社所在地",
					details: (
						<>
							<p>〒{company.postalCode}</p>
							<p>{company.address}</p>
						</>
					),
				},
			]}
		/>
	);
}

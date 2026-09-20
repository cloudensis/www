import { company } from "#/src/domains/company/constants";
import { type ContactType, contactTypes } from "#/src/domains/contact/contact";
import { Section } from "#/src/interfaces/components/layout/section";
import { LinkButton } from "#/src/interfaces/components/ui/button";
import { DescriptionList } from "#/src/interfaces/components/ui/description-list";

export function Template() {
	return (
		<div class="mx-auto max-w-5xl space-y-20 px-4 py-12 lg:px-8">
			<FirstView />
			<Section id="services" title="事業内容">
				<Services />
			</Section>
			<Section id="company" title="会社概要">
				<CompanyOverview />
			</Section>
		</div>
	);
}

function FirstView() {
	return (
		<div>
			<h1 class="font-medium text-neutral-800 text-xl leading-normal lg:text-4xl">
				よりシンプルで
				<br />
				より価値を生むソフトウェア
			</h1>
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

function ContactLink({ type }: { type: ContactType }) {
	return (
		<a
			href={`/contact?type=${encodeURIComponent(type)}`}
			class="mt-3 inline-block underline"
		>
			この事業について問い合わせる
		</a>
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
				<ContactLink type={contactTypes[0]} />
			</div>

			<div>
				<h3 class="mb-3 font-medium">技術教育</h3>
				<p>
					高度IT人材の育成に向けたプログラミング・AI活用の教育カリキュラムの提供、および技術情報コンテンツの企画・制作を行います。
				</p>
				<ContactLink type={contactTypes[1]} />
			</div>

			<div>
				<h3 class="mb-3 font-medium">自社プロダクト開発</h3>
				<p>
					Web標準技術やクラウドネイティブなアーキテクチャを活用した、自社オリジナルのWebアプリケーション・デジタルコンテンツの企画・開発を行います。
				</p>
				<ContactLink type={contactTypes[2]} />
			</div>
		</div>
	);
}

function CompanyOverview() {
	return (
		<DescriptionList
			items={[
				{ term: "会社名", details: company.name },
				{ term: "代表", details: company.representative },
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

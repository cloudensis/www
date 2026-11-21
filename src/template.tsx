import { LinkButton } from "@cloudensis/design-system/components/button";
import type { Child } from "hono/jsx";
import { company, services, site } from "./const";

export function HomeTemplate() {
	return (
		<div class="mx-auto max-w-5xl space-y-20 px-4 py-12 lg:px-8">
			<OrganizationJsonLd />
			<div>
				<h1 class="text-xl leading-normal font-medium lg:text-4xl">
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
			</div>

			<Section id="services" title="事業内容">
				<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
					{services.map(({ key, name, description }) => (
						<div key={key}>
							<h3 class="mb-3 font-medium">{name}</h3>
							<p>{description}</p>
						</div>
					))}
				</div>
			</Section>

			<Section id="company" title="会社概要">
				<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
					<dt>会社名</dt>
					<dd>{company.name}</dd>
					<dt>設立</dt>
					<dd>
						{company.establishedOn.toLocaleDateString("ja-JP", {
							dateStyle: "long",
							timeZone: "Asia/Tokyo",
						})}
					</dd>
					<dt>本社所在地</dt>
					<dd>
						<p>〒{company.postalCode}</p>
						<p>
							{company.address.region}
							{company.address.locality}
							{company.address.street}
						</p>
					</dd>
				</dl>
			</Section>
		</div>
	);
}

function Section({
	id,
	title,
	children,
}: {
	id?: string;
	title: string;
	children: Child;
}) {
	return (
		<section id={id}>
			<h2 class="mb-4 text-xl font-medium">{title}</h2>
			{children}
		</section>
	);
}

export function ErrorTemplate({
	title,
	message,
}: {
	title: string;
	message: string;
}) {
	return (
		<div class="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:px-8">
			<h1 class="text-2xl font-medium">{title}</h1>
			<p>{message}</p>
			<LinkButton href="/">トップページへ戻る</LinkButton>
		</div>
	);
}

/**
 * 検索エンジン向けの構造化データ（schema.org の Organization）。
 * 会社概要と同じ company 定数から生成し、表示内容と食い違わないようにする。
 * type="application/ld+json" は実行されるスクリプトではないため、CSP の script-src の対象外。
 */
function OrganizationJsonLd() {
	const data = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: company.name,
		url: site.url,
		logo: new URL("/logo.png", site.url).toString(),
		description: site.description,
		foundingDate: company.establishedOn.toISOString().slice(0, 10),
		address: {
			"@type": "PostalAddress",
			postalCode: company.postalCode,
			addressCountry: "JP",
			addressRegion: company.address.region,
			addressLocality: company.address.locality,
			streetAddress: company.address.street,
		},
		sameAs: company.sameAs,
	};

	return (
		<script
			type="application/ld+json"
			// "</script>" で要素が閉じられないよう、"<" をエスケープする
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}

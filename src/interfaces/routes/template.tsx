import { Section } from "@cloudensis/design-system/components/layout/section";
import { LinkButton } from "@cloudensis/design-system/components/ui/button";
import { DescriptionList } from "@cloudensis/design-system/components/ui/description-list";
import { company } from "#/src/domains/company/constants";
import type { ContactType } from "#/src/domains/contact/contact";
import { services } from "#/src/domains/service/constants";
import { paths } from "#/src/interfaces/paths";

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
			<LinkButton href={paths.contact}>お問い合わせ</LinkButton>
		</div>
	);
}

function ContactLink({ type }: { type: ContactType }) {
	return (
		<a
			href={`${paths.contact}?type=${type}`}
			class="mt-3 inline-block underline"
		>
			この事業について問い合わせる
		</a>
	);
}

function Services() {
	return (
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{services.map(({ key, name, description }) => (
				<div key={key}>
					<h3 class="mb-3 font-medium">{name}</h3>
					<p>{description}</p>
					<ContactLink type={key} />
				</div>
			))}
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

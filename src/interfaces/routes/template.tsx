import type { Child } from "hono/jsx";
import { Header } from "#/src/interfaces/components/layout/header";

export function Template() {
	return (
		<div>
			<Header />
			<main class="mx-auto max-w-5xl space-y-8 px-5">
				<Section title="サービス">
					<ServiceList />
				</Section>
				<Section title="会社概要">
					<DescriptionList />
				</Section>
			</main>
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

function ServiceList() {
	return <div>service</div>;
}

function DescriptionList() {
	return (
		<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
			<dt>会社名</dt>
			<dd>A large feline inhabiting Bodmin Moor.</dd>

			<dt>設立</dt>
			<dd>2026年4月</dd>

			<dt>住所</dt>
			<dd>宮城県仙台市青葉区中央2-11-19 仙南ビル4階 -A</dd>
		</dl>
	);
}

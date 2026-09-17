import type { Child } from "hono/jsx";

type SectionProps = {
	id: string;
	title: string;
	children: Child;
};

export function Section({ id, title, children }: SectionProps) {
	return (
		<section id={id}>
			<h2 class="mb-4 font-medium text-xl">{title}</h2>
			<div>{children}</div>
		</section>
	);
}

import type { Child } from "hono/jsx";

type DescriptionListProps = {
	items: {
		term: Child;
		details: Child;
	}[];
};

export function DescriptionList({ items }: DescriptionListProps) {
	return (
		<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
			{items.map((item) => (
				<>
					<dt>{item.term}</dt>
					<dd>{item.details}</dd>
				</>
			))}
		</dl>
	);
}

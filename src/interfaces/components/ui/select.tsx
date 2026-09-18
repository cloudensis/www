import type { JSX } from "hono/jsx";
import { cn } from "#/src/interfaces/lib/utils";

type SelectProps = JSX.IntrinsicElements["select"];

export function Select({ class: className, children, ...props }: SelectProps) {
	return (
		<select
			data-slot="select"
			class={cn(
				"w-full rounded border border-neutral-800 px-4 py-2",
				className,
			)}
			{...props}
		>
			{children}
		</select>
	);
}

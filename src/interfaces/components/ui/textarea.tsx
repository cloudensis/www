import type { JSX } from "hono/jsx";
import { cn } from "#/src/interfaces/lib/utils";

type TextareaProps = JSX.IntrinsicElements["textarea"];

export function Textarea({
	type,
	class: className,
	children,
	...props
}: TextareaProps) {
	return (
		<textarea
			data-slot="textarea"
			class={cn(
				"w-full rounded border border-neutral-800 px-4 py-2",
				className,
			)}
			{...props}
		>
			{children}
		</textarea>
	);
}

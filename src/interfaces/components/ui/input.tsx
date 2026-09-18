import type { JSX } from "hono/jsx";
import { cn } from "#/src/interfaces/lib/utils";

type InputProps = JSX.IntrinsicElements["input"];

export function Input({ type, class: className, ...props }: InputProps) {
	if (type === "checkbox") return <Checkbox class={className} {...props} />;
	if (type === "radio") return <Radio class={className} {...props} />;

	return (
		<input
			data-slot="input"
			type={type}
			class={cn(
				"w-full rounded border border-neutral-800 px-4 py-2",
				className,
			)}
			{...props}
		/>
	);
}

type CheckProps = JSX.IntrinsicElements["input"] & { type?: never };

function Checkbox({ class: className, ...props }: CheckProps) {
	return (
		<input
			data-slot="checkbox"
			type="checkbox"
			class={cn("size-4", className)}
			{...props}
		/>
	);
}

type RadioProps = JSX.IntrinsicElements["input"] & { type?: never };

function Radio({ class: className, ...props }: RadioProps) {
	return (
		<input
			data-slot="radio"
			type="radio"
			class={cn(
				// "size-4 appearance-none rounded-full border border-stone-200 bg-stone-100 outline-none dark:border-stone-700 dark:bg-stone-900",
				// "checked:border-4 checked:border-blue-600 dark:checked:border-blue-500",
				// "focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400",
				// "disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

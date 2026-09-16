import type { JSX } from "hono/jsx";
import { cn } from "#/src/interfaces/lib/utils";

const variants = {
	variant: {
		default: cn("inline-block cursor-pointer rounded bg-blue-800 text-white"),
	},
	size: {
		default: cn("px-4 py-2"),
	},
};

type ButtonProps = JSX.IntrinsicElements["button"] & {
	variant?: keyof typeof variants.variant;
	size?: keyof typeof variants.size;
};

export function Button({
	variant = "default",
	size = "default",
	class: className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			class={cn(variants.variant[variant], variants.size[size], className)}
			{...props}
		>
			{children}
		</button>
	);
}

type LinkButtonProps = JSX.IntrinsicElements["a"] & {
	variant?: keyof typeof variants.variant;
	size?: keyof typeof variants.size;
};

export function LinkButton({
	variant = "default",
	size = "default",
	class: className,
	children,
	...props
}: LinkButtonProps) {
	return (
		<a
			class={cn(variants.variant[variant], variants.size[size], className)}
			{...props}
		>
			{children}
		</a>
	);
}

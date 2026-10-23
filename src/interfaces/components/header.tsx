import { LogoLockup } from "@cloudensis/design-system/brand/cloudensis/logo-lockup";

export function Header() {
	return (
		<header class="sticky top-0 z-10 flex h-14 items-center border-default border-b bg-default px-4 lg:px-6">
			<a href="/" class="flex items-baseline gap-2">
				<LogoLockup class="text-lg" />
			</a>
		</header>
	);
}

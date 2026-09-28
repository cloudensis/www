import { LogoLockup } from "@cloudensis/design-system/brand/cloudensis/logo-lockup";
import { paths } from "#/src/interfaces/paths";

export function Header() {
	return (
		<header class="flex flex-wrap items-center justify-between gap-4 p-4 lg:px-8">
			<a href={paths.home} class="text-neutral-800">
				<LogoLockup class="lg:text-3xl" />
			</a>
		</header>
	);
}

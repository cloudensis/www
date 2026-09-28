import { company } from "#/src/domains/company/constants";
import { paths } from "#/src/interfaces/paths";

export function Footer() {
	return (
		<footer class="flex flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm lg:px-8">
			<span>
				&copy; {new Date().getFullYear()} {company.name}
			</span>
			<nav class="flex flex-wrap gap-x-4 gap-y-2">
				<a
					href="https://github.com/cloudensis/"
					class="underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				<a href={paths.privacy} class="underline">
					プライバシーポリシー
				</a>
			</nav>
		</footer>
	);
}

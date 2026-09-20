import { company } from "#/src/domains/company/constants";
import { paths } from "#/src/interfaces/paths";

export function Footer() {
	return (
		<footer class="flex justify-between px-4 py-8 lg:px-8">
			<span>
				&copy; {new Date().getFullYear()} {company.name}
			</span>
			<a
				href={paths.privacy}
				class="underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				プライバシーポリシー
			</a>
		</footer>
	);
}

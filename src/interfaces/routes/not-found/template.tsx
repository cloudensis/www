import { LinkButton } from "#/src/interfaces/components/ui/button";

export function Template() {
	return (
		<div class="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">ページが見つかりません</h1>
			<p>
				お探しのページは移動または削除された可能性があります。URLをご確認ください。
			</p>
			<LinkButton href="/">トップページへ戻る</LinkButton>
		</div>
	);
}

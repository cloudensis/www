import { LinkButton } from "#/src/interfaces/components/ui/button";

export function Template() {
	return (
		<div class="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">エラーが発生しました</h1>
			<p>
				申し訳ありません。処理中に問題が発生しました。時間をおいて、再度お試しください。
			</p>
			<LinkButton href="/">トップページへ戻る</LinkButton>
		</div>
	);
}

import { LinkButton } from "#/src/interfaces/components/ui/button";

export function Template() {
	return (
		<main class="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">お問い合わせを受け付けました</h1>
			<p>
				お問い合わせいただきありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
			</p>
			<LinkButton href="/">トップページへ戻る</LinkButton>
		</main>
	);
}

import { LogoLockup } from "@cloudensis/design-system/brand/cloudensis/logo-lockup";
import { LinkButton } from "@cloudensis/design-system/components/button";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { type Child, Fragment } from "hono/jsx";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { secureHeaders } from "hono/secure-headers";
import { Link, ViteClient } from "vite-ssr-components/hono";

const company = {
	name: "Cloudensis合同会社",
	postalCode: "980-0021",
	address: "宮城県仙台市青葉区中央2-11-19 仙南ビル4階 -A",
	establishedOn: new Date("2026-04-01"),
} as const;

const site = {
	name: "cloudensis",
	url: "https://cloudensis.com",
	description:
		"cloudensisは、ソフトウェア開発支援、技術教育、自社プロダクト開発を行うソフトウェア企業です。",
} as const;

// 事業内容の一覧。トップページに表示する。
const services = [
	{
		key: "software-development",
		name: "ソフトウェア開発支援",
		description:
			"要件定義から設計、実装、運用まで一貫して対応します。ソフトウェアアーキテクチャ、クラウドアーキテクチャの設計、AIを活用した開発を得意としています。",
	},
	{
		key: "technical-education",
		name: "技術教育",
		description:
			"高度IT人材の育成に向けたプログラミング・AI活用の教育カリキュラムの提供、および技術情報コンテンツの企画・制作を行います。",
	},
	{
		key: "product-development",
		name: "自社プロダクト開発",
		description:
			"Web標準技術やクラウドネイティブなアーキテクチャを活用した、自社オリジナルのWebアプリケーション・デジタルコンテンツの企画・開発を行います。",
	},
] as const;

type PageMeta = {
	/** ページ名。`{ページ名} | {サイト名}` の形でタイトルに使う。省略時はサイト名のみ。 */
	title?: string;
	/** 省略時はサイト共通の説明文を使う。 */
	description?: string;
	/** 404 やエラー画面など、検索結果に載せないページで true にする。 */
	noindex?: boolean;
};

declare module "hono" {
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: ContextRenderer は interface の宣言マージで拡張する
		(
			content: string | Promise<string>,
			meta?: PageMeta,
		): Response | Promise<Response>;
	}
}

function Header() {
	return (
		<header class="sticky top-0 z-10 flex h-14 items-center border-default border-b bg-default px-4 lg:px-6">
			<a href="/" class="flex items-baseline gap-2">
				<LogoLockup class="text-lg" />
			</a>
		</header>
	);
}

function Footer() {
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
				<a
					href="https://x.com/cloudensis/"
					class="underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					X
				</a>
			</nav>
		</footer>
	);
}

function Section({
	id,
	title,
	children,
}: {
	id?: string;
	title: string;
	children: Child;
}) {
	return (
		<section id={id}>
			<h2 class="mb-4 font-medium text-xl">{title}</h2>
			{children}
		</section>
	);
}

function DescriptionList({
	items,
}: {
	items: {
		term: Child;
		details: Child;
	}[];
}) {
	return (
		<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
			{items.map((item, index) => (
				<Fragment key={String(index)}>
					<dt>{item.term}</dt>
					<dd>{item.details}</dd>
				</Fragment>
			))}
		</dl>
	);
}

function HomePage() {
	return (
		<div class="mx-auto max-w-5xl space-y-20 px-4 py-12 lg:px-8">
			<div>
				<h1 class="font-medium text-neutral-800 text-xl leading-normal lg:text-4xl">
					よりシンプルで
					<br />
					より価値を生むソフトウェア
				</h1>
				<p class="my-6 max-w-2xl text-sm leading-normal">
					AIによって、ソフトウェアは誰でも作れるようになりました。
					いま、エンジニアの仕事は「何を作るか」ではなく「何を作らないか」を決めることです。
					よりシンプルで保守しやすく、事業価値を生み続ける実装は何か。
					それを見極める力が、エンジニアの価値だと考えています。
				</p>
			</div>
			<Section id="services" title="事業内容">
				<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
					{services.map(({ key, name, description }) => (
						<div key={key}>
							<h3 class="mb-3 font-medium">{name}</h3>
							<p>{description}</p>
						</div>
					))}
				</div>
			</Section>
			<Section id="company" title="会社概要">
				<DescriptionList
					items={[
						{ term: "会社名", details: company.name },
						{
							term: "設立",
							details: company.establishedOn.toLocaleDateString("ja-JP", {
								dateStyle: "long",
								timeZone: "Asia/Tokyo",
							}),
						},
						{
							term: "本社所在地",
							details: (
								<>
									<p>〒{company.postalCode}</p>
									<p>{company.address}</p>
								</>
							),
						},
					]}
				/>
			</Section>
		</div>
	);
}

function MessagePage({ title, message }: { title: string; message: string }) {
	return (
		<div class="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:px-8">
			<h1 class="font-medium text-2xl">{title}</h1>
			<p>{message}</p>
			<LinkButton href="/">トップページへ戻る</LinkButton>
		</div>
	);
}

const renderer = jsxRenderer(({ children, ...props }) => {
	const c = useRequestContext();
	const meta: PageMeta = props;
	const title = meta.title ? `${meta.title} | ${site.name}` : site.name;
	const description = meta.description ?? site.description;
	const canonicalUrl = new URL(c.req.path, site.url).toString();
	const ogImageUrl = new URL("/ogp.png", site.url).toString();

	return (
		<html lang="ja">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
				<meta name="description" content={description} />
				{meta.noindex ? (
					<meta name="robots" content="noindex" />
				) : (
					<link rel="canonical" href={canonicalUrl} />
				)}

				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={site.name} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				{!meta.noindex && <meta property="og:url" content={canonicalUrl} />}
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:locale" content="ja_JP" />
				<meta name="twitter:card" content="summary_large_image" />

				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="apple-touch-icon" href="/logo.png" />

				<ViteClient />
				<Link href="/src/global.css" rel="stylesheet" />
			</head>
			<body class="flex min-h-svh flex-col">
				<Header />
				<main class="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
});

/**
 * 全レスポンスにセキュリティヘッダーを付与する。
 * Content-Security-Policy 以外（HSTS や X-Content-Type-Options など）は
 * secureHeaders の既定値をそのまま利用する。
 */
const securityHeaders = secureHeaders({
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
		// Tailwind の開発時インジェクション
		styleSrc: ["'self'", "'unsafe-inline'"],
		imgSrc: ["'self'", "data:"],
		fontSrc: ["'self'"],
		connectSrc: ["'self'"],
		objectSrc: ["'none'"],
		baseUri: ["'self'"],
		formAction: ["'self'"],
		frameAncestors: ["'none'"],
	},
});

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.use(securityHeaders, renderer, csrf());

app.get("/", (c) => c.render(<HomePage />));

app.notFound((c) => {
	c.status(404);
	return c.render(
		<MessagePage
			title="ページが見つかりません"
			message="お探しのページは移動または削除された可能性があります。URLをご確認ください。"
		/>,
		{ title: "ページが見つかりません", noindex: true },
	);
});

app.onError(async (c, next) => {
	// CSRF の 403 など、意図して投げられた HTTP エラーは組み込みのハンドラーでそのまま返す
	if (c.error instanceof HTTPException) {
		return next();
	}

	console.error("Unhandled error", c.error);
	c.status(500);
	return c.render(
		<MessagePage
			title="エラーが発生しました"
			message="申し訳ありません。処理中に問題が発生しました。時間をおいて、再度お試しください。"
		/>,
		{ title: "エラーが発生しました", noindex: true },
	);
});

export default app;

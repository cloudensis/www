// 事業内容の一覧。トップページの表示と、お問い合わせ種別の生成元を兼ねる。
export const services = [
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

export type Service = (typeof services)[number];

// URL やフォームの値に使う英語の key
export type ServiceKey = Service["key"];

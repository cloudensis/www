export const company = {
	name: "Cloudensis合同会社",
	postalCode: "980-0021",
	address: "宮城県仙台市青葉区中央2-11-19 仙南ビル4階 -A",
	establishedOn: new Date("2026-04-01"),
} as const;

export const site = {
	name: "cloudensis",
	url: "https://cloudensis.com",
	description:
		"cloudensisは、ソフトウェア開発支援、技術教育、自社プロダクト開発を行うソフトウェア企業です。",
} as const;

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

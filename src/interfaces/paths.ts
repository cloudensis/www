/**
 * サイト内の URL 一覧。
 * ルートの登録とリンクの生成の両方でこれを使い、パス文字列を1箇所に閉じる。
 *
 * `as const` で literal 型を保つため、Hono の型推論（動的セグメントに対する
 * `c.req.param` の型付け）はパスを直書きした場合と変わらない。
 */
export const paths = {
	home: "/",
	contact: "/contact",
	contactComplete: "/contact/complete",
	privacy: "/privacy",
} as const;

import type { Hono } from "hono";

export type Env = { Bindings: CloudflareBindings };

/** ルートを登録する関数が受け取るアプリ本体。 */
export type App = Hono<Env>;

import { Hono } from "hono";
import { renderer } from "./middleware";
import { HomeTemplate } from "./template";

/**
 * ビルド時に静的 HTML を生成するルートをまとめた Hono アプリ。
 * `vite build --mode ssg` がこのアプリを辿って public/ に HTML を書き出す。
 */
const app = new Hono();

app.use(renderer);

app.get("/", (c) => c.render(<HomeTemplate />));

export default app;

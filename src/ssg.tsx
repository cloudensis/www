import { Hono } from "hono";
import { renderer } from "./middleware";
import { HomeTemplate } from "./template";

/**
 * ビルド時に静的 HTML として書き出すページ。
 * 本番では dist/ssg の静的アセットとして配信され、Worker を経由しない。
 */
const ssg = new Hono();

ssg.use(renderer);

ssg.get("/", (c) => c.render(<HomeTemplate />));

export default ssg;

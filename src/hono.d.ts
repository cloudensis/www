import "hono";
import type { PageMeta } from "./middleware";

declare module "hono" {
	type ContextRenderer = (
		content: string | Promise<string>,
		meta?: PageMeta,
	) => Response | Promise<Response>;
}

import type { App } from "#/src/interfaces/app";
import { paths } from "#/src/interfaces/paths";
import { Template } from "./template";

export const registerHome = (app: App) => {
	app.get(paths.home, (c) => c.render(<Template />));
};

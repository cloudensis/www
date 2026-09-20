import type { App } from "#/src/interfaces/app";
import { paths } from "#/src/interfaces/paths";
import { Template } from "./template";

export const registerContactComplete = (app: App) => {
	app.get(paths.contactComplete, (c) => c.render(<Template />));
};

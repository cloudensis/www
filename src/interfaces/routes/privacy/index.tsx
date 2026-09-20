import type { App } from "#/src/interfaces/app";
import { paths } from "#/src/interfaces/paths";
import { Template } from "./template";

export const registerPrivacy = (app: App) => {
	app.get(paths.privacy, (c) => c.render(<Template />));
};

import { defineHandler } from "hono/factory";
import { HomeTemplate } from "../components/templates";
import { site } from "../const";

const ssg = true;

const GET = defineHandler((c) =>
	c.render(<HomeTemplate />, {
		title: site.name,
		description: site.description,
	}),
);

export { GET, ssg };

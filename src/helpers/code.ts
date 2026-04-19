import type { Helper } from "../helper-registry-base.js";
import { tag } from "./html.js";

const gist = (id: string): string => {
	return tag("script", { src: `https://gist.github.com/${id}.js` });
};

type JsfiddleOptions = {
	id?: string;
	width?: string;
	height?: string;
	skin?: string;
	tabs?: string;
	allowfullscreen?: string;
	frameborder?: string;
};

const jsfiddle = (options: JsfiddleOptions): string => {
	if (!options?.id) {
		throw new Error("jsfiddle helper expects an `id`");
	}
	const {
		id,
		width = "100%",
		height = "300",
		skin = "/presentation/",
		tabs = "result,js,html,css",
		allowfullscreen = "allowfullscreen",
		frameborder = "0",
	} = options;
	const src = `http://jsfiddle.net/${id}/embedded/${tabs}${skin}`;
	return tag("iframe", { width, height, src, allowfullscreen, frameborder });
};

export const helpers: Helper[] = [
	{
		name: "gist",
		category: "code",
		compatibility: ["browser", "nodejs"],
		fn: gist,
	},
	{
		name: "jsfiddle",
		category: "code",
		compatibility: ["browser", "nodejs"],
		fn: jsfiddle,
	},
];

export { gist, jsfiddle };

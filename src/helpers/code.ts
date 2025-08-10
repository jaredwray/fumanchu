import fs from "node:fs";
import path from "node:path";
import tag from "html-tag";
// @ts-ignore
import codeBlock from "to-gfm-code-block";
import type { Helper } from "../helper-registry.js";

const embed = (filepath: string, language?: string): string => {
	let ext =
		typeof language === "string" ? language : path.extname(filepath).slice(1);
	let code = fs.readFileSync(filepath, "utf8");
	if (ext === "markdown" || ext === "md") {
		ext = "markdown";
		code = code.split("`").join("&#x60");
	}
	return `${codeBlock(code, ext).trim()}\n`;
};

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
	if (!options || !options.id) {
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
		name: "embed",
		category: "code",
		compatibility: ["nodejs"],
		fn: embed,
	},
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

export { embed, gist, jsfiddle };

// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context
import path from "node:path";
import type { Helper } from "../helper-registry-base.js";
import { arrayify } from "./array.js";
import { parseAttributes, tag } from "./html.js";

const css = function (
	this: any,
	list?: string | string[],
	options?: { hash?: Record<string, unknown> },
): string {
	// biome-ignore lint/complexity/noArguments: to match handlebars helper signature
	if (arguments.length < 2) {
		options = list as any;
		list = [];
	}
	let styles = arrayify(list ?? []);
	let assets = "";
	if (this && this.options) {
		assets = this.options.assets || "";
	}
	if (options?.hash?.href) {
		styles = arrayify(options.hash.href as string | string[]);
	}
	return styles
		.map((item) => {
			const ext = path.extname(item);
			let fp = item;
			/* c8 ignore next -- @preserve */
			if (!/(^\/\/)|(:\/\/)/.test(item)) {
				fp = path.posix.join(assets, item);
			}
			if (ext === ".less") {
				return `<link type="text/css" rel="stylesheet/less" href="${fp}">`;
			}
			return `<link type="text/css" rel="stylesheet" href="${fp}">`;
		})
		.join("\n");
};

const js = (context: any): string => {
	if (context && typeof context === "object" && !Array.isArray(context)) {
		const attrStr = parseAttributes(context.hash ?? {});
		return `<script${attrStr ? ` ${attrStr}` : ""}></script>`;
	}
	if (typeof context === "string") {
		return `<script src="${context}"></script>`;
	}
	const items = arrayify(context);
	return items
		.map((fp) =>
			path.extname(fp) === ".coffee"
				? tag("script", { type: "text/coffeescript", src: fp })
				: tag("script", { src: fp }),
		)
		.join("\n");
};

export const helpers: Helper[] = [
	{
		name: "css",
		category: "html",
		compatibility: ["nodejs"],
		fn: css,
	},
	{
		name: "js",
		category: "html",
		compatibility: ["nodejs"],
		fn: js,
	},
];

export { css, js };

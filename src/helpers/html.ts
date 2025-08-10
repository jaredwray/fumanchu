// biome-ignore-all lint/suspicious/noExplicitAny: handlebars helpers use any for context
import path from "node:path";
import tag from "html-tag";
import striptags from "striptags";
import type { Helper } from "../helper-registry.js";
import { arrayify } from "./array.js";

const parseAttributes = (hash: Record<string, unknown> = {}): string =>
	Object.keys(hash)
		.map((key) => `${key}="${String(hash[key]).replace(/^['"]|["']$/g, "")}"`)
		.join(" ");

const attr = (
	options: { hash?: Record<string, unknown> } | undefined,
): string => {
	const val = parseAttributes(options?.hash ?? {});
	return val.trim() ? ` ${val}` : "";
};

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

const sanitize = (str?: string): string => {
	if (typeof str !== "string") return "";
	return striptags(str).trim();
};

const ul = (
	context: any[],
	options: { hash?: Record<string, unknown>; fn: (item: any) => string },
): string => {
	const attrs = parseAttributes(options.hash ?? {});
	const items = context.map((item) =>
		typeof item === "string" ? item : options.fn(item),
	);
	const open = attrs ? `<ul ${attrs}>` : "<ul>";
	return `${open}${items.map((i) => `<li>${i}</li>`).join("\n")}</ul>`;
};

const ol = (
	context: any[],
	options: { hash?: Record<string, unknown>; fn: (item: any) => string },
): string => {
	const attrs = parseAttributes(options.hash ?? {});
	const items = context.map((item) =>
		typeof item === "string" ? item : options.fn(item),
	);
	const open = attrs ? `<ol ${attrs}>` : "<ol>";
	return `${open}${items.map((i) => `<li>${i}</li>`).join("\n")}</ol>`;
};

type ThumbnailContext = {
	id: string;
	alt: string;
	thumbnail: string;
	size: { width: number; height: number };
	full?: string;
	classes?: { image?: string[]; figure?: string[]; link?: string[] };
	caption?: string;
};

const thumbnailImage = (context: ThumbnailContext): string => {
	let figure = "";
	let image = "";
	const link = context.full || false;
	const imageAttributes: Record<string, any> = {
		alt: context.alt,
		src: context.thumbnail,
		width: context.size.width,
		height: context.size.height,
	};
	const figureAttributes: Record<string, any> = { id: `image-${context.id}` };
	const linkAttributes: Record<string, any> = { href: link, rel: "thumbnail" };
	if (context.classes) {
		if (context.classes.image) {
			imageAttributes.class = context.classes.image.join(" ");
		}
		if (context.classes.figure) {
			figureAttributes.class = context.classes.figure.join(" ");
		}
		if (context.classes.link) {
			linkAttributes.class = context.classes.link.join(" ");
		}
	}
	figure += `<figure ${parseAttributes(figureAttributes)}>\n`;
	image += `<img ${parseAttributes(imageAttributes)}>\n`;
	if (link) {
		figure += `<a ${parseAttributes(linkAttributes)}>\n${image}</a>\n`;
	} else {
		figure += image;
	}
	if (context.caption) {
		figure += `<figcaption>${context.caption}</figcaption>\n`;
	}
	figure += "</figure>";
	return figure;
};

export const helpers: Helper[] = [
	{
		name: "attr",
		category: "html",
		compatibility: ["browser", "nodejs"],
		fn: attr,
	},
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
	{
		name: "sanitize",
		category: "html",
		compatibility: ["browser", "nodejs"],
		fn: sanitize,
	},
	{
		name: "ul",
		category: "html",
		compatibility: ["browser", "nodejs"],
		fn: ul,
	},
	{
		name: "ol",
		category: "html",
		compatibility: ["browser", "nodejs"],
		fn: ol,
	},
	{
		name: "thumbnailImage",
		category: "html",
		compatibility: ["browser", "nodejs"],
		fn: thumbnailImage,
	},
];

export { attr, css, js, sanitize, ul, ol, thumbnailImage };

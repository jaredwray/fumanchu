// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import { escape as qsEscape } from "node:querystring";
import { format, parse, resolve } from "node:url";
import type { Helper } from "../helper-registry.js";

const all = ["browser", "nodejs"] as const;

const encodeUri = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return encodeURIComponent(str);
	}
};

const escapeFn = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return qsEscape(str);
	}
};

const decodeUri = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return decodeURIComponent(str);
	}
};

function urlEncode(this: unknown, ...args: unknown[]) {
	return encodeUri.apply(this, args as [unknown]);
}

function urlDecode(this: unknown, ...args: unknown[]) {
	return decodeUri.apply(this, args as [unknown]);
}

const urlResolve = (base: unknown, href: unknown): string =>
	resolve(String(base), String(href));

const urlParse = (str: unknown) => parse(String(str));

const stripQuerystring = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return str.split("?")[0];
	}
};

const stripProtocol = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		const parsed = parse(str);
		parsed.protocol = "";
		return format(parsed);
	}
};

export const helpers: Helper[] = [
	{
		name: "encodeURI",
		category: "url",
		compatibility: all,
		fn: encodeUri as any,
	},
	{
		name: "escape",
		category: "url",
		compatibility: ["nodejs"],
		fn: escapeFn as any,
	},
	{
		name: "decodeURI",
		category: "url",
		compatibility: all,
		fn: decodeUri as any,
	},
	{
		name: "url_encode",
		category: "url",
		compatibility: all,
		fn: urlEncode as any,
	},
	{
		name: "url_decode",
		category: "url",
		compatibility: all,
		fn: urlDecode as any,
	},
	{
		name: "urlResolve",
		category: "url",
		compatibility: ["nodejs"],
		fn: urlResolve,
	},
	{
		name: "urlParse",
		category: "url",
		compatibility: ["nodejs"],
		fn: urlParse as any,
	},
	{
		name: "stripQuerystring",
		category: "url",
		compatibility: all,
		fn: stripQuerystring as any,
	},
	{
		name: "stripProtocol",
		category: "url",
		compatibility: ["nodejs"],
		fn: stripProtocol as any,
	},
];

export {
	encodeUri as encodeURI,
	escapeFn as escape,
	decodeUri as decodeURI,
	urlEncode,
	urlDecode,
	urlResolve,
	urlParse,
	stripQuerystring,
	stripProtocol,
};

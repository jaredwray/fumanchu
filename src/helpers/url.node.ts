// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import { escape as qsEscape } from "node:querystring";
import { format, parse, resolve } from "node:url";
import type { Helper } from "../helper-registry-base.js";

const escapeFn = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		return qsEscape(str);
	}
};

const urlResolve = (base: unknown, href: unknown): string =>
	resolve(String(base), String(href));

const urlParse = (str: unknown) => parse(String(str));

const stripProtocol = (str: unknown): string | undefined => {
	if (typeof str === "string") {
		const parsed = parse(str);
		parsed.protocol = "";
		return format(parsed);
	}
};

export const helpers: Helper[] = [
	{
		name: "escape",
		category: "url",
		compatibility: ["nodejs"],
		fn: escapeFn as any,
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
		name: "stripProtocol",
		category: "url",
		compatibility: ["nodejs"],
		fn: stripProtocol as any,
	},
];

export { escapeFn as escape, stripProtocol, urlParse, urlResolve };

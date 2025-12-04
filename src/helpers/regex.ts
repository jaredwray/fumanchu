// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import type { Helper } from "../helper-registry.js";
import { options } from "../utils.js";

const toRegex = (str: string, locals?: any, opts?: any): RegExp => {
	const mergedOpts = options({}, locals, opts);
	return new RegExp(str, mergedOpts.flags);
};

const test = (str: unknown, regex: RegExp): boolean => {
	if (typeof str !== "string") {
		return false;
	}
	if (!(regex instanceof RegExp)) {
		throw new TypeError("expected a regular expression");
	}
	return regex.test(str);
};

export const helpers: Helper[] = [
	{
		name: "toRegex",
		category: "regex",
		compatibility: ["browser", "nodejs"],
		fn: toRegex as any,
	},
	{
		name: "test",
		category: "regex",
		compatibility: ["browser", "nodejs"],
		fn: test as any,
	},
];

export { toRegex, test };

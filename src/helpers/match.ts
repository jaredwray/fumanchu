// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import micromatch, { type Options } from "micromatch";
import type { Helper } from "../helper-registry.js";

const match = (
	files: string | string[],
	patterns: string | string[] | RegExp,
	options?: Options,
): string[] => {
	const pats =
		typeof patterns === "string"
			? patterns.split(/, */)
			: (patterns as micromatch.Pattern | micromatch.Pattern[]);
	return micromatch(files, pats, options) as string[];
};

const isMatch = (
	filepath: string,
	pattern: string | string[] | RegExp,
	options?: Options,
): boolean => {
	return micromatch.isMatch(filepath, pattern as any, options);
};

const mm = (...args: Parameters<typeof match>): ReturnType<typeof match> => {
	console.log("the {{mm}} helper is depcrecated and will be removed");
	console.log("in handlebars-helpers v1.0.0, please use the {{match}}");
	console.log("helper instead.");
	return match(...args);
};

export const helpers: Helper[] = [
	{
		name: "match",
		category: "match",
		compatibility: ["browser", "nodejs"],
		fn: match as any,
	},
	{
		name: "isMatch",
		category: "match",
		compatibility: ["browser", "nodejs"],
		fn: isMatch as any,
	},
	{
		name: "mm",
		category: "match",
		compatibility: ["browser", "nodejs"],
		fn: mm as any,
	},
];

export { match, isMatch, mm };

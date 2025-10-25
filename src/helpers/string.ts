import type { Helper } from "../helper-registry.js";

const chop = (str: string): string =>
	str.trim().replace(/^[-_.\W\s]+|[-_.\W\s]+$/g, "");

const changecase = (str: string, fn: (ch: string) => string): string => {
	if (str.length === 1) return str.toLowerCase();
	const res = chop(str).toLowerCase();
	return res.replace(/[-_.\W\s]+(\w|$)/g, (_, ch) => fn(ch));
};

const append = (str: unknown, suffix: unknown): string | unknown => {
	if (typeof str === "string" && typeof suffix === "string") {
		return str + suffix;
	}
	return str as string;
};

const camelcase = (str: unknown): string =>
	typeof str === "string" ? changecase(str, (ch) => ch.toUpperCase()) : "";

const capitalize = (str: unknown): string => {
	if (typeof str !== "string" || str.length === 0) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeAll = (str: unknown): string => {
	if (typeof str !== "string") return "";
	return str.replace(/\w\S*/g, (word) => capitalize(word));
};

const center = (str: unknown, spaces: number): string => {
	if (typeof str !== "string") return "";
	let space = "";
	for (let i = 0; i < spaces; i++) {
		space += "&nbsp;";
	}
	return space + str + space;
};

const chopStr = (str: unknown): string =>
	typeof str === "string" ? chop(str) : "";

const dashcase = (str: unknown): string =>
	typeof str === "string" ? changecase(str, (ch) => `-${ch}`) : "";

const dotcase = (str: unknown): string =>
	typeof str === "string" ? changecase(str, (ch) => `.${ch}`) : "";

const truncate = (str: unknown, limit: number, suffix?: string): string => {
	if (typeof str === "string") {
		if (typeof suffix !== "string") {
			suffix = "";
		}
		if (str.length > limit) {
			return str.slice(0, limit - suffix.length) + suffix;
		}
		return str;
	}
	return "";
};

const ellipsis = (str: unknown, limit: number): string => {
	if (typeof str === "string") {
		if (str.length <= limit) {
			return str;
		}
		return `${truncate(str, limit)}…`;
	}
	return "";
};

const hyphenate = (str: unknown): string =>
	typeof str === "string" ? str.split(" ").join("-") : "";

const isString = (value: unknown): boolean => typeof value === "string";

const lowercase = (str: unknown): string => {
	if (
		typeof str === "object" &&
		str !== null &&
		"fn" in str &&
		typeof (str as { fn: () => unknown }).fn === "function"
	) {
		return String((str as { fn: () => unknown }).fn()).toLowerCase();
	}
	if (typeof str !== "string") return "";
	return str.toLowerCase();
};

const downcase = (...args: unknown[]): string => lowercase(...args);

const occurrences = (str: unknown, substring: string): number | string => {
	if (typeof str !== "string") return "";
	const len = substring.length;
	let pos = str.indexOf(substring, 0);
	let n = 0;
	while (pos > -1) {
		n++;
		pos = str.indexOf(substring, pos + len);
	}
	return n;
};

const pascalcase = (str: unknown): string => {
	if (typeof str !== "string") return "";
	const res = changecase(str, (ch) => ch.toUpperCase());
	return res.charAt(0).toUpperCase() + res.slice(1);
};

const pathcase = (str: unknown): string =>
	typeof str === "string" ? changecase(str, (ch) => `/${ch}`) : "";

const plusify = (str: unknown, ch?: string): string => {
	if (typeof str !== "string") return "";
	if (typeof ch !== "string") ch = " ";
	return str.split(ch).join("+");
};

const prepend = (str: unknown, prefix: unknown): string | unknown => {
	return typeof str === "string" && typeof prefix === "string"
		? prefix + str
		: (str as unknown);
};

const remove = (str: unknown, ch: unknown): string => {
	if (typeof str !== "string") return "";
	if (typeof ch !== "string") return str;
	return str.split(ch).join("");
};

const removeFirst = (str: unknown, ch: unknown): string => {
	if (typeof str !== "string") return "";
	if (typeof ch !== "string") return str;
	return str.replace(ch, "");
};

const replace = (str: unknown, a: unknown, b?: unknown): string => {
	if (typeof str !== "string") return "";
	if (typeof a !== "string") return str;
	if (typeof b !== "string") b = "";
	return str.split(a).join(b as string);
};

const replaceFirst = (str: unknown, a: unknown, b?: unknown): string => {
	if (typeof str !== "string") return "";
	if (typeof a !== "string") return str;
	if (typeof b !== "string") b = "";
	return str.replace(a, b as string);
};

const reverse = (str: unknown): string =>
	typeof str === "string" ? str.split("").reverse().join("") : "";

const sentence = (str: unknown): string => {
	if (typeof str !== "string") return "";
	return str.replace(
		/((?:\S[^.?!]*)[.?!]*)/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
	);
};

const snakecase = (str: unknown): string =>
	typeof str === "string" ? changecase(str, (ch) => `_${ch}`) : "";

const trim = (str: unknown): string =>
	typeof str === "string" ? str.trim() : "";

const trimLeft = (str: unknown): string =>
	typeof str === "string" ? str.replace(/^\s+/, "") : "";

const trimRight = (str: unknown): string =>
	typeof str === "string" ? str.replace(/\s+$/, "") : "";

const truncateWords = (
	str: unknown,
	count: unknown,
	suffix?: string,
): string => {
	if (
		typeof str === "string" &&
		typeof count === "number" &&
		Number.isFinite(count)
	) {
		/* c8 ignore next -- @preserve */
		if (typeof suffix !== "string") {
			suffix = "...";
		}
		const num = Math.trunc(count);
		let arr = str.split(" ");
		/* c8 ignore next -- @preserve */
		if (num < arr.length) {
			arr = arr.slice(0, num);
		}
		const val = arr.join(" ").trim();
		return val + suffix;
	}
	return "";
};

const truncateWordsAlias = truncateWords;

const uppercase = (str: unknown): string => {
	if (
		typeof str === "object" &&
		str !== null &&
		"fn" in str &&
		typeof (str as { fn: () => unknown }).fn === "function"
	) {
		return String((str as { fn: () => unknown }).fn()).toUpperCase();
	}
	if (typeof str !== "string") return "";
	return str.toUpperCase();
};

const upcase = (...args: unknown[]): string => uppercase(...args);

export const helpers: Helper[] = [
	{
		name: "append",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: append,
	},
	{
		name: "camelcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: camelcase,
	},
	{
		name: "capitalize",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: capitalize,
	},
	{
		name: "capitalizeAll",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: capitalizeAll,
	},
	{
		name: "center",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: center,
	},
	{
		name: "chop",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: chopStr,
	},
	{
		name: "dashcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: dashcase,
	},
	{
		name: "dotcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: dotcase,
	},
	{
		name: "ellipsis",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: ellipsis,
	},
	{
		name: "hyphenate",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: hyphenate,
	},
	{
		name: "isString",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: isString,
	},
	{
		name: "lowercase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: lowercase,
	},
	{
		name: "downcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: downcase,
	},
	{
		name: "occurrences",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: occurrences,
	},
	{
		name: "pascalcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: pascalcase,
	},
	{
		name: "pathcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: pathcase,
	},
	{
		name: "plusify",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: plusify,
	},
	{
		name: "prepend",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: prepend,
	},
	{
		name: "remove",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: remove,
	},
	{
		name: "removeFirst",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: removeFirst,
	},
	{
		name: "replace",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: replace,
	},
	{
		name: "replaceFirst",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: replaceFirst,
	},
	{
		name: "reverse",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: reverse,
	},
	{
		name: "sentence",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: sentence,
	},
	{
		name: "snakecase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: snakecase,
	},
	{
		name: "trim",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: trim,
	},
	{
		name: "trimLeft",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: trimLeft,
	},
	{
		name: "trimRight",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: trimRight,
	},
	{
		name: "truncate",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: truncate,
	},
	{
		name: "truncateWords",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: truncateWordsAlias,
	},
	{
		name: "uppercase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: uppercase,
	},
	{
		name: "upcase",
		category: "string",
		compatibility: ["browser", "nodejs"],
		fn: upcase,
	},
];

export {
	append,
	camelcase,
	capitalize,
	capitalizeAll,
	center,
	chopStr as chop,
	dashcase,
	dotcase,
	ellipsis,
	hyphenate,
	isString,
	lowercase,
	downcase,
	occurrences,
	pascalcase,
	pathcase,
	plusify,
	prepend,
	remove,
	removeFirst,
	replace,
	replaceFirst,
	reverse,
	sentence,
	snakecase,
	trim,
	trimLeft,
	trimRight,
	truncate,
	truncateWordsAlias as truncateWords,
	uppercase,
	upcase,
};

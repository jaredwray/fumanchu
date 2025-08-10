import type { Helper } from "../helper-registry.js";

const all = ["browser", "nodejs"] as const;

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
		if (typeof suffix !== "string") {
			suffix = "...";
		}
		const num = Math.trunc(count);
		let arr = str.split(" ");
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
	{ name: "append", category: "string", compatibility: all, fn: append },
	{ name: "camelcase", category: "string", compatibility: all, fn: camelcase },
	{
		name: "capitalize",
		category: "string",
		compatibility: all,
		fn: capitalize,
	},
	{
		name: "capitalizeAll",
		category: "string",
		compatibility: all,
		fn: capitalizeAll,
	},
	{ name: "center", category: "string", compatibility: all, fn: center },
	{ name: "chop", category: "string", compatibility: all, fn: chopStr },
	{ name: "dashcase", category: "string", compatibility: all, fn: dashcase },
	{ name: "dotcase", category: "string", compatibility: all, fn: dotcase },
	{ name: "ellipsis", category: "string", compatibility: all, fn: ellipsis },
	{ name: "hyphenate", category: "string", compatibility: all, fn: hyphenate },
	{ name: "isString", category: "string", compatibility: all, fn: isString },
	{ name: "lowercase", category: "string", compatibility: all, fn: lowercase },
	{ name: "downcase", category: "string", compatibility: all, fn: downcase },
	{
		name: "occurrences",
		category: "string",
		compatibility: all,
		fn: occurrences,
	},
	{
		name: "pascalcase",
		category: "string",
		compatibility: all,
		fn: pascalcase,
	},
	{ name: "pathcase", category: "string", compatibility: all, fn: pathcase },
	{ name: "plusify", category: "string", compatibility: all, fn: plusify },
	{ name: "prepend", category: "string", compatibility: all, fn: prepend },
	{ name: "remove", category: "string", compatibility: all, fn: remove },
	{
		name: "removeFirst",
		category: "string",
		compatibility: all,
		fn: removeFirst,
	},
	{ name: "replace", category: "string", compatibility: all, fn: replace },
	{
		name: "replaceFirst",
		category: "string",
		compatibility: all,
		fn: replaceFirst,
	},
	{ name: "reverse", category: "string", compatibility: all, fn: reverse },
	{ name: "sentence", category: "string", compatibility: all, fn: sentence },
	{ name: "snakecase", category: "string", compatibility: all, fn: snakecase },
	{ name: "trim", category: "string", compatibility: all, fn: trim },
	{ name: "trimLeft", category: "string", compatibility: all, fn: trimLeft },
	{ name: "trimRight", category: "string", compatibility: all, fn: trimRight },
	{ name: "truncate", category: "string", compatibility: all, fn: truncate },
	{
		name: "truncateWords",
		category: "string",
		compatibility: all,
		fn: truncateWordsAlias,
	},
	{ name: "uppercase", category: "string", compatibility: all, fn: uppercase },
	{ name: "upcase", category: "string", compatibility: all, fn: upcase },
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

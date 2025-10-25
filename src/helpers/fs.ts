// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import fs from "node:fs";
import path from "node:path";
import isGlob from "is-glob";
import micromatch from "micromatch";
import type { Helper } from "../helper-registry.js";

const fileSize = (value: unknown, precision?: unknown): string => {
	if (value == null) return "0 B";

	const number =
		typeof value === "number"
			? value
			: ((value as { length?: number }).length ?? 0);
	if (!number) return "0 B";

	const precisionNumber = typeof precision === "number" ? precision : 2;
	const abbr = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const factor = 10 ** precisionNumber;
	let i = abbr.length - 1;
	do {
		const size = 10 ** (i * 3);
		if (size <= number + 1) {
			const num = Math.round((number * factor) / size) / factor;
			return `${num} ${abbr[i]}`;
		}
		/* c8 ignore next */
	} while (--i >= 0);
	/* c8 ignore next -- @preserve */
	return `${number} B`;
};

const read = (filepath: string): string => {
	return fs.readFileSync(filepath, "utf8");
};

const isOptions = (value: unknown): boolean => {
	return Boolean(
		value &&
			typeof value === "object" &&
			"hash" in (value as Record<string, unknown>),
	);
};

type Filter = ((files: string[]) => string[]) | RegExp | string | undefined;

const readdir = (
	dir: string,
	filter?: Filter | Record<string, unknown>,
): string[] => {
	const files = fs.readdirSync(dir).map((fp) => path.join(dir, fp));
	const filterArg = isOptions(filter) ? undefined : (filter as Filter);

	if (typeof filterArg === "function") {
		return filterArg(files);
	}
	if (filterArg instanceof RegExp) {
		return files.filter((fp) => filterArg.test(fp));
	}
	if (typeof filterArg === "string") {
		if (isGlob(filterArg)) {
			return micromatch(files, filterArg);
		}
		if (filterArg === "isFile" || filterArg === "isDirectory") {
			return files.filter((fp) => {
				const stat = fs.statSync(fp);
				return filterArg === "isFile" ? stat.isFile() : stat.isDirectory();
			});
		}
	}
	return files;
};

export const helpers: Helper[] = [
	{
		name: "fileSize",
		category: "fs",
		compatibility: ["nodejs"],
		fn: fileSize as any,
	},
	{
		name: "read",
		category: "fs",
		compatibility: ["nodejs"],
		fn: read as any,
	},
	{
		name: "readdir",
		category: "fs",
		compatibility: ["nodejs"],
		fn: readdir as any,
	},
];

export { fileSize, read, readdir };

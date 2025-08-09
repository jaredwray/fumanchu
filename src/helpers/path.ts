// biome-ignore-all lint/suspicious/noExplicitAny: this is for handlebars
import path from "node:path";
import type { Helper } from "../helper-registry.js";

const expectedType = (
	variableName: string,
	expectedType: string,
	variableValue: unknown,
): string => {
	const actualType = Object.prototype.toString
		.call(variableValue)
		.slice(8, -1)
		.toLowerCase();
	return `Expected ${variableName} to be of type ${expectedType}, but got ${actualType}`;
};

const assertString = (name: string, value: unknown): string => {
	if (typeof value !== "string") {
		throw new TypeError(expectedType(name, "string", value));
	}
	return value;
};

type Options = { data?: { root?: { cwd?: string } } };

const absolute = function (
	this: { cwd?: string } | undefined,
	filepath: unknown,
	options?: Options,
): string {
	const fp = assertString("filepath", filepath);
	const cwd = options?.data?.root?.cwd ?? this?.cwd ?? process.cwd();
	return path.resolve(cwd, fp);
};

const dirname = (filepath: unknown): string => {
	const fp = assertString("filepath", filepath);
	return path.dirname(fp);
};

const relative = (a: unknown, b: unknown): string => {
	const from = assertString("first path", a);
	const to = assertString("second path", b);
	return path.relative(path.dirname(from), to);
};

const basename = (filepath: unknown): string => {
	const fp = assertString("filepath", filepath);
	return path.basename(fp);
};

const stem = (filepath: unknown): string => {
	const fp = assertString("filepath", filepath);
	return path.basename(fp, path.extname(fp));
};

const extname = (filepath: unknown): string => {
	const fp = assertString("filepath", filepath);
	return path.extname(fp);
};

const resolveFn = function (
	this: { cwd?: string } | undefined,
	filepath: unknown,
	...paths: unknown[]
): string {
	let options: Options | undefined;
	const last = paths[paths.length - 1];
	if (
		typeof last === "object" &&
		last &&
		"data" in (last as Record<string, unknown>)
	) {
		options = paths.pop() as Options;
	}
	const cwd = options?.data?.root?.cwd ?? this?.cwd ?? process.cwd();
	const all = [
		cwd,
		assertString("filepath", filepath),
		...paths.map((p, i) => assertString(`path${i}`, p)),
	];
	return path.resolve(...all);
};

const segments = (filepath: unknown, a: unknown, b: unknown): string => {
	const fp = assertString("filepath", filepath);
	const start = Number(a);
	const end = Number(b);
	const segmentsArr = fp.split(/[\\/]+/);
	return segmentsArr.slice(start, end).join("/");
};

export const helpers: Helper[] = [
	{ name: "absolute", category: "path", fn: absolute as any },
	{ name: "dirname", category: "path", fn: dirname as any },
	{ name: "relative", category: "path", fn: relative as any },
	{ name: "basename", category: "path", fn: basename as any },
	{ name: "stem", category: "path", fn: stem as any },
	{ name: "extname", category: "path", fn: extname as any },
	{ name: "resolve", category: "path", fn: resolveFn as any },
	{ name: "segments", category: "path", fn: segments as any },
];

export {
	absolute,
	dirname,
	relative,
	basename,
	stem,
	extname,
	resolveFn as resolve,
	segments,
};

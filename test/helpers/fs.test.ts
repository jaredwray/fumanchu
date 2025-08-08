import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/fs.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

const readFn = getHelper("read");
const readdirFn = getHelper("readdir");
const fileSizeFn = getHelper("fileSize");

const libDir = path.join("helpers", "lib");
const libFiles = fs.readdirSync(libDir).map((fp) => path.join(libDir, fp));

describe("fileSize", () => {
	it("formats numbers as bytes", () => {
		expect(fileSizeFn(13661855)).toBe("13.66 MB");
	});
	it("uses string length when not a number", () => {
		expect(fileSizeFn("foo")).toBe("3 B");
	});
	it("returns 0 B for empty values", () => {
		expect(fileSizeFn(undefined)).toBe("0 B");
		expect(fileSizeFn("")).toBe("0 B");
		expect(fileSizeFn({})).toBe("0 B");
	});
	it("respects precision argument", () => {
		expect(fileSizeFn(1396, 1)).toBe("1.4 kB");
	});
});

describe("read", () => {
	it("reads file contents", () => {
		const result = readFn("helpers/test/fixtures/read/a.txt");
		expect(result).toBe("abc");
	});
});

describe("readdir", () => {
	it("returns files in a directory", () => {
		expect(readdirFn(libDir)).toEqual(libFiles);
	});
	it("ignores options object", () => {
		expect(readdirFn(libDir, { hash: {} })).toEqual(libFiles);
	});
	it("filters with a custom function", () => {
		const fn = (arr: string[]) => arr.filter((fp) => fp.endsWith(".js"));
		expect(readdirFn(libDir, fn)).toEqual(
			libFiles.filter((fp) => fp.endsWith(".js")),
		);
	});
	it("filters with a regex", () => {
		expect(readdirFn(libDir, /\.js$/)).toEqual(
			libFiles.filter((fp) => fp.endsWith(".js")),
		);
	});
	it("filters with a glob", () => {
		expect(readdirFn(libDir, "helpers/lib/[a-d]*.js")).toEqual(
			libFiles.filter((fp) => /helpers\/lib\/[a-d].*\.js$/.test(fp)),
		);
	});
	it("filters by stat isFile", () => {
		expect(readdirFn(libDir, "isFile")).toEqual(
			libFiles.filter((fp) => fs.statSync(fp).isFile()),
		);
	});
	it("filters by stat isDirectory", () => {
		expect(readdirFn(libDir, "isDirectory")).toEqual(
			libFiles.filter((fp) => fs.statSync(fp).isDirectory()),
		);
	});
	it("returns all files for invalid filter", () => {
		expect(readdirFn(libDir, "foo")).toEqual(libFiles);
	});
});

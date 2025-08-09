import { describe, expect, it, vi } from "vitest";
import { helpers } from "../../src/helpers/match.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

const matchFn = getHelper("match");
const isMatchFn = getHelper("isMatch");
const mmFn = getHelper("mm");

describe("match", () => {
	it("filters files using a glob pattern string", () => {
		const files = ["a.js", "b.txt", "c.js"];
		expect(matchFn(files, "*.js")).toEqual(["a.js", "c.js"]);
	});
	it("accepts an array of patterns", () => {
		const files = ["a.js", "b.txt", "c.md"];
		expect(matchFn(files, ["*.js", "*.md"]).sort()).toEqual(["a.js", "c.md"]);
	});
	it("splits comma separated string patterns", () => {
		const files = ["a.js", "b.txt", "c.md"];
		expect(matchFn(files, "*.js, *.md").sort()).toEqual(["a.js", "c.md"]);
	});
	it("passes options to micromatch", () => {
		const files = [".a.js", "b.txt"];
		expect(matchFn(files, "*", { dot: true })).toEqual([".a.js", "b.txt"]);
	});
});

describe("isMatch", () => {
	it("returns true when pattern matches", () => {
		expect(isMatchFn("foo.js", "*.js")).toBe(true);
	});
	it("returns false when pattern does not match", () => {
		expect(isMatchFn("foo.js", "*.md")).toBe(false);
	});
});

describe("mm", () => {
	it("logs deprecation warning and delegates to match", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		const files = ["a.js", "b.txt"];
		expect(mmFn(files, "*.js")).toEqual(["a.js"]);
		expect(spy).toHaveBeenCalledTimes(3);
		spy.mockRestore();
	});
});

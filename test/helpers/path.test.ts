import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/path.js";

type HelperFn = (...args: unknown[]) => unknown;
const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("absolute", () => {
	const fn = getHelper("absolute");
	it("creates absolute paths", () => {
		expect(fn("a/b/c/package.json")).toBe(path.resolve("a/b/c/package.json"));
		expect(fn("a/b/c/docs/toc.md")).toBe(path.resolve("a/b/c/docs/toc.md"));
	});
	it("uses cwd from context", () => {
		const cwd = os.homedir();
		expect(fn.call({ cwd }, "a/b/c/package.json")).toBe(
			path.resolve(cwd, "a/b/c/package.json"),
		);
	});
	it("uses cwd from options", () => {
		const cwd = os.tmpdir();
		expect(fn("a/b", { data: { root: { cwd } } })).toBe(
			path.resolve(cwd, "a/b"),
		);
	});
	it("throws on invalid", () => {
		expect(() => fn(undefined as unknown as string)).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

describe("dirname", () => {
	const fn = getHelper("dirname");
	it("returns directory name", () => {
		expect(fn("a/b/c/package.json")).toBe("a/b/c");
		expect(fn("a/b/c/docs/toc.md")).toBe("a/b/c/docs");
	});
	it("throws on invalid", () => {
		expect(() => fn(undefined as unknown as string)).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

describe("relative", () => {
	const fn = getHelper("relative");
	it("returns relative path", () => {
		expect(fn("dist/docs.html", "index.html")).toBe(
			path.join("..", "index.html"),
		);
		expect(fn("examples/result/md/path.md", "examples/assets")).toBe(
			path.join("..", "..", "assets"),
		);
	});
	it("throws on invalid", () => {
		expect(() =>
			fn(undefined as unknown as string, undefined as unknown as string),
		).toThrow("Expected first path to be of type string, but got undefined");
		expect(() => fn("a", undefined as unknown as string)).toThrow(
			"Expected second path to be of type string, but got undefined",
		);
	});
});

describe("basename", () => {
	const fn = getHelper("basename");
	it("returns basename", () => {
		expect(fn("a/b/c/package.json")).toBe("package.json");
		expect(fn("a/b/c/CHANGELOG")).toBe("CHANGELOG");
	});
	it("throws on invalid", () => {
		expect(() => fn(undefined as unknown as string)).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

describe("stem", () => {
	const fn = getHelper("stem");
	it("returns stem", () => {
		expect(fn("a/b/c/package.json")).toBe("package");
		expect(fn("CHANGELOG")).toBe("CHANGELOG");
	});
	it("throws on invalid", () => {
		expect(() => fn(undefined as unknown as string)).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

describe("extname", () => {
	const fn = getHelper("extname");
	it("returns extension", () => {
		expect(fn("a/b/c/package.json")).toBe(".json");
		expect(fn("a/b/c/CHANGELOG")).toBe("");
	});
	it("throws on invalid", () => {
		expect(() => fn(undefined as unknown as string)).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

describe("resolve", () => {
	const fn = getHelper("resolve");
	it("resolves path", () => {
		expect(fn("..", "test")).toBe(path.resolve("..", "test"));
	});
	it("uses context cwd", () => {
		const cwd = "/tmp";
		expect(fn.call({ cwd }, "foo")).toBe(path.resolve(cwd, "foo"));
	});
	it("uses options cwd", () => {
		const cwd = os.tmpdir();
		expect(fn("foo", { data: { root: { cwd } } })).toBe(
			path.resolve(cwd, "foo"),
		);
	});
	it("throws on invalid", () => {
		expect(() => fn(undefined as unknown as string)).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

describe("segments", () => {
	const fn = getHelper("segments");
	it("returns segments", () => {
		expect(fn("a/b/c/e.js", 1, 3)).toBe("b/c");
		expect(fn("a/b/c/e.js", 0, 3)).toBe("a/b/c");
	});
	it("throws on invalid filepath", () => {
		expect(() => fn(undefined as unknown as string, "2", "3")).toThrow(
			"Expected filepath to be of type string, but got undefined",
		);
	});
});

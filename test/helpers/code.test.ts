import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/code.js";

type HelperFn = (...args: unknown[]) => unknown;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("embed", () => {
	const embedFn = getHelper("embed");
	it("embeds code and detects language from extension", () => {
		const result = embedFn("helpers/test/fixtures/simple.md");
		expect(result.startsWith("```markdown")).toBe(true);
		expect(result.endsWith("```\n")).toBe(true);
	});
	it("escapes backticks in markdown", () => {
		const result = embedFn("helpers/test/fixtures/embedded.md");
		expect(result.includes("&#x60&#x60&#x60js")).toBe(true);
	});
	it("uses provided language", () => {
		const result = embedFn("helpers/test/fixtures/index.html", "hbs");
		expect(result.startsWith("```hbs")).toBe(true);
	});
});

describe("gist", () => {
	const gistFn = getHelper("gist");
	it("returns a gist script tag", () => {
		expect(gistFn("abcdefg")).toBe(
			'<script src="https://gist.github.com/abcdefg.js"></script>',
		);
	});
});

describe("jsfiddle", () => {
	const jsfiddleFn = getHelper("jsfiddle");
	it("returns a jsfiddle embed link, with default tabs", () => {
		expect(jsfiddleFn({ id: "UXbas" })).toBe(
			'<iframe width="100%" height="300" src="http://jsfiddle.net/UXbas/embedded/result,js,html,css/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>',
		);
	});
	it("throws if id is missing", () => {
		expect(() => jsfiddleFn({})).toThrow();
	});
	it("returns a jsfiddle embed link, with custom tabs assigned", () => {
		expect(jsfiddleFn({ id: "UXbas", tabs: "html,css" })).toBe(
			'<iframe width="100%" height="300" src="http://jsfiddle.net/UXbas/embedded/html,css/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>',
		);
	});
});

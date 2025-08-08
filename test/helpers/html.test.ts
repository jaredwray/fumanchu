// biome-ignore-all lint/suspicious/noExplicitAny: tests can use any types
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/html.js";

type HelperFn = (...args: any[]) => any;

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("attr", () => {
	const attrFn = getHelper("attr");
	it("stringifies hash attributes", () => {
		expect(attrFn({ hash: { class: "btn" } })).toBe(' class="btn"');
		expect(attrFn({ hash: {} })).toBe("");
	});
	it("handles undefined options", () => {
		expect(attrFn()).toBe("");
	});
});

describe("css", () => {
	const cssFn = getHelper("css");
	it("returns empty string when no styles", () => {
		expect(cssFn.call({})).toBe("");
	});
	it("handles undefined list with options", () => {
		expect(cssFn.call({}, undefined, { hash: {} })).toBe("");
	});
	it("uses a path passed as string", () => {
		expect(cssFn.call({}, "abc.css", { hash: {} })).toBe(
			'<link type="text/css" rel="stylesheet" href="abc.css">',
		);
	});
	it("uses options.assets", () => {
		expect(
			cssFn.call({ options: { assets: "foo" } }, "abc.css", { hash: {} }),
		).toBe('<link type="text/css" rel="stylesheet" href="foo/abc.css">');
	});
	it("falls back when assets option missing", () => {
		expect(cssFn.call({ options: {} }, "abc.css", { hash: {} })).toBe(
			'<link type="text/css" rel="stylesheet" href="abc.css">',
		);
	});
	it("uses the href attribute", () => {
		expect(cssFn.call({}, { hash: { href: "abc.css" } })).toBe(
			'<link type="text/css" rel="stylesheet" href="abc.css">',
		);
	});
	it("creates multiple tags", () => {
		expect(cssFn.call({}, ["a.css", "bcss", "c.css"], { hash: {} })).toBe(
			[
				'<link type="text/css" rel="stylesheet" href="a.css">',
				'<link type="text/css" rel="stylesheet" href="bcss">',
				'<link type="text/css" rel="stylesheet" href="c.css">',
			].join("\n"),
		);
	});
	it("creates a less tag", () => {
		expect(cssFn.call({}, ["a.less"], { hash: {} })).toBe(
			'<link type="text/css" rel="stylesheet/less" href="a.less">',
		);
	});
});

describe("js", () => {
	const jsFn = getHelper("js");
	it("creates an empty script tag", () => {
		expect(jsFn({ hash: {} })).toBe("<script></script>");
	});
	it("handles object without hash", () => {
		expect(jsFn({})).toBe("<script></script>");
	});
	it("uses a path passed as string", () => {
		expect(jsFn("abc.js")).toBe('<script src="abc.js"></script>');
	});
	it("uses the src attribute", () => {
		expect(jsFn({ hash: { src: "abc.js" } })).toBe(
			'<script src="abc.js"></script>',
		);
	});
	it("creates multiple tags", () => {
		expect(jsFn(["a.js", "bjs", "c.js"])).toBe(
			[
				'<script src="a.js"></script>',
				'<script src="bjs"></script>',
				'<script src="c.js"></script>',
			].join("\n"),
		);
	});
	it("creates a coffeescript tag", () => {
		expect(jsFn(["a.coffee"])).toBe(
			'<script type="text/coffeescript" src="a.coffee"></script>',
		);
	});
});

describe("sanitize", () => {
	const sanitizeFn = getHelper("sanitize");
	it("returns empty string for undefined", () => {
		expect(sanitizeFn()).toBe("");
	});
	it("strips html from a string", () => {
		expect(sanitizeFn("<span>foo</span>")).toBe("foo");
	});
});

describe("ul", () => {
	const ulFn = getHelper("ul");
	const data = [
		{ aaa: "AAA", bbb: "BBB" },
		{ aaa: "CCC", bbb: "DDD" },
	];
	it("creates an unordered list", () => {
		const result = ulFn(data, {
			hash: { class: "names" },
			fn: (item: any) => `${item.aaa} ${item.bbb}`,
		});
		expect(result).toBe(
			'<ul class="names"><li>AAA BBB</li>\n<li>CCC DDD</li></ul>',
		);
	});
	it("handles string items without attributes", () => {
		const result = ulFn(["A", "B"], { fn: (i: any) => i });
		expect(result).toBe("<ul><li>A</li>\n<li>B</li></ul>");
	});
});

describe("ol", () => {
	const olFn = getHelper("ol");
	const data = [
		{ aaa: "AAA", bbb: "BBB" },
		{ aaa: "CCC", bbb: "DDD" },
	];
	it("creates an ordered list", () => {
		const result = olFn(data, {
			hash: { class: "names" },
			fn: (item: any) => `${item.aaa} ${item.bbb}`,
		});
		expect(result).toBe(
			'<ol class="names"><li>AAA BBB</li>\n<li>CCC DDD</li></ol>',
		);
	});
	it("handles string items without attributes", () => {
		const result = olFn(["A", "B"], { fn: (i: any) => i });
		expect(result).toBe("<ol><li>A</li>\n<li>B</li></ol>");
	});
});

describe("thumbnailImage", () => {
	const thumbnailFn = getHelper("thumbnailImage");
	it("returns figure with link and caption", () => {
		const context = {
			id: "id",
			alt: "Picture of a placeholder",
			thumbnail: "http://placehold.it/200x200/0eafff/ffffff.png",
			size: { width: 200, height: 200 },
			full: "http://placehold.it/600x400/0eafff/ffffff.png",
			classes: {
				figure: ["test"],
				image: ["test"],
				link: ["test"],
			},
			caption: "My new caption!",
		};
		const comparison = [
			'<figure id="image-id" class="test">',
			'<a href="http://placehold.it/600x400/0eafff/ffffff.png" rel="thumbnail" class="test">',
			'<img alt="Picture of a placeholder" src="http://placehold.it/200x200/0eafff/ffffff.png" width="200" height="200" class="test">',
			"</a>",
			"<figcaption>My new caption!</figcaption>",
			"</figure>",
		].join("\n");
		expect(thumbnailFn(context)).toBe(comparison);
	});
	it("returns figure without link", () => {
		const context = {
			id: "id",
			alt: "Picture of a placeholder",
			thumbnail: "http://placehold.it/200x200/0eafff/ffffff.png",
			size: { width: 200, height: 200 },
			caption: "My new caption!",
		};
		const comparison = [
			'<figure id="image-id">',
			'<img alt="Picture of a placeholder" src="http://placehold.it/200x200/0eafff/ffffff.png" width="200" height="200">',
			"<figcaption>My new caption!</figcaption>",
			"</figure>",
		].join("\n");
		expect(thumbnailFn(context)).toBe(comparison);
	});
});

// biome-ignore-all lint/suspicious/noExplicitAny: tests can use any types
import { describe, expect, it } from "vitest";
import { helpers as browserHelpers, tag } from "../../src/helpers/html.js";
import { helpers as nodeHelpers } from "../../src/helpers/html.node.js";

type HelperFn = (...args: any[]) => any;

const helpers = [...browserHelpers, ...nodeHelpers];

const getHelper = (name: string): HelperFn => {
	const helper = helpers.find((h) => h.name === name);
	if (!helper) throw new Error(`Helper ${name} not found`);
	return helper.fn as HelperFn;
};

describe("tag", () => {
	it("renders a non-void element with string attributes", () => {
		expect(tag("script", { src: "abc.js" })).toBe(
			'<script src="abc.js"></script>',
		);
	});
	it("renders a boolean true attribute as a bare attribute", () => {
		expect(tag("script", { defer: true, src: "x.js" })).toBe(
			'<script defer src="x.js"></script>',
		);
	});
	it("serializes numeric attribute values", () => {
		expect(tag("iframe", { width: 100, height: 50 })).toBe(
			'<iframe width="100" height="50"></iframe>',
		);
	});
	it("skips attributes whose value is false or null", () => {
		expect(
			tag("script", { foo: false as any, bar: null as any, baz: undefined }),
		).toBe("<script></script>");
	});
	it("renders a void element without a closing tag", () => {
		expect(tag("br")).toBe("<br>");
		expect(tag("img", { src: "a.png" })).toBe('<img src="a.png">');
	});
	it("ignores text content for void elements", () => {
		expect(tag("br", {}, "ignored")).toBe("<br>");
	});
	it("treats void-element matching as case-insensitive", () => {
		expect(tag("IMG", { src: "a.png" })).toBe('<IMG src="a.png">');
	});
	it("escapes HTML-special characters in attribute values", () => {
		expect(tag("a", { href: '"><script>alert(1)</script>' })).toBe(
			'<a href="&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;"></a>',
		);
		expect(tag("a", { href: "?a=1&b=2" })).toBe('<a href="?a=1&amp;b=2"></a>');
	});
	it("escapes HTML-special characters in text content", () => {
		expect(tag("p", {}, "<script>alert(1)</script> & more")).toBe(
			"<p>&lt;script&gt;alert(1)&lt;/script&gt; &amp; more</p>",
		);
	});
	it("ignores inherited prototype properties on attribs", () => {
		const proto = { injected: "yes" };
		const attribs = Object.create(proto);
		attribs.src = "x.js";
		expect(tag("script", attribs)).toBe('<script src="x.js"></script>');
	});
});

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
	it("strips tags with attributes", () => {
		expect(sanitizeFn('<a href="http://x.com" title="hi">foo</a>')).toBe("foo");
	});
	it("handles > inside double-quoted attribute values", () => {
		expect(sanitizeFn('<a title="1>2">foo</a>')).toBe("foo");
	});
	it("handles > inside single-quoted attribute values", () => {
		expect(sanitizeFn("<a title='1>2'>foo</a>")).toBe("foo");
	});
	it("ignores unterminated quotes until tag closes", () => {
		expect(sanitizeFn('<a title="x>bar')).toBe("");
	});
	it("strips html comments", () => {
		expect(sanitizeFn("foo<!-- secret -->bar")).toBe("foobar");
	});
	it("handles unterminated comments", () => {
		expect(sanitizeFn("foo<!-- never ends")).toBe("foo");
	});
	it("preserves text between tags", () => {
		expect(sanitizeFn("<b>hi</b> <i>there</i>")).toBe("hi there");
	});
	it("preserves inequality characters in text", () => {
		expect(sanitizeFn("Use 1 < 2 and 3 > 2")).toBe("Use 1 < 2 and 3 > 2");
	});
	it("preserves < when followed by non-tag characters", () => {
		expect(sanitizeFn("a<5")).toBe("a<5");
	});
	it("preserves a trailing <", () => {
		expect(sanitizeFn("foo<")).toBe("foo<");
	});
	it("preserves text content inside script tags", () => {
		expect(sanitizeFn("<script>if (a < b)</script>")).toBe("if (a < b)");
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

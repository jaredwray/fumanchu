import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Handlebars from "handlebars";
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/md.js";

describe("md helper", () => {
	it('should have an "md" helper with the correct properties', () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		expect(mdHelper).toBeDefined();
		expect(mdHelper?.category).toBe("markdown");
		expect(typeof mdHelper?.fn).toBe("function");
	});

	it('should have a "markdown" helper with the correct properties', () => {
		const markdownHelper = helpers.find((helper) => helper.name === "markdown");
		expect(markdownHelper).toBeDefined();
		expect(markdownHelper?.category).toBe("markdown");
		expect(typeof markdownHelper?.fn).toBe("function");
	});

	it("should render markdown string to HTML", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn("# Title") as Handlebars.SafeString;
		expect(result.toHTML()).toBe("<h1>Title</h1>\n");
	});

	it("should render markdown from a file path", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const temporaryDir = fs.mkdtempSync(path.join(os.tmpdir(), "mdtest-"));
		const file = path.join(temporaryDir, "sample.md");
		fs.writeFileSync(file, "# File");
		const result = mdHelper?.fn(file) as Handlebars.SafeString;
		expect(result.toHTML()).toBe("<h1>File</h1>\n");
		fs.rmSync(temporaryDir, { recursive: true, force: true });
	});

	it("should decode HTML entities", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn("&amp;") as Handlebars.SafeString;
		expect(result.toHTML()).toBe("<p>&</p>\n");
	});

	it("should handle undefined input", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn(undefined) as Handlebars.SafeString;
		expect(result.toHTML()).toBe("");
	});

	it("should handle null input", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn(null) as Handlebars.SafeString;
		expect(result.toHTML()).toBe("");
	});

	it("should handle number input", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn(123) as Handlebars.SafeString;
		expect(result.toHTML()).toBe("");
	});

	it("should handle boolean input", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn(true) as Handlebars.SafeString;
		expect(result.toHTML()).toBe("");
	});

	it("should work as a block helper with {{#markdown}}", () => {
		const markdownHelper = helpers.find((helper) => helper.name === "markdown");
		const options = {
			fn: () => "# Block Title\n\nThis is **bold** text",
		};
		const result = markdownHelper?.fn.call(
			{},
			options,
		) as Handlebars.SafeString;
		expect(result.toHTML()).toContain("<h1>Block Title</h1>");
		expect(result.toHTML()).toContain("<strong>bold</strong>");
	});

	it("should work as a block helper with {{#md}}", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const options = {
			fn: () => "## Heading 2\n\n- Item 1\n- Item 2",
		};
		const result = mdHelper?.fn.call({}, options) as Handlebars.SafeString;
		expect(result.toHTML()).toContain("<h2>Heading 2</h2>");
		expect(result.toHTML()).toContain("<li>Item 1</li>");
		expect(result.toHTML()).toContain("<li>Item 2</li>");
	});

	it("should work with context in block helper", () => {
		const markdownHelper = helpers.find((helper) => helper.name === "markdown");
		const context = { title: "Dynamic Title", content: "Dynamic content" };
		const options = {
			fn: (ctx: typeof context) => `# ${ctx.title}\n\n${ctx.content}`,
		};
		const result = markdownHelper?.fn.call(
			context,
			options,
		) as Handlebars.SafeString;
		expect(result.toHTML()).toContain("<h1>Dynamic Title</h1>");
		expect(result.toHTML()).toContain("<p>Dynamic content</p>");
	});

	it("should work with Handlebars compilation as block helper", () => {
		const handlebars = Handlebars.create();
		const markdownHelper = helpers.find((helper) => helper.name === "markdown");
		if (markdownHelper) {
			handlebars.registerHelper("markdown", markdownHelper.fn);
		}

		const template = handlebars.compile(
			"{{#markdown}}## {{title}}{{/markdown}}",
		);
		const result = template({ title: "Test Title" });
		expect(result).toContain("<h2>Test Title</h2>");
	});

	it("should work with nested content in block helper", () => {
		const handlebars = Handlebars.create();
		const markdownHelper = helpers.find((helper) => helper.name === "markdown");
		if (markdownHelper) {
			handlebars.registerHelper("markdown", markdownHelper.fn);
		}

		const template = handlebars.compile(
			"{{#markdown}}# {{release.title}}\n\n{{release.body}}{{/markdown}}",
		);
		const result = template({
			release: {
				title: "Release v1.0.0",
				body: "This is the **first** release with:\n- Feature 1\n- Feature 2",
			},
		});
		expect(result).toContain("<h1>Release v1.0.0</h1>");
		expect(result).toContain("<strong>first</strong>");
		expect(result).toContain("<li>Feature 1</li>");
	});
});

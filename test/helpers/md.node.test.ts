import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type Handlebars from "handlebars";
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/md.node.js";

describe("md.node helper", () => {
	it("should render markdown from a file path", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const temporaryDir = fs.mkdtempSync(path.join(os.tmpdir(), "mdtest-"));
		const file = path.join(temporaryDir, "sample.md");
		fs.writeFileSync(file, "# File");
		const result = mdHelper?.fn(file) as Handlebars.SafeString;
		expect(result.toHTML()).toBe("<h1>File</h1>\n");
		fs.rmSync(temporaryDir, { recursive: true, force: true });
	});

	it("should render inline markdown when input is not a file path", () => {
		const mdHelper = helpers.find((helper) => helper.name === "md");
		const result = mdHelper?.fn("# Title") as Handlebars.SafeString;
		expect(result.toHTML()).toBe("<h1>Title</h1>\n");
	});
});

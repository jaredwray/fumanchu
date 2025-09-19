import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import ent from "ent";
import Handlebars from "handlebars";
import { Remarkable } from "remarkable";
import type { Helper } from "../helper-registry.js";

type MarkdownOptions = {
	fn?: (context: unknown) => string;
	inverse?: (context: unknown) => string;
	hash?: Record<string, unknown>;
	cwd?: string;
};

const renderMarkdown = function (
	this: unknown,
	input?: string | MarkdownOptions,
	options?: MarkdownOptions,
): Handlebars.SafeString {
	// Handle block helper usage: {{#markdown}}content{{/markdown}}
	if (
		typeof input === "object" &&
		input &&
		"fn" in input &&
		typeof input.fn === "function"
	) {
		options = input as MarkdownOptions;
		input = input.fn(this);
	}
	// Handle regular helper usage: {{markdown "content"}}
	else if (typeof input !== "string") {
		input = "";
	}

	const options_ = { cwd: process.cwd(), ...options };
	const md = new Remarkable({
		breaks: true,
		html: true,
		langPrefix: "lang-",
		typographer: false,
		xhtmlOut: false,
	});

	let string_ = input as string;
	// Only check for file existence if input is non-empty
	if (string_ && string_.length > 0) {
		const filepath = path.resolve(options_.cwd, string_);
		if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
			string_ = fs.readFileSync(filepath, "utf8");
		}
	}

	return new Handlebars.SafeString(ent.decode(md.render(string_)));
};

export const helpers: Helper[] = [
	{
		name: "md",
		category: "markdown",
		compatibility: ["nodejs"],
		fn: renderMarkdown as Helper["fn"],
	},
	{
		name: "markdown",
		category: "markdown",
		compatibility: ["nodejs"],
		fn: renderMarkdown as Helper["fn"],
	},
];

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type Handlebars from "handlebars";
import type { Helper } from "../helper-registry-base.js";
import { renderString } from "./md.js";

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
	if (
		typeof input === "object" &&
		input &&
		"fn" in input &&
		typeof input.fn === "function"
	) {
		options = input as MarkdownOptions;
		input = input.fn(this);
	} else if (typeof input !== "string") {
		input = "";
	}

	const options_ = { cwd: process.cwd(), ...options };
	let string_ = input as string;
	if (string_.length > 0) {
		const filepath = path.resolve(options_.cwd, string_);
		if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
			string_ = fs.readFileSync(filepath, "utf8");
		}
	}

	return renderString(string_);
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

import type Handlebars from "handlebars";
import type { Helper } from "../helper-registry-base.js";
import { renderString } from "./md.js";

type MarkdownOptions = {
	fn?: (context: unknown) => string;
	inverse?: (context: unknown) => string;
	hash?: Record<string, unknown>;
};

const renderMarkdown = function (
	this: unknown,
	input?: string | MarkdownOptions,
): Handlebars.SafeString {
	if (
		typeof input === "object" &&
		input &&
		"fn" in input &&
		typeof input.fn === "function"
	) {
		input = input.fn(this);
	} else if (typeof input !== "string") {
		input = "";
	}

	return renderString(input as string);
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

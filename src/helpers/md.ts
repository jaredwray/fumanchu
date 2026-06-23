import Handlebars from "handlebars";
import MarkdownIt from "markdown-it";
import type { Helper } from "../helper-registry-base.js";

type MarkdownOptions = {
	fn?: (context: unknown) => string;
	inverse?: (context: unknown) => string;
	hash?: Record<string, unknown>;
};

export const md = new MarkdownIt({
	breaks: true,
	html: true,
	langPrefix: "lang-",
	typographer: false,
	xhtmlOut: false,
});

export function renderString(input: string): Handlebars.SafeString {
	return new Handlebars.SafeString(md.render(input));
}

const renderMarkdown = function (
	this: unknown,
	input?: string | MarkdownOptions,
	_options?: MarkdownOptions,
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
		compatibility: ["browser", "nodejs"],
		fn: renderMarkdown as Helper["fn"],
	},
	{
		name: "markdown",
		category: "markdown",
		compatibility: ["browser", "nodejs"],
		fn: renderMarkdown as Helper["fn"],
	},
];

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Handlebars from "handlebars";
import { Remarkable } from "remarkable";
import type { Helper } from "../helper-registry.js";

const renderMarkdown = (
	input: string,
	options: { cwd?: string } = {},
): Handlebars.SafeString => {
	const options_ = { cwd: process.cwd(), ...options };
	const md = new Remarkable({
		breaks: true,
		html: true,
		langPrefix: "lang-",
		typographer: false,
		xhtmlOut: false,
	});

	const filepath = path.resolve(options_.cwd, input);
	let string_ = input;
	if (fs.existsSync(filepath)) {
		string_ = fs.readFileSync(filepath, "utf8");
	}

	return new Handlebars.SafeString(md.render(string_));
};

export const helpers: Helper[] = [
	{
		name: "md",
		category: "markdown",
		fn: renderMarkdown,
	},
];

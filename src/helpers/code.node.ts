import fs from "node:fs";
import path from "node:path";
import type { Helper } from "../helper-registry-base.js";

const codeBlock = (code: string, lang: string): string => {
	return `\`\`\`${lang}\n${code}\n\`\`\`\n`;
};

const embed = (filepath: string, language?: string): string => {
	let ext =
		typeof language === "string" ? language : path.extname(filepath).slice(1);
	let code = fs.readFileSync(filepath, "utf8");
	if (ext === "markdown" || ext === "md") {
		ext = "markdown";
		code = code.split("`").join("&#x60");
	}
	return `${codeBlock(code, ext).trim()}\n`;
};

export const helpers: Helper[] = [
	{
		name: "embed",
		category: "code",
		compatibility: ["nodejs"],
		fn: embed,
	},
];

export { embed };

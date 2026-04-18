import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_MJS = resolve(__dirname, "../dist/browser.mjs");
const DIST_CJS = resolve(__dirname, "../dist/browser.cjs");

const NODE_ONLY_HELPERS = [
	"read",
	"readdir",
	"fileSize",
	"absolute",
	"dirname",
	"relative",
	"basename",
	"stem",
	"extname",
	"segments",
	"log",
	"ok",
	"success",
	"info",
	"warning",
	"warn",
	"_debug",
	"_inspect",
	"markdown",
	"urlParse",
	"urlResolve",
	"stripProtocol",
];

describe.skipIf(!existsSync(DIST_MJS))("dist/browser.* purity", () => {
	it("dist/browser.mjs has no node: specifiers", () => {
		const src = readFileSync(DIST_MJS, "utf8");
		expect(src).not.toMatch(/from\s+["']node:[^"']+["']/);
		expect(src).not.toMatch(/import\(\s*["']node:[^"']+["']/);
	});

	it("dist/browser.cjs has no node: specifiers", () => {
		const src = readFileSync(DIST_CJS, "utf8");
		expect(src).not.toMatch(/require\(\s*["']node:[^"']+["']/);
		expect(src).not.toMatch(/from\s+["']node:[^"']+["']/);
	});

	it("dist/browser.mjs registers no Node-only helpers", () => {
		const src = readFileSync(DIST_MJS, "utf8");
		for (const name of NODE_ONLY_HELPERS) {
			const regex = new RegExp(`name:\\s*["']${name}["']`);
			expect(src, `${name} should not be registered`).not.toMatch(regex);
		}
	});
});

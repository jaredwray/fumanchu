import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: { index: "./src/index.ts" },
		format: ["esm", "cjs"],
		dts: true,
		outDir: "./dist",
		platform: "node",
		fixedExtension: true,
	},
	{
		entry: { browser: "./src/browser.ts" },
		format: ["esm", "cjs"],
		dts: true,
		outDir: "./dist",
		platform: "browser",
		fixedExtension: true,
		minify: true,
	},
]);

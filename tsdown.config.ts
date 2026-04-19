import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: { "index.node": "./src/index.node.ts" },
		format: ["esm", "cjs"],
		dts: true,
		outDir: "./dist",
		platform: "node",
		fixedExtension: true,
	},
	{
		entry: { "index.browser": "./src/index.browser.ts" },
		format: ["esm", "cjs"],
		dts: true,
		outDir: "./dist",
		platform: "browser",
		fixedExtension: true,
		minify: true,
	},
]);

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			reporter: ["lcov", "text"],
			exclude: [
				"**/node_modules/**",
				"vitest.config.ts",
				"site/**",
				"dist/**",
				"dist-site/**",
				"test/**",
			],
		},
		projects: [
			{
				extends: true,
				test: {
					name: "node",
					environment: "node",
					include: ["test/**/*.test.ts"],
					exclude: ["test/browser/**"],
				},
			},
			{
				extends: true,
				test: {
					name: "browser",
					environment: "happy-dom",
					include: ["test/browser/**/*.test.ts"],
				},
			},
		],
	},
});

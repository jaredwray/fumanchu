import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			reporter: ['lcov', 'text'],
			exclude: [
				'**/node_modules/**',
				'vitest.config.ts',
				'site/**',
				'dist/**',
				'dist-site/**',
				'test/**',
			],
		},
	},
});

import {defineConfig} from 'vitest/config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
	test: {
		coverage: {
			reporter: ['lcov', 'text'],
			exclude: [
				'**/node_modules/**',
				'helpers/**',
				'vitest.config.ts',
				'site/**',
				'dist/**',
				'dist-site/**',
				'test/**',
			],
		},
	},
});

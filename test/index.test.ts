import {describe, test, expect} from 'vitest';
import {
	helpers, handlebars, createHandlebars, fumanchu,
} from '../src/index.js';

describe('fumanchu', () => {
	test('should have helpers', () => {
		expect(helpers).toBeDefined();
	});

	test('should have handlebars', () => {
		expect(handlebars).toBeDefined();
	});

	test('should be able to createHandlebars', async () => {
		const handlebars = await createHandlebars();
		expect(handlebars).toBeDefined();
	});

	test('should be able to run fumanchu()', () => {
		const handlebars = fumanchu();
		expect(handlebars).toBeDefined();
	});
});

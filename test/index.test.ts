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
		const result = handlebars.compile('{{year}}');
		expect(result({})).toBe('');
	});

	test('should be able to createHandlebars', async () => {
		const handlebars = await createHandlebars();
		expect(handlebars).toBeDefined();
		const result = handlebars.compile('{{year}}');
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test('should be able to createHandlebars', async () => {
		const handlebars = await createHandlebars();
		expect(handlebars).toBeDefined();
		const year = new Date().getFullYear();
		const name = 'Fumanchu';
		const result = handlebars.compile('this is an amazing {{year}} for {{name}}');

		expect(result({name, year})).toBe(`this is an amazing ${year} for ${name}`);
	});

	test('should be able to run fumanchu()', () => {
		const handlebars = fumanchu();
		expect(handlebars).toBeDefined();
		const result = handlebars.compile('{{year}}');
		expect(result({})).toBe(new Date().getFullYear().toString());
	});

	test('should be able to set helpers', async () => {
		helpers({handlebars});
		const result = handlebars.compile('{{year}}');
		expect(result({})).toBe(new Date().getFullYear().toString());
	});
});

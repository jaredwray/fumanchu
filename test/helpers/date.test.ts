import {describe, it, expect} from 'vitest';
import {helpers} from '../../src/helpers/date.js';

describe('helpers', () => {
	it('should have a "year" helper with the correct properties', () => {
		// Find the 'year' helper in the array
		const yearHelper = helpers.find(helper => helper.name === 'year');

		// Assert the helper is defined
		expect(yearHelper).toBeDefined();

		// Assert the helper has the correct properties
		expect(yearHelper?.name).toBe('year');
		expect(yearHelper?.category).toBe('date');
		expect(typeof yearHelper?.fn).toBe('function');
	});

	it('should return the current year as a string when the "year" helper function is invoked', () => {
		// Find the 'year' helper
		const yearHelper = helpers.find(helper => helper.name === 'year');
		expect(yearHelper).toBeDefined();

		// Invoke the function
		const currentYear = new Date().getFullYear().toString();
		expect(yearHelper?.fn()).toBe(currentYear);
	});
});

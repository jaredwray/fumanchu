import {describe, it, expect} from 'vitest';
import dayjs from 'dayjs';
import {parseDate} from 'chrono-node';
import {helpers} from '../../src/helpers/date.js';

describe('year', () => {
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

describe('date', () => {
	it('should correctly calculate and format "5 years ago"', () => {
		const dateHelper = helpers.find(helper => helper.name === 'date');
		expect(dateHelper).toBeDefined();

		const formattedDate = dateHelper?.fn('5 years ago', 'YYYY');
		const expectedDate = dayjs().subtract(5, 'years').format('YYYY');
		expect(formattedDate).toBe(expectedDate);
	});

	it('should correctly calculate and format "next Friday"', () => {
		const dateHelper = helpers.find(helper => helper.name === 'date');
		expect(dateHelper).toBeDefined();

		const formattedDate = dateHelper?.fn('next Friday', 'MM/DD/YYYY');
		const expectedDate = dayjs(parseDate('next Friday')).format('MM/DD/YYYY');
		expect(formattedDate).toBe(expectedDate);
	});

	it('should throw an error for an invalid date format', () => {
		const dateHelper = helpers.find(helper => helper.name === 'date');
		expect(dateHelper).toBeDefined();

		expect(() => dateHelper?.fn('invalid date', 'YYYY')).toThrowError(
			'Unable to parse date: invalid date',
		);
	});
});

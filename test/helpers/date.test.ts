import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { helpers } from "../../src/helpers/date.js";

describe("year", () => {
	it('should have a "year" helper with the correct properties', () => {
		// Find the 'year' helper in the array
		const yearHelper = helpers.find((helper) => helper.name === "year");

		// Assert the helper is defined
		expect(yearHelper).toBeDefined();

		// Assert the helper has the correct properties
		expect(yearHelper?.name).toBe("year");
		expect(yearHelper?.category).toBe("date");
		expect(typeof yearHelper?.fn).toBe("function");
	});

	it('should return the current year as a string when the "year" helper function is invoked', () => {
		// Find the 'year' helper
		const yearHelper = helpers.find((helper) => helper.name === "year");
		expect(yearHelper).toBeDefined();

		// Invoke the function
		const currentYear = new Date().getFullYear().toString();
		expect(yearHelper?.fn()).toBe(currentYear);
	});
});

describe("date", () => {
	it('should correctly calculate and format "5 years ago"', () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const formattedDate = dateHelper?.fn("5 years ago", "YYYY");
		const expectedDate = dayjs().subtract(5, "years").format("YYYY") as string;
		expect(formattedDate).toBe(expectedDate);
	});

	it('should correctly calculate and format "next Friday"', () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const formattedDate = dateHelper?.fn("next Friday", "MM/DD/YYYY");
		const expectedDate = dayjs(parseDate("next Friday")).format(
			"MM/DD/YYYY",
		) as string;
		expect(formattedDate).toBe(expectedDate);
	});

	it("should throw an error for an invalid date format", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		expect(() => dateHelper?.fn("invalid date", "YYYY")).toThrowError(
			"Unable to parse date: invalid date",
		);
	});

	it("should support lowercase yyyy format", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const formattedDateUppercase = dateHelper?.fn("5 years ago", "YYYY");
		const formattedDateLowercase = dateHelper?.fn("5 years ago", "yyyy");
		expect(formattedDateLowercase).toBe(formattedDateUppercase);
	});

	it("should support mixed case format yyyy-mm-dd", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const formattedDate = dateHelper?.fn("January 15, 2023", "yyyy-mm-dd");
		const expectedDate = dayjs(parseDate("January 15, 2023")).format(
			"YYYY-MM-DD",
		);
		expect(formattedDate).toBe(expectedDate);
	});

	it("should support lowercase yy format", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const formattedDateUppercase = dateHelper?.fn("January 1, 2023", "YY");
		const formattedDateLowercase = dateHelper?.fn("January 1, 2023", "yy");
		expect(formattedDateLowercase).toBe(formattedDateUppercase);
		expect(formattedDateLowercase).toBe("23");
	});

	it("should support lowercase format in complex patterns", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const formattedDate = dateHelper?.fn(
			"January 15, 2023 14:30:45",
			"yyyy-mm-dd hh:mm:ss",
		);
		const expectedDate = dayjs(parseDate("January 15, 2023 14:30:45")).format(
			"YYYY-MM-DD HH:MM:SS",
		);
		expect(formattedDate).toBe(expectedDate);
	});
});

describe("moment", () => {
	it('should have a "moment" helper with the correct properties', () => {
		const momentHelper = helpers.find((helper) => helper.name === "moment");
		expect(momentHelper).toBeDefined();
		expect(momentHelper?.name).toBe("moment");
		expect(momentHelper?.category).toBe("date");
		expect(typeof momentHelper?.fn).toBe("function");
	});

	it("should support lowercase yyyy format in moment helper", () => {
		const momentHelper = helpers.find((helper) => helper.name === "moment");
		expect(momentHelper).toBeDefined();

		const formattedDateUppercase = momentHelper?.fn("5 years ago", "YYYY");
		const formattedDateLowercase = momentHelper?.fn("5 years ago", "yyyy");
		expect(formattedDateLowercase).toBe(formattedDateUppercase);
	});

	it("should support mixed case format in moment helper", () => {
		const momentHelper = helpers.find((helper) => helper.name === "moment");
		expect(momentHelper).toBeDefined();

		const formattedDate = momentHelper?.fn("December 25, 2023", "dd/mm/yyyy");
		const expectedDate = dayjs(parseDate("December 25, 2023")).format(
			"DD/MM/YYYY",
		);
		expect(formattedDate).toBe(expectedDate);
	});
});

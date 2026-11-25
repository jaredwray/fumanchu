import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { describe, expect, it, vi } from "vitest";
import { helpers } from "../../src/helpers/date.js";
import { fumanchu } from "../../src/index.node.js";

// Enable dayjs plugins for testing
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

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
		expect(formattedDate).toBe("2023-01-15 14:30:45");
	});

	it("uses the default format when the template supplies only a date", () => {
		const render = fumanchu().compile("{{date value}}");
		expect(render({ value: "January 15, 2023" })).toBe("2023-01-15");
	});

	it("uses the current date when the template omits both arguments", () => {
		const render = fumanchu().compile("{{date}}");
		vi.useFakeTimers();
		try {
			vi.setSystemTime(new Date(2023, 0, 15));
			expect(render({})).toBe("2023-01-15");
		} finally {
			vi.useRealTimers();
		}
	});

	it("should handle Date objects", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const testDate = new Date("2023-01-15T12:00:00Z");
		const formattedDate = dateHelper?.fn(testDate, "YYYY-MM-DD");
		expect(formattedDate).toBe("2023-01-15");
	});

	it("should handle timestamps", () => {
		const dateHelper = helpers.find((helper) => helper.name === "date");
		expect(dateHelper).toBeDefined();

		const timestamp = new Date("2023-01-15T12:00:00Z").getTime();
		const formattedDate = dateHelper?.fn(timestamp, "YYYY-MM-DD");
		expect(formattedDate).toBe("2023-01-15");
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

describe("timestamp", () => {
	it('should have a "timestamp" helper with the correct properties', () => {
		const timestampHelper = helpers.find(
			(helper) => helper.name === "timestamp",
		);
		expect(timestampHelper).toBeDefined();
		expect(timestampHelper?.name).toBe("timestamp");
		expect(timestampHelper?.category).toBe("date");
		expect(typeof timestampHelper?.fn).toBe("function");
	});

	it("should return current timestamp as string", () => {
		const timestampHelper = helpers.find(
			(helper) => helper.name === "timestamp",
		);
		expect(timestampHelper).toBeDefined();

		const before = Date.now();
		const result = timestampHelper?.fn();
		const after = Date.now();

		expect(typeof result).toBe("string");
		const timestamp = Number.parseInt(result as string, 10);
		expect(timestamp).toBeGreaterThanOrEqual(before);
		expect(timestamp).toBeLessThanOrEqual(after);
	});
});

describe("now", () => {
	it('should have a "now" helper with the correct properties', () => {
		const nowHelper = helpers.find((helper) => helper.name === "now");
		expect(nowHelper).toBeDefined();
		expect(nowHelper?.name).toBe("now");
		expect(nowHelper?.category).toBe("date");
		expect(typeof nowHelper?.fn).toBe("function");
	});

	it("uses the default format when the template omits the format", () => {
		const render = fumanchu().compile("{{now}}");
		vi.useFakeTimers();
		try {
			vi.setSystemTime(new Date(2023, 10, 15, 14, 5, 7));
			expect(render({})).toBe("2023-11-15 14:05:07");
		} finally {
			vi.useRealTimers();
		}
	});

	it("should return current date with custom format", () => {
		const nowHelper = helpers.find((helper) => helper.name === "now");
		expect(nowHelper).toBeDefined();

		const result = nowHelper?.fn("YYYY-MM-DD");
		const expected = dayjs().format("YYYY-MM-DD");
		expect(result).toBe(expected);
	});
});

describe("fromNow", () => {
	it('should have a "fromNow" helper with the correct properties', () => {
		const fromNowHelper = helpers.find((helper) => helper.name === "fromNow");
		expect(fromNowHelper).toBeDefined();
		expect(fromNowHelper?.name).toBe("fromNow");
		expect(fromNowHelper?.category).toBe("date");
		expect(typeof fromNowHelper?.fn).toBe("function");
	});

	it("should return relative time for past date", () => {
		const fromNowHelper = helpers.find((helper) => helper.name === "fromNow");
		expect(fromNowHelper).toBeDefined();

		const pastDate = dayjs().subtract(5, "minutes");
		const result = fromNowHelper?.fn(pastDate.toISOString());
		expect(result).toBe("5 minutes ago");
	});

	it("should return relative time for future date", () => {
		const fromNowHelper = helpers.find((helper) => helper.name === "fromNow");
		expect(fromNowHelper).toBeDefined();

		const futureDate = dayjs().add(2, "hours");
		const result = fromNowHelper?.fn(futureDate.toISOString());
		expect(result).toBe("in 2 hours");
	});

	it("should handle human-readable dates", () => {
		const fromNowHelper = helpers.find((helper) => helper.name === "fromNow");
		expect(fromNowHelper).toBeDefined();

		const result = fromNowHelper?.fn("2 days ago");
		expect(result).toBe("2 days ago");
	});
});

describe("toNow", () => {
	it('should have a "toNow" helper with the correct properties', () => {
		const toNowHelper = helpers.find((helper) => helper.name === "toNow");
		expect(toNowHelper).toBeDefined();
		expect(toNowHelper?.name).toBe("toNow");
		expect(toNowHelper?.category).toBe("date");
		expect(typeof toNowHelper?.fn).toBe("function");
	});

	it("should return relative time to now for past date", () => {
		const toNowHelper = helpers.find((helper) => helper.name === "toNow");
		expect(toNowHelper).toBeDefined();

		const pastDate = dayjs().subtract(3, "hours");
		const result = toNowHelper?.fn(pastDate.toISOString());
		// toNow is opposite of fromNow - for past dates it shows "in X"
		expect(result).toBe("in 3 hours");
	});

	it("should return relative time to now for future date", () => {
		const toNowHelper = helpers.find((helper) => helper.name === "toNow");
		expect(toNowHelper).toBeDefined();

		const futureDate = dayjs().add(1, "day");
		const result = toNowHelper?.fn(futureDate.toISOString());
		// toNow is opposite of fromNow - for future dates it shows "X ago"
		expect(result).toBe("a day ago");
	});
});

describe("ago", () => {
	it('should have an "ago" helper with the correct properties', () => {
		const agoHelper = helpers.find((helper) => helper.name === "ago");
		expect(agoHelper).toBeDefined();
		expect(agoHelper?.name).toBe("ago");
		expect(agoHelper?.category).toBe("date");
		expect(typeof agoHelper?.fn).toBe("function");
	});

	it("should work as an alias for fromNow", () => {
		const agoHelper = helpers.find((helper) => helper.name === "ago");
		expect(agoHelper).toBeDefined();

		const pastDate = dayjs().subtract(10, "minutes");
		const result = agoHelper?.fn(pastDate.toISOString());
		expect(result).toBe("10 minutes ago");
	});
});

describe("dateAdd", () => {
	it('should have a "dateAdd" helper with the correct properties', () => {
		const dateAddHelper = helpers.find((helper) => helper.name === "dateAdd");
		expect(dateAddHelper).toBeDefined();
		expect(dateAddHelper?.name).toBe("dateAdd");
		expect(dateAddHelper?.category).toBe("date");
		expect(typeof dateAddHelper?.fn).toBe("function");
	});

	it("should add days to a date", () => {
		const dateAddHelper = helpers.find((helper) => helper.name === "dateAdd");
		expect(dateAddHelper).toBeDefined();

		const baseDate = "2023-01-15";
		const result = dateAddHelper?.fn(baseDate, 5, "days");
		expect(result).toContain("2023-01-20");
	});

	it("should add months to a date", () => {
		const dateAddHelper = helpers.find((helper) => helper.name === "dateAdd");
		expect(dateAddHelper).toBeDefined();

		const baseDate = "2023-01-15";
		const result = dateAddHelper?.fn(baseDate, 2, "months");
		expect(result).toContain("2023-03-15");
	});

	it("should add years to current date when no date provided", () => {
		const dateAddHelper = helpers.find((helper) => helper.name === "dateAdd");
		expect(dateAddHelper).toBeDefined();

		const result = dateAddHelper?.fn(undefined, 1, "year");
		const expected = dayjs().add(1, "year").format("YYYY-MM-DD");
		expect(result).toContain(expected);
	});
});

describe("dateSubtract", () => {
	it('should have a "dateSubtract" helper with the correct properties', () => {
		const dateSubtractHelper = helpers.find(
			(helper) => helper.name === "dateSubtract",
		);
		expect(dateSubtractHelper).toBeDefined();
		expect(dateSubtractHelper?.name).toBe("dateSubtract");
		expect(dateSubtractHelper?.category).toBe("date");
		expect(typeof dateSubtractHelper?.fn).toBe("function");
	});

	it("should subtract days from a date", () => {
		const dateSubtractHelper = helpers.find(
			(helper) => helper.name === "dateSubtract",
		);
		expect(dateSubtractHelper).toBeDefined();

		const baseDate = "2023-01-15";
		const result = dateSubtractHelper?.fn(baseDate, 5, "days");
		expect(result).toContain("2023-01-10");
	});

	it("should subtract weeks from a date", () => {
		const dateSubtractHelper = helpers.find(
			(helper) => helper.name === "dateSubtract",
		);
		expect(dateSubtractHelper).toBeDefined();

		const baseDate = "2023-01-15";
		const result = dateSubtractHelper?.fn(baseDate, 2, "weeks");
		expect(result).toContain("2023-01-01");
	});
});

describe("startOf", () => {
	it('should have a "startOf" helper with the correct properties', () => {
		const startOfHelper = helpers.find((helper) => helper.name === "startOf");
		expect(startOfHelper).toBeDefined();
		expect(startOfHelper?.name).toBe("startOf");
		expect(startOfHelper?.category).toBe("date");
		expect(typeof startOfHelper?.fn).toBe("function");
	});

	it("should get start of month", () => {
		const startOfHelper = helpers.find((helper) => helper.name === "startOf");
		expect(startOfHelper).toBeDefined();

		const result = startOfHelper?.fn("2023-01-15", "month");
		expect(result).toContain("2023-01-01 00:00:00");
	});

	it("should get start of year", () => {
		const startOfHelper = helpers.find((helper) => helper.name === "startOf");
		expect(startOfHelper).toBeDefined();

		const result = startOfHelper?.fn("2023-06-15", "year");
		expect(result).toContain("2023-01-01 00:00:00");
	});

	it("should get start of day", () => {
		const startOfHelper = helpers.find((helper) => helper.name === "startOf");
		expect(startOfHelper).toBeDefined();

		const result = startOfHelper?.fn("2023-01-15 14:30:45", "day");
		expect(result).toContain("2023-01-15 00:00:00");
	});
});

describe("endOf", () => {
	it('should have an "endOf" helper with the correct properties', () => {
		const endOfHelper = helpers.find((helper) => helper.name === "endOf");
		expect(endOfHelper).toBeDefined();
		expect(endOfHelper?.name).toBe("endOf");
		expect(endOfHelper?.category).toBe("date");
		expect(typeof endOfHelper?.fn).toBe("function");
	});

	it("should get end of month", () => {
		const endOfHelper = helpers.find((helper) => helper.name === "endOf");
		expect(endOfHelper).toBeDefined();

		const result = endOfHelper?.fn("2023-01-15", "month");
		expect(result).toContain("2023-01-31 23:59:59");
	});

	it("should get end of year", () => {
		const endOfHelper = helpers.find((helper) => helper.name === "endOf");
		expect(endOfHelper).toBeDefined();

		const result = endOfHelper?.fn("2023-06-15", "year");
		expect(result).toContain("2023-12-31 23:59:59");
	});
});

describe("isBefore", () => {
	it('should have an "isBefore" helper with the correct properties', () => {
		const isBeforeHelper = helpers.find((helper) => helper.name === "isBefore");
		expect(isBeforeHelper).toBeDefined();
		expect(isBeforeHelper?.name).toBe("isBefore");
		expect(isBeforeHelper?.category).toBe("date");
		expect(typeof isBeforeHelper?.fn).toBe("function");
	});

	it("should return true when first date is before second", () => {
		const isBeforeHelper = helpers.find((helper) => helper.name === "isBefore");
		expect(isBeforeHelper).toBeDefined();

		const result = isBeforeHelper?.fn("2023-01-10", "2023-01-15");
		expect(result).toBe(true);
	});

	it("should return false when first date is after second", () => {
		const isBeforeHelper = helpers.find((helper) => helper.name === "isBefore");
		expect(isBeforeHelper).toBeDefined();

		const result = isBeforeHelper?.fn("2023-01-20", "2023-01-15");
		expect(result).toBe(false);
	});
});

describe("isAfter", () => {
	it('should have an "isAfter" helper with the correct properties', () => {
		const isAfterHelper = helpers.find((helper) => helper.name === "isAfter");
		expect(isAfterHelper).toBeDefined();
		expect(isAfterHelper?.name).toBe("isAfter");
		expect(isAfterHelper?.category).toBe("date");
		expect(typeof isAfterHelper?.fn).toBe("function");
	});

	it("should return true when first date is after second", () => {
		const isAfterHelper = helpers.find((helper) => helper.name === "isAfter");
		expect(isAfterHelper).toBeDefined();

		const result = isAfterHelper?.fn("2023-01-20", "2023-01-15");
		expect(result).toBe(true);
	});

	it("should return false when first date is before second", () => {
		const isAfterHelper = helpers.find((helper) => helper.name === "isAfter");
		expect(isAfterHelper).toBeDefined();

		const result = isAfterHelper?.fn("2023-01-10", "2023-01-15");
		expect(result).toBe(false);
	});
});

describe("isSame", () => {
	it('should have an "isSame" helper with the correct properties', () => {
		const isSameHelper = helpers.find((helper) => helper.name === "isSame");
		expect(isSameHelper).toBeDefined();
		expect(isSameHelper?.name).toBe("isSame");
		expect(isSameHelper?.category).toBe("date");
		expect(typeof isSameHelper?.fn).toBe("function");
	});

	it("should return true when dates are the same", () => {
		const isSameHelper = helpers.find((helper) => helper.name === "isSame");
		expect(isSameHelper).toBeDefined();

		const result = isSameHelper?.fn("2023-01-15", "2023-01-15");
		expect(result).toBe(true);
	});

	it("should return false when dates are different", () => {
		const isSameHelper = helpers.find((helper) => helper.name === "isSame");
		expect(isSameHelper).toBeDefined();

		const result = isSameHelper?.fn("2023-01-15", "2023-01-16");
		expect(result).toBe(false);
	});

	it("should compare by unit (year)", () => {
		const isSameHelper = helpers.find((helper) => helper.name === "isSame");
		expect(isSameHelper).toBeDefined();

		const result = isSameHelper?.fn("2023-01-15", "2023-12-31", "year");
		expect(result).toBe(true);
	});

	it("should compare by unit (month)", () => {
		const isSameHelper = helpers.find((helper) => helper.name === "isSame");
		expect(isSameHelper).toBeDefined();

		const result = isSameHelper?.fn("2023-01-15", "2023-01-25", "month");
		expect(result).toBe(true);
	});
});

describe("isBetween", () => {
	it('should have an "isBetween" helper with the correct properties', () => {
		const isBetweenHelper = helpers.find(
			(helper) => helper.name === "isBetween",
		);
		expect(isBetweenHelper).toBeDefined();
		expect(isBetweenHelper?.name).toBe("isBetween");
		expect(isBetweenHelper?.category).toBe("date");
		expect(typeof isBetweenHelper?.fn).toBe("function");
	});

	it("should return true when date is between start and end (inclusive)", () => {
		const isBetweenHelper = helpers.find(
			(helper) => helper.name === "isBetween",
		);
		expect(isBetweenHelper).toBeDefined();

		const result = isBetweenHelper?.fn(
			"2023-01-15",
			"2023-01-10",
			"2023-01-20",
		);
		expect(result).toBe(true);
	});

	it("should return false when date is outside range", () => {
		const isBetweenHelper = helpers.find(
			(helper) => helper.name === "isBetween",
		);
		expect(isBetweenHelper).toBeDefined();

		const result = isBetweenHelper?.fn(
			"2023-01-25",
			"2023-01-10",
			"2023-01-20",
		);
		expect(result).toBe(false);
	});

	it("should include boundaries", () => {
		const isBetweenHelper = helpers.find(
			(helper) => helper.name === "isBetween",
		);
		expect(isBetweenHelper).toBeDefined();

		const result1 = isBetweenHelper?.fn(
			"2023-01-10",
			"2023-01-10",
			"2023-01-20",
		);
		const result2 = isBetweenHelper?.fn(
			"2023-01-20",
			"2023-01-10",
			"2023-01-20",
		);
		expect(result1).toBe(true);
		expect(result2).toBe(true);
	});
});

describe("diff", () => {
	it('should have a "diff" helper with the correct properties', () => {
		const diffHelper = helpers.find((helper) => helper.name === "diff");
		expect(diffHelper).toBeDefined();
		expect(diffHelper?.name).toBe("diff");
		expect(diffHelper?.category).toBe("date");
		expect(typeof diffHelper?.fn).toBe("function");
	});

	it("should calculate difference in days", () => {
		const diffHelper = helpers.find((helper) => helper.name === "diff");
		expect(diffHelper).toBeDefined();

		const result = diffHelper?.fn("2023-01-20", "2023-01-15", "days");
		expect(result).toBe(5);
	});

	it("should calculate difference in months", () => {
		const diffHelper = helpers.find((helper) => helper.name === "diff");
		expect(diffHelper).toBeDefined();

		const result = diffHelper?.fn("2023-03-15", "2023-01-15", "months");
		expect(result).toBe(2);
	});

	it("should calculate difference in years", () => {
		const diffHelper = helpers.find((helper) => helper.name === "diff");
		expect(diffHelper).toBeDefined();

		const result = diffHelper?.fn("2025-01-15", "2023-01-15", "years");
		expect(result).toBe(2);
	});

	it("should return milliseconds by default", () => {
		const diffHelper = helpers.find((helper) => helper.name === "diff");
		expect(diffHelper).toBeDefined();

		const result = diffHelper?.fn("2023-01-15 00:01:00", "2023-01-15 00:00:00");
		expect(result).toBe(60000); // 60 seconds = 60000 milliseconds
	});
});

describe("toISOString", () => {
	it('should have a "toISOString" helper with the correct properties', () => {
		const toISOStringHelper = helpers.find(
			(helper) => helper.name === "toISOString",
		);
		expect(toISOStringHelper).toBeDefined();
		expect(toISOStringHelper?.name).toBe("toISOString");
		expect(toISOStringHelper?.category).toBe("date");
		expect(typeof toISOStringHelper?.fn).toBe("function");
	});

	it("should convert date to ISO string", () => {
		const toISOStringHelper = helpers.find(
			(helper) => helper.name === "toISOString",
		);
		expect(toISOStringHelper).toBeDefined();

		const result = toISOStringHelper?.fn("2023-01-15");
		expect(result).toMatch(/2023-01-15T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
	});

	it("should handle human-readable dates", () => {
		const toISOStringHelper = helpers.find(
			(helper) => helper.name === "toISOString",
		);
		expect(toISOStringHelper).toBeDefined();

		const result = toISOStringHelper?.fn("January 15, 2023");
		expect(result).toContain("2023-01-15");
	});
});

describe("dateTimezone", () => {
	it('should have a "dateTimezone" helper with the correct properties', () => {
		const dateTimezoneHelper = helpers.find(
			(helper) => helper.name === "dateTimezone",
		);
		expect(dateTimezoneHelper).toBeDefined();
		expect(dateTimezoneHelper?.name).toBe("dateTimezone");
		expect(dateTimezoneHelper?.category).toBe("date");
		expect(typeof dateTimezoneHelper?.fn).toBe("function");
	});

	it.each([
		["HH:mm:ss", "09:05:07"],
		["HH:m:ss", "09:5:07"],
		["HH:mm", "09:05"],
		["HHmm", "0905"],
		["hh:mm", "09:05"],
		["H:mm:ss", "9:05:07"],
		["mm:ss", "05:07"],
		["YYYY-MM-DD HH:mm:ss", "2023-11-15 09:05:07"],
		["yyyy-mm-dd hh:mm:ss", "2023-11-15 09:05:07"],
		["yyyy-mm-dd", "2023-11-15"],
		["dd/mm/yyyy", "15/11/2023"],
		["mm/dd/yy", "11/15/23"],
		["mm", "11"],
	])("formats %s in the specified timezone", (format, expected) => {
		const render = fumanchu().compile(
			'{{dateTimezone value "America/New_York" format}}',
		);
		const result = render({
			value: new Date("2023-11-15T14:05:07Z"),
			format,
		});
		expect(result).toBe(expected);
	});

	it.each(["00", "05", "09", "30", "59"])(
		"formats %s minutes with two digits",
		(minutes) => {
			const dateTimezoneHelper = helpers.find(
				(helper) => helper.name === "dateTimezone",
			);
			expect(dateTimezoneHelper).toBeDefined();

			const result = dateTimezoneHelper?.fn(
				new Date(`2023-11-15T14:${minutes}:07Z`),
				"UTC",
				"HH:mm:ss",
			);
			expect(result).toBe(`14:${minutes}:07`);
		},
	);

	it("uses the default format when the template omits the format", () => {
		const render = fumanchu().compile('{{dateTimezone value "UTC"}}');
		expect(render({ value: new Date("2023-11-15T14:05:07Z") })).toBe(
			"2023-11-15 14:05:07",
		);
	});
});

describe("dateLocale", () => {
	it('should have a "dateLocale" helper with the correct properties', () => {
		const dateLocaleHelper = helpers.find(
			(helper) => helper.name === "dateLocale",
		);
		expect(dateLocaleHelper).toBeDefined();
		expect(dateLocaleHelper?.name).toBe("dateLocale");
		expect(dateLocaleHelper?.category).toBe("date");
		expect(typeof dateLocaleHelper?.fn).toBe("function");
	});

	it("should format date with locale", () => {
		const dateLocaleHelper = helpers.find(
			(helper) => helper.name === "dateLocale",
		);
		expect(dateLocaleHelper).toBeDefined();

		const result = dateLocaleHelper?.fn("2023-01-15", "en", "YYYY-MM-DD");
		expect(result).toBe("2023-01-15");
	});

	it("uses the default format when the template omits the format", () => {
		const render = fumanchu().compile('{{dateLocale value "en"}}');
		expect(render({ value: new Date(2023, 10, 15, 14, 5, 7) })).toBe(
			"2023-11-15 14:05:07",
		);
	});
});

import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import type { Helper } from "../helper-registry.js";

// Enable dayjs plugins once at module initialization
// dayjs.extend() is idempotent and safe to call multiple times
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

type DateInput = string | number | Date | undefined;
type DateUnit =
	| "year"
	| "years"
	| "month"
	| "months"
	| "week"
	| "weeks"
	| "day"
	| "days"
	| "hour"
	| "hours"
	| "minute"
	| "minutes"
	| "second"
	| "seconds";

// Helper to parse various date inputs
const parseDateInput = (input: DateInput): dayjs.Dayjs => {
	if (!input) {
		return dayjs();
	}
	if (typeof input === "string") {
		const parsed = parseDate(input);
		if (parsed) {
			return dayjs(parsed);
		}
		// Try dayjs parsing for ISO strings and other formats
		return dayjs(input);
	}
	return dayjs(input);
};

const year = () => new Date().getFullYear().toString();

// Convert lowercase format tokens to uppercase for dayjs compatibility
const convertFormatString = (format: string): string => {
	return format
		.replace(/yyyy/g, "YYYY")
		.replace(/yy/g, "YY")
		.replace(/dd/g, "DD")
		.replace(/mm/g, "MM")
		.replace(/hh/g, "HH");
};

const date = (humanReadableDate?: string, formatString?: string): string => {
	const defaultFormat = "YYYY-MM-DD";
	const format = formatString || defaultFormat;

	const parsedDate = parseDateInput(humanReadableDate);
	/* v8 ignore next -- @preserve */
	if (!parsedDate.isValid()) {
		throw new Error(`Unable to parse date: ${humanReadableDate}`);
	}

	// Convert lowercase format tokens to uppercase for dayjs
	const convertedFormat = convertFormatString(format);

	// Format the parsed date using `dayjs`
	return parsedDate.format(convertedFormat);
};

// Get current timestamp in milliseconds
const timestamp = (): string => {
	return Date.now().toString();
};

// Get current date with optional format
const now = (formatString?: string): string => {
	const defaultFormat = "YYYY-MM-DD HH:mm:ss";
	const format = formatString || defaultFormat;
	const convertedFormat = convertFormatString(format);
	return dayjs().format(convertedFormat);
};

// Relative time from now (e.g., "5 minutes ago")
const fromNow = (dateInput: DateInput): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.fromNow();
};

// Relative time to now (e.g., "in 5 minutes")
const toNow = (dateInput: DateInput): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.toNow();
};

// Alias for fromNow
const ago = (dateInput: DateInput): string => {
	return fromNow(dateInput);
};

// Add time to a date
const dateAdd = (
	dateInput: DateInput,
	amount: number,
	unit: DateUnit,
): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.add(amount, unit).format("YYYY-MM-DD HH:mm:ss");
};

// Subtract time from a date
const dateSubtract = (
	dateInput: DateInput,
	amount: number,
	unit: DateUnit,
): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.subtract(amount, unit).format("YYYY-MM-DD HH:mm:ss");
};

// Start of a time period
const startOf = (dateInput: DateInput, unit: DateUnit): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.startOf(unit).format("YYYY-MM-DD HH:mm:ss");
};

// End of a time period
const endOf = (dateInput: DateInput, unit: DateUnit): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.endOf(unit).format("YYYY-MM-DD HH:mm:ss");
};

// Check if date is before another date
const isBefore = (date1: DateInput, date2: DateInput): boolean => {
	const parsed1 = parseDateInput(date1);
	const parsed2 = parseDateInput(date2);
	/* v8 ignore next -- @preserve */
	if (!parsed1.isValid() || !parsed2.isValid()) {
		throw new Error(`Unable to parse dates: ${date1}, ${date2}`);
	}
	return parsed1.isBefore(parsed2);
};

// Check if date is after another date
const isAfter = (date1: DateInput, date2: DateInput): boolean => {
	const parsed1 = parseDateInput(date1);
	const parsed2 = parseDateInput(date2);
	/* v8 ignore next -- @preserve */
	if (!parsed1.isValid() || !parsed2.isValid()) {
		throw new Error(`Unable to parse dates: ${date1}, ${date2}`);
	}
	return parsed1.isAfter(parsed2);
};

// Check if dates are the same
const isSame = (
	date1: DateInput,
	date2: DateInput,
	unit?: DateUnit,
): boolean => {
	const parsed1 = parseDateInput(date1);
	const parsed2 = parseDateInput(date2);
	/* v8 ignore next -- @preserve */
	if (!parsed1.isValid() || !parsed2.isValid()) {
		throw new Error(`Unable to parse dates: ${date1}, ${date2}`);
	}
	return parsed1.isSame(parsed2, unit);
};

// Check if date is between two dates
const isBetweenDates = (
	dateInput: DateInput,
	startDate: DateInput,
	endDate: DateInput,
): boolean => {
	const parsed = parseDateInput(dateInput);
	const parsedStart = parseDateInput(startDate);
	const parsedEnd = parseDateInput(endDate);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid() || !parsedStart.isValid() || !parsedEnd.isValid()) {
		throw new Error(
			`Unable to parse dates: ${dateInput}, ${startDate}, ${endDate}`,
		);
	}
	return parsed.isBetween(parsedStart, parsedEnd, null, "[]");
};

// Calculate difference between dates
const diff = (date1: DateInput, date2: DateInput, unit?: DateUnit): number => {
	const parsed1 = parseDateInput(date1);
	const parsed2 = parseDateInput(date2);
	/* v8 ignore next -- @preserve */
	if (!parsed1.isValid() || !parsed2.isValid()) {
		throw new Error(`Unable to parse dates: ${date1}, ${date2}`);
	}
	return parsed1.diff(parsed2, unit);
};

// Convert to ISO string
const toISOString = (dateInput: DateInput): string => {
	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}
	return parsed.toISOString();
};

// Format with timezone
const dateTimezone = (
	dateInput: DateInput,
	timezoneStr: string,
	formatString?: string,
): string => {
	const defaultFormat = "YYYY-MM-DD HH:mm:ss";
	const format = formatString || defaultFormat;
	const convertedFormat = convertFormatString(format);

	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}

	return parsed.tz(timezoneStr).format(convertedFormat);
};

// Format with locale (dayjs uses locale globally, so we'll apply it temporarily)
const dateLocale = (
	dateInput: DateInput,
	locale: string,
	formatString?: string,
): string => {
	const defaultFormat = "YYYY-MM-DD HH:mm:ss";
	const format = formatString || defaultFormat;
	const convertedFormat = convertFormatString(format);

	const parsed = parseDateInput(dateInput);
	/* v8 ignore next -- @preserve */
	if (!parsed.isValid()) {
		throw new Error(`Unable to parse date: ${dateInput}`);
	}

	return parsed.locale(locale).format(convertedFormat);
};

export const helpers: Helper[] = [
	{
		name: "year",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: year,
	},
	{
		name: "date",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: date,
	},
	{
		/* Adding this in for legacy support */
		name: "moment",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: date,
	},
	{
		name: "timestamp",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: timestamp,
	},
	{
		name: "now",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: now,
	},
	{
		name: "fromNow",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: fromNow,
	},
	{
		name: "toNow",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: toNow,
	},
	{
		name: "ago",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: ago,
	},
	{
		name: "dateAdd",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: dateAdd,
	},
	{
		name: "dateSubtract",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: dateSubtract,
	},
	{
		name: "startOf",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: startOf,
	},
	{
		name: "endOf",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: endOf,
	},
	{
		name: "isBefore",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: isBefore,
	},
	{
		name: "isAfter",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: isAfter,
	},
	{
		name: "isSame",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: isSame,
	},
	{
		name: "isBetween",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: isBetweenDates,
	},
	{
		name: "diff",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: diff,
	},
	{
		name: "toISOString",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: toISOString,
	},
	{
		name: "dateTimezone",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: dateTimezone,
	},
	{
		name: "dateLocale",
		category: "date",
		compatibility: ["browser", "nodejs"],
		fn: dateLocale,
	},
];

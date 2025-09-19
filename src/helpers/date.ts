import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import type { Helper } from "../helper-registry.js";

const year = () => new Date().getFullYear().toString();

// Convert lowercase format tokens to uppercase for dayjs compatibility
const convertFormatString = (format: string): string => {
	return format
		.replace(/yyyy/g, "YYYY")
		.replace(/yy/g, "YY")
		.replace(/dd/g, "DD")
		.replace(/mm/g, "MM")
		.replace(/hh/g, "HH")
		.replace(/ss/g, "SS");
};

const date = (humanReadableDate: string, formatString: string): string => {
	const parsedDate = parseDate(humanReadableDate);
	if (!parsedDate) {
		throw new Error(`Unable to parse date: ${humanReadableDate}`);
	}

	// Convert lowercase format tokens to uppercase for dayjs
	const convertedFormat = convertFormatString(formatString);

	// Format the parsed date using `dayjs`
	return dayjs(parsedDate).format(convertedFormat);
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
];

import { parseDate } from "chrono-node";
import dayjs from "dayjs";
import type { Helper } from "../helper-registry.js";

const year = () => new Date().getFullYear().toString();

const date = (humanReadableDate: string, formatString: string): string => {
	const parsedDate = parseDate(humanReadableDate);
	if (!parsedDate) {
		throw new Error(`Unable to parse date: ${humanReadableDate}`);
	}

	// Format the parsed date using `dayjs`
	return dayjs(parsedDate).format(formatString);
};

export const helpers: Helper[] = [
	{
		name: "year",
		category: "date",
		fn: year,
	},
	{
		name: "date",
		category: "date",
		fn: date,
	},
	{
		/* Adding this in for legacy support */
		name: "moment",
		category: "date",
		fn: date,
	},
];

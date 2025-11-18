---
title: Date Helpers
description: >
    Handlebars provides a comprehensive set of built-in helpers for working with dates. These helpers are used to format, manipulate, and compare dates, making it easier to display and work with date information.
order: 10
---

## Date Helpers

Fumanchu provides powerful date manipulation capabilities using dayjs and chrono-node for natural language date parsing.

### {{year}}

Get the current year as a string.

**Example**

```handlebars
{{year}}
<!-- 2025 -->
```

### {{date}}

Format a date with support for human-readable date strings, Date objects, timestamps, or defaults to current date.

**Parameters:**
- `dateInput` (optional): Date string, Date object, timestamp, or undefined (defaults to now)
- `format` (optional): Format string (defaults to "YYYY-MM-DD")

**Supported format tokens:**
- `YYYY` or `yyyy`: 4-digit year
- `YY` or `yy`: 2-digit year
- `MM` or `mm`: Month (01-12)
- `DD` or `dd`: Day of month (01-31)
- `HH` or `hh`: Hour (00-23)
- `mm`: Minute (00-59)
- `ss`: Second (00-59)

**Examples**

```handlebars
{{date "January 15, 2023" "YYYY-MM-DD"}}
<!-- 2023-01-15 -->

{{date "5 years ago" "YYYY"}}
<!-- 2020 -->

{{date "next Friday" "MM/DD/YYYY"}}
<!-- 11/21/2025 -->

{{date}}
<!-- 2025-11-17 (current date) -->

{{date "2023-01-15" "dd/mm/yyyy"}}
<!-- 15/01/2023 -->
```

### {{moment}}

Legacy alias for `{{date}}`. Works exactly the same as the date helper.

**Example**

```handlebars
{{moment "December 25, 2023" "YYYY-MM-DD"}}
<!-- 2023-12-25 -->
```

---

## Current Time Helpers

### {{timestamp}}

Returns the current Unix timestamp in milliseconds.

**Example**

```handlebars
{{timestamp}}
<!-- 1700236800000 -->
```

### {{now}}

Returns the current date/time with optional formatting.

**Parameters:**
- `format` (optional): Format string (defaults to "YYYY-MM-DD HH:mm:ss")

**Examples**

```handlebars
{{now}}
<!-- 2025-11-17 14:30:45 -->

{{now "YYYY-MM-DD"}}
<!-- 2025-11-17 -->

{{now "HH:mm:ss"}}
<!-- 14:30:45 -->
```

---

## Relative Time Helpers

### {{fromNow}}

Display relative time from now (e.g., "5 minutes ago", "in 2 hours").

**Parameters:**
- `dateInput`: Date string, Date object, or timestamp

**Examples**

```handlebars
{{fromNow "2 days ago"}}
<!-- 2 days ago -->

{{fromNow "tomorrow"}}
<!-- in a day -->

{{fromNow "January 1, 2025"}}
<!-- 10 months ago -->
```

### {{ago}}

Alias for `{{fromNow}}`. Shows how long ago a date was.

**Example**

```handlebars
{{ago "5 minutes ago"}}
<!-- 5 minutes ago -->
```

### {{toNow}}

Opposite of `fromNow`. Shows relative time to now (less commonly used).

**Example**

```handlebars
{{toNow "2 hours ago"}}
<!-- in 2 hours -->
```

---

## Date Arithmetic Helpers

### {{dateAdd}}

Add time to a date.

**Parameters:**
- `dateInput` (optional): Date to add to (defaults to now)
- `amount`: Number to add
- `unit`: Unit of time ("year", "month", "week", "day", "hour", "minute", "second")

**Examples**

```handlebars
{{dateAdd "2023-01-15" 5 "days"}}
<!-- 2023-01-20 00:00:00 -->

{{dateAdd "2023-01-15" 2 "months"}}
<!-- 2023-03-15 00:00:00 -->

{{dateAdd undefined 1 "year"}}
<!-- 2026-11-17 14:30:45 (current date + 1 year) -->
```

### {{dateSubtract}}

Subtract time from a date.

**Parameters:**
- `dateInput` (optional): Date to subtract from (defaults to now)
- `amount`: Number to subtract
- `unit`: Unit of time

**Examples**

```handlebars
{{dateSubtract "2023-01-15" 5 "days"}}
<!-- 2023-01-10 00:00:00 -->

{{dateSubtract "2023-01-15" 2 "weeks"}}
<!-- 2023-01-01 00:00:00 -->
```

---

## Date Period Helpers

### {{startOf}}

Get the start of a time period.

**Parameters:**
- `dateInput` (optional): Date (defaults to now)
- `unit`: Unit of time ("year", "month", "week", "day", "hour", "minute", "second")

**Examples**

```handlebars
{{startOf "2023-01-15" "month"}}
<!-- 2023-01-01 00:00:00 -->

{{startOf "2023-06-15" "year"}}
<!-- 2023-01-01 00:00:00 -->

{{startOf "2023-01-15 14:30:45" "day"}}
<!-- 2023-01-15 00:00:00 -->
```

### {{endOf}}

Get the end of a time period.

**Parameters:**
- `dateInput` (optional): Date (defaults to now)
- `unit`: Unit of time

**Examples**

```handlebars
{{endOf "2023-01-15" "month"}}
<!-- 2023-01-31 23:59:59 -->

{{endOf "2023-06-15" "year"}}
<!-- 2023-12-31 23:59:59 -->
```

---

## Date Comparison Helpers

### {{isBefore}}

Check if the first date is before the second date.

**Parameters:**
- `date1`: First date
- `date2`: Second date

**Returns:** `true` or `false`

**Example**

```handlebars
{{#if (isBefore "2023-01-10" "2023-01-15")}}
  Date 1 is before Date 2
{{/if}}
```

### {{isAfter}}

Check if the first date is after the second date.

**Parameters:**
- `date1`: First date
- `date2`: Second date

**Returns:** `true` or `false`

**Example**

```handlebars
{{#if (isAfter "2023-01-20" "2023-01-15")}}
  Date 1 is after Date 2
{{/if}}
```

### {{isSame}}

Check if two dates are the same, with optional unit precision.

**Parameters:**
- `date1`: First date
- `date2`: Second date
- `unit` (optional): Unit for comparison ("year", "month", "day", etc.)

**Returns:** `true` or `false`

**Examples**

```handlebars
{{#if (isSame "2023-01-15" "2023-01-15")}}
  Dates are the same
{{/if}}

{{#if (isSame "2023-01-15" "2023-12-31" "year")}}
  Same year
{{/if}}
```

### {{isBetween}}

Check if a date is between two other dates (inclusive).

**Parameters:**
- `dateInput`: Date to check
- `startDate`: Start of range
- `endDate`: End of range

**Returns:** `true` or `false`

**Example**

```handlebars
{{#if (isBetween "2023-01-15" "2023-01-10" "2023-01-20")}}
  Date is in range
{{/if}}
```

---

## Date Utilities

### {{diff}}

Calculate the difference between two dates.

**Parameters:**
- `date1`: First date
- `date2`: Second date
- `unit` (optional): Unit for result ("year", "month", "day", "hour", etc.). Defaults to milliseconds.

**Returns:** Number

**Examples**

```handlebars
{{diff "2023-01-20" "2023-01-15" "days"}}
<!-- 5 -->

{{diff "2023-03-15" "2023-01-15" "months"}}
<!-- 2 -->

{{diff "2025-01-15" "2023-01-15" "years"}}
<!-- 2 -->
```

### {{toISOString}}

Convert a date to ISO 8601 format.

**Parameters:**
- `dateInput`: Date to convert

**Examples**

```handlebars
{{toISOString "2023-01-15"}}
<!-- 2023-01-15T00:00:00.000Z -->

{{toISOString "January 15, 2023"}}
<!-- 2023-01-15T00:00:00.000Z -->
```

---

## Internationalization Helpers

### {{dateTimezone}}

Format a date in a specific timezone.

**Parameters:**
- `dateInput`: Date to format
- `timezone`: IANA timezone string (e.g., "America/New_York", "UTC", "Europe/London")
- `format` (optional): Format string (defaults to "YYYY-MM-DD HH:mm:ss")

**Examples**

```handlebars
{{dateTimezone "2023-01-15 12:00:00" "America/New_York" "YYYY-MM-DD HH:mm:ss"}}
<!-- 2023-01-15 07:00:00 -->

{{dateTimezone "2023-01-15" "UTC"}}
<!-- 2023-01-15 00:00:00 -->
```

### {{dateLocale}}

Format a date with a specific locale.

**Parameters:**
- `dateInput`: Date to format
- `locale`: Locale code (e.g., "en", "fr", "de")
- `format` (optional): Format string (defaults to "YYYY-MM-DD HH:mm:ss")

**Example**

```handlebars
{{dateLocale "2023-01-15" "en" "YYYY-MM-DD"}}
<!-- 2023-01-15 -->
```

---

## Natural Language Date Parsing

All date helpers support natural language date parsing powered by chrono-node:

- "today", "tomorrow", "yesterday"
- "next Friday", "last Monday"
- "5 days ago", "in 2 weeks"
- "January 15, 2023"
- "2023-01-15"
- Date objects
- Unix timestamps

**Examples**

```handlebars
{{date "tomorrow" "YYYY-MM-DD"}}
{{date "next Friday" "MM/DD/YYYY"}}
{{date "5 years ago" "YYYY"}}
{{fromNow "2 hours ago"}}
{{dateAdd "next week" 3 "days"}}
```

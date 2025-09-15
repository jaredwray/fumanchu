---
title: Number Helpers
description: >
    Handlebars provides a set of built-in helpers for working with numbers. These helpers are used to format and manipulate numbers, making it easier to display numerical information in a readable format.
order: 19
---

## number

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/number.js)

### [{{bytes}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L24)

Format a number to it's equivalent in bytes. If a string is passed, it's length will be formatted and returned.

**Examples:**

* `'foo' => 3 B`
* `13661855 => 13.66 MB`
* `825399 => 825.39 kB`
* `1396 => 1.4 kB`

**Params**

* `number` **{Number|String}**
* `returns` **{String}**

### [{{addCommas}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L61)

Add commas to numbers

**Params**

* `num` **{Number}**
* `returns` **{Number}**

### [{{phoneNumber}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L74)

Convert a string or number to a formatted phone number.

**Params**

* `num` **{Number|String}**: The phone number to format, e.g. `8005551212`
* `returns` **{Number}**: Formatted phone number: `(800) 555-1212`

### [{{toAbbr}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L92)

Abbreviate numbers to the given number of `precision`. This is for
general numbers, not size in bytes.

**Params**

* `number` **{Number}**
* `precision` **{Number}**
* `returns` **{String}**

### [{{toExponential}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L130)

Returns a string representing the given number in exponential notation.

**Params**

* `number` **{Number}**
* `fractionDigits` **{Number}**: Optional. An integer specifying the number of digits to use after the decimal point. Defaults to as many digits as necessary to specify the number.
* `returns` **{Number}**

**Example**

```html
{{toExponential number digits}};
```

### [{{toFixed}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L153)

Formats the given number using fixed-point notation.

**Params**

* `number` **{Number}**
* `digits` **{Number}**: (Optional) The number of digits to appear after the decimal point; this may be a value between 0 and 20. If this argument is omitted, it is treated as 0.
* `returns` **{String}**: A string representing the given number using fixed-point notation.

**Example**

```html
{{toFixed "1.1234" 2}}
//=> '1.12'
```

### [{{toFloat}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L169)

**Params**

* `number` **{Number}**
* `returns` **{Number}**

### [{{toInt}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L179)

**Params**

* `number` **{Number}**
* `returns` **{Number}**

### [{{toPrecision}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/number.js#L196)

Returns a string representing the `Number` object to the specified precision.

**Params**

* `number` **{Number}**
* `precision` **{Number}**: (Optional) An integer specifying the number of significant digits. If precison is not between 1 and 100 (inclusive), it will be coerced to `0`.
* `returns` **{String}**: A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits.

**Example**

```html
{{toPrecision "1.1234" 2}}
//=> '1.1'
```

---
title: Math Helpers
description: >
    Handlebars provides a set of built-in helpers for working with math. These helpers are used to perform mathematical operations, making it easier to manipulate numbers in templates.
order: 17
---

## math

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/math.js)

### [{{abs}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L15)

Return the magnitude of `a`.

**Params**

* `a` **{Number}**
* `returns` **{Number}**

### [{{add}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L31)

Return the sum of `a` plus `b`.

**Params**

* `a` **{Number}**
* `b` **{Number}**
* `returns` **{Number}**

### [{{avg}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L54)

Returns the average of all numbers in the given array.

**Params**

* `array` **{Array}**: Array of numbers to add up.
* `returns` **{Number}**

**Example**

```html
{{avg "[1, 2, 3, 4, 5]"}}
<!-- results in: '3' -->
```

### [{{ceil}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L69)

Get the `Math.ceil()` of the given value.

**Params**

* `value` **{Number}**
* `returns` **{Number}**

### [{{divide}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L84)

Divide `a` by `b`

**Params**

* `a` **{Number}**: numerator
* `b` **{Number}**: denominator

### [{{floor}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L102)

Get the `Math.floor()` of the given value.

**Params**

* `value` **{Number}**
* `returns` **{Number}**

### [{{minus}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L118)

Return the difference of `a` minus `b`.

**Params**

* `a` **{Number}**
* `b` **{Number}**

### [{{modulo}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L137)

Get the remainder of a division operation.

**Params**

* `a` **{Number}**
* `b` **{Number}**
* `returns` **{Number}**

### [{{multiply}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L157)

Return the product of `a` times `b`.

**Params**

* `a` **{Number}**: factor
* `b` **{Number}**: multiplier
* `returns` **{Number}**

### [{{plus}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L175)

Add `a` by `b`.

**Params**

* `a` **{Number}**: factor
* `b` **{Number}**: multiplier

### [{{random}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L194)

Generate a random number between two values

**Params**

* `min` **{Number}**
* `max` **{Number}**
* `returns` **{String}**

### [{{remainder}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L212)

Get the remainder when `a` is divided by `b`.

**Params**

* `a` **{Number}**: a
* `b` **{Number}**: b

### [{{round}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L224)

Round the given number.

**Params**

* `number` **{Number}**
* `returns` **{Number}**

### [{{subtract}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L241)

Return the product of `a` minus `b`.

**Params**

* `a` **{Number}**
* `b` **{Number}**
* `returns` **{Number}**

### [{{sum}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L263)

Returns the sum of all numbers in the given array.

**Params**

* `array` **{Array}**: Array of numbers to add up.
* `returns` **{Number}**

**Example**

```html
{{sum "[1, 2, 3, 4, 5]"}}
<!-- results in: '15' -->
```

### [{{times}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/math.js#L286)

Multiply number `a` by number `b`.

**Params**

* `a` **{Number}**: factor
* `b` **{Number}**: multiplier
* `returns` **{Number}**

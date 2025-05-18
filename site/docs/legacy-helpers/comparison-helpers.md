---
title: Comparison Helpers
description: >
    Handlebars provides a set of built-in helpers for performing comparisons. These helpers are used to compare values, making it easier to implement conditional logic in your templates.
order: 3
parent: legacy-helpers
---

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js)

* **[and](#and)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L27) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L10))
* **[compare](#compare)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L57) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L41))
* **[contains](#contains)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L124) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L167))
* **[default](#default)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L143) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L204))
* **[eq](#eq)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L165) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L351))
* **[gt](#gt)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L188) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L214))
* **[gte](#gte)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L212) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L245))
* **[has](#has)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L232) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L260))
* **[isFalsey](#isFalsey)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L274) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L327))
* **[isTruthy](#isTruthy)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L289) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L339))
* **[ifEven](#ifEven)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L310) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L368))
* **[ifNth](#ifNth)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L327) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L380))
* **[ifOdd](#ifOdd)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L350) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L403))
* **[is](#is)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L274) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L327))
* **[isnt](#isnt)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L389) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L432))
* **[lt](#lt)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L411) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L449))
* **[lte](#lte)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L435) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L476))
* **[neither](#neither)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L456) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L511))
* **[not](#not)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L470) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L624))
* **[or](#or)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L492) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L523))
* **[unlessEq](#unlessEq)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L518) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L556))
* **[unlessGt](#unlessGt)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L538) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L567))
* **[unlessLt](#unlessLt)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L558) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L578))
* **[unlessGteq](#unlessGteq)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L578) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L589))
* **[unlessLteq](#unlessLteq)** ([code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L598) | [tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/comparison.js#L604))

## comparison

### [{{and}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L27)

Helper that renders the block if **both** of the given values are truthy. If an inverse block is specified it will be rendered when falsy. Works as a block helper, inline helper or subexpression.

**Params**

* `a` **{any}**
* `b` **{any}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**

**Example**

```html
<!-- {great: true, magnificent: true} -->
{{#and great magnificent}}A{{else}}B{{/and}}
<!-- results in: 'A' -->
```

### [{{compare}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L57)

Render a block when a comparison of the first and third
arguments returns true. The second argument is
the [arithemetic operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) to use. You may also
optionally specify an inverse block to render when falsy.

**Params**

* `a` **{}**
* `operator` **{}**: The operator to use. Operators must be enclosed in quotes: `">"`, `"="`, `"<="`, and so on.
* `b` **{}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or if specified the inverse block is rendered if falsey.

### [{{contains}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L124)

Block helper that renders the block if `collection` has the given `value`, using strict equality (`===`) for comparison, otherwise the inverse block is rendered (if specified). If a `startIndex` is specified and is negative, it is used as the offset from the end of the collection.

**Params**

* `collection` **{Array|Object|String}**: The collection to iterate over.
* `value` **{any}**: The value to check for.
* `[startIndex=0]` **{Number}**: Optionally define the starting index.
* `options` **{Object}**: Handlebars provided options object.

**Example**

```html
<!-- array = ['a', 'b', 'c'] -->
{{#contains array "d"}}
  This will not be rendered.
{{else}}
  This will be rendered.
{{/contains}}
```

### [`{{default}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L143)

Returns the first value that is not undefined, otherwise the `default` value is returned.

**Params**

* `value` **{any}**
* `defaultValue` **{any}**
* `returns` **{String}**

### [{{eq}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L165)

Block helper that renders a block if `a` is **equal to** `b`.
If an inverse block is specified it will be rendered when falsy.
You may optionally use the `compare=""` hash argument for the
second value.

**Params**

* `a` **{String}**
* `b` **{String}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [{{gt}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L188)

Block helper that renders a block if `a` is **greater than** `b`.

If an inverse block is specified it will be rendered when falsy.
You may optionally use the `compare=""` hash argument for the
second value.

**Params**

* `a` **{String}**
* `b` **{String}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [{{gte}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L212)

Block helper that renders a block if `a` is **greater than or equal to** `b`.

If an inverse block is specified it will be rendered when falsy.
You may optionally use the `compare=""` hash argument for the
second value.

**Params**

* `a` **{String}**
* `b` **{String}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [{{has}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L232)

Block helper that renders a block if `value` has `pattern`.
If an inverse block is specified it will be rendered when falsy.

**Params**

* `val` **{any}**: The value to check.
* `pattern` **{any}**: The pattern to check for.
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**

### [{{isFalsey}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L274)

Returns true if the given `value` is falsey. Uses the [falsey](https://github.com/jonschlinkert/falsey)
library for comparisons. Please see that library for more information
or to report bugs with this helper.

**Params**

* `val` **{any}**
* `options` **{Options}**
* `returns` **{Boolean}**

### [{{isTruthy}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L289)

Returns true if the given `value` is truthy. Uses the [falsey](https://github.com/jonschlinkert/falsey)
library for comparisons. Please see that library for more information
or to report bugs with this helper.

**Params**

* `val` **{any}**
* `options` **{Options}**
* `returns` **{Boolean}**

### [{{ifEven}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L310)

Return true if the given value is an even number.

**Params**

* `number` **{Number}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

**Example**

```html
{{#ifEven value}}
  render A
{{else}}
  render B
{{/ifEven}}
```

### [{{ifNth}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L327)

Conditionally renders a block if the remainder is zero when
`a` operand is divided by `b`. If an inverse block is specified
it will be rendered when the remainder is **not zero**.

**Params**

* **{}**: {Number}
* **{}**: {Number}
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [{{ifOdd}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L350)

Block helper that renders a block if `value` is **an odd number**. If an inverse block is specified it will be rendered when falsy.

**Params**

* `value` **{Object}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

**Example**

```html
{{#ifOdd value}}
  render A
{{else}}
  render B
{{/ifOdd}}
```

### [`{{is}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L367)

Block helper that renders a block if `a` is **equal to** `b`.
If an inverse block is specified it will be rendered when falsy.
Similar to [eq](#eq) but does not do strict equality.

**Params**

* `a` **{any}**
* `b` **{any}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**

### [`{{isnt}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L389)

Block helper that renders a block if `a` is **not equal to** `b`.
If an inverse block is specified it will be rendered when falsy.
Similar to [unlessEq](#unlesseq) but does not use strict equality for
comparisons.

**Params**

* `a` **{String}**
* `b` **{String}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**

### [`{{lt}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L411)

Block helper that renders a block if `a` is **less than** `b`.

If an inverse block is specified it will be rendered when falsy.
You may optionally use the `compare=""` hash argument for the
second value.

**Params**

* `context` **{Object}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [`{{lte}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L435)

Block helper that renders a block if `a` is **less than or equal to** `b`.

If an inverse block is specified it will be rendered when falsy.
You may optionally use the `compare=""` hash argument for the
second value.

**Params**

* `a` **{Sring}**
* `b` **{Sring}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [`{{neither}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L456)

Block helper that renders a block if **neither of** the given values
are truthy. If an inverse block is specified it will be rendered
when falsy.

**Params**

* `a` **{any}**
* `b` **{any}**
* `options` **{}**: Handlebars options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [`{{not}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L470)

Returns true if `val` is falsey. Works as a block or inline helper.

**Params**

* `val` **{String}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**

### [`{{or}}`](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L492)

Block helper that renders a block if **any of** the given values is truthy. If an inverse block is specified it will be rendered when falsy.

**Params**

* `args` **{any}**: Variable number of arguments
* `options` **{Object}**: Handlebars options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

**Example**

```html
{{#or a b c}}
  If any value is true this will be rendered.
{{/or}}
```

### [{{unlessEq}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L518)

Block helper that always renders the inverse block **unless `a` is
is equal to `b`**.

**Params**

* `a` **{String}**
* `b` **{String}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Inverse block by default, or block if falsey.

### [{{unlessGt}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L538)

Block helper that always renders the inverse block **unless `a` is
is greater than `b`**.

**Params**

* `a` **{Object}**: The default value
* `b` **{Object}**: The value to compare
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Inverse block by default, or block if falsey.

### [{{unlessLt}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L558)

Block helper that always renders the inverse block **unless `a` is
is less than `b`**.

**Params**

* `a` **{Object}**: The default value
* `b` **{Object}**: The value to compare
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [{{unlessGteq}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L578)

Block helper that always renders the inverse block **unless `a` is
is greater than or equal to `b`**.

**Params**

* `a` **{any}**
* `b` **{any}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.

### [{{unlessLteq}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/comparison.js#L598)

Block helper that always renders the inverse block **unless `a` is
is less than or equal to `b`**.

**Params**

* `a` **{any}**
* `b` **{any}**
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block, or inverse block if specified and falsey.


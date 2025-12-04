---
title: Comparison Helpers
description: >
    Handlebars provides a set of built-in helpers for performing comparisons. These helpers are used to compare values, making it easier to implement conditional logic in your templates.
order: 8
---

## comparison

### {{and}}

Helper that renders the block if **all** of the given values are truthy. If an inverse block is specified it will be rendered when falsy. Works as a block helper, inline helper or subexpression.

**Params**

* `values` **{any}**: Variable number of values to check
* `returns` **{Boolean}**

**Example**

```handlebars
<!-- {great: true, magnificent: true} -->
{{#if (and great magnificent)}}A{{else}}B{{/if}}
<!-- results in: 'A' -->

<!-- {great: true, magnificent: false} -->
{{#if (and great magnificent)}}A{{else}}B{{/if}}
<!-- results in: 'B' -->
```

### {{compare}}

Render a block when a comparison of the first and third arguments returns true. The second argument is the operator to use.

**Supported Operators**

* `==` - loose equality
* `===` - strict equality
* `!=` - loose inequality
* `!==` - strict inequality
* `<` - less than
* `>` - greater than
* `<=` - less than or equal
* `>=` - greater than or equal
* `typeof` - checks if typeof first argument equals second argument

**Params**

* `a` **{any}**: The first value to compare
* `operator` **{String}**: The operator to use for comparison
* `b` **{any}**: The second value to compare
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (compare 10 ">" 5)}}A{{else}}B{{/if}}
<!-- results in: 'A' -->

{{#if (compare "hello" "typeof" "string")}}A{{else}}B{{/if}}
<!-- results in: 'A' -->
```

### {{contains}}

Block helper that renders the block if `collection` has the given `value`, otherwise the inverse block is rendered (if specified). If a `startIndex` is specified, the search begins at that index.

**Params**

* `collection` **{Array|Object|String}**: The collection to search.
* `value` **{any}**: The value to check for.
* `[startIndex=0]` **{Number}**: Optionally define the starting index.
* `returns` **{Boolean}**

**Example**

```handlebars
<!-- array = ['a', 'b', 'c'] -->
{{#if (contains array "b")}}
  This will be rendered.
{{else}}
  This will not be rendered.
{{/if}}

<!-- Works with strings too -->
{{#if (contains "hello world" "world")}}
  Found it!
{{/if}}

<!-- Works with objects (checks for key) -->
{{#if (contains object "keyName")}}
  Key exists!
{{/if}}
```

### {{default}}

Returns the first value that is not null or undefined, otherwise returns an empty string.

**Params**

* `values` **{any}**: Variable number of values to check
* `returns` **{any}**: The first non-null/undefined value, or empty string

**Example**

```handlebars
{{default title "Untitled"}}
<!-- If title is undefined, returns "Untitled" -->

{{default a b c "fallback"}}
<!-- Returns first non-null value, or "fallback" -->
```

### {{eq}}

Block helper that renders a block if `a` is **strictly equal to** `b` (using `===`).
If an inverse block is specified it will be rendered when falsy.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (eq name "John")}}
  Hello John!
{{else}}
  Hello stranger!
{{/if}}
```

### {{gt}}

Block helper that renders a block if `a` is **greater than** `b`.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (gt count 10)}}
  More than 10 items
{{else}}
  10 or fewer items
{{/if}}
```

### {{gte}}

Block helper that renders a block if `a` is **greater than or equal to** `b`.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (gte age 18)}}
  Adult
{{else}}
  Minor
{{/if}}
```

### {{has}}

Block helper that renders a block if `value` has `pattern`.
If an inverse block is specified it will be rendered when falsy.

**Params**

* `value` **{any}**: The value to check (array, string, or object).
* `pattern` **{any}**: The pattern to check for.
* `returns` **{Boolean}**

**Example**

```handlebars
<!-- array = ['a', 'b', 'c'] -->
{{#if (has array "b")}}
  Found it!
{{/if}}

<!-- string -->
{{#if (has "hello world" "world")}}
  Found it!
{{/if}}

<!-- object (checks for key) -->
{{#if (has user "email")}}
  User has email
{{/if}}
```

### {{isFalsey}}

Returns true if the given `value` is falsey. Recognizes common falsey keywords like "false", "no", "none", "null", "0", "nope", etc.

**Params**

* `val` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (isFalsey value)}}
  Value is falsey
{{/if}}

<!-- Recognizes falsey keywords -->
{{#if (isFalsey "no")}}
  This renders because "no" is falsey
{{/if}}
```

### {{isTruthy}}

Returns true if the given `value` is truthy (not falsey).

**Params**

* `val` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (isTruthy value)}}
  Value is truthy
{{/if}}
```

### {{ifEven}}

Returns true if the given value is an even number.

**Params**

* `number` **{Number}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (ifEven value)}}
  Value is even
{{else}}
  Value is odd
{{/if}}
```

### {{ifNth}}

Returns true if `b` is divisible by `a` (remainder is zero when `b` is divided by `a`).

**Params**

* `a` **{Number}**: The divisor
* `b` **{Number}**: The number to check
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (ifNth 3 index)}}
  Index is divisible by 3
{{/if}}
```

### {{ifOdd}}

Block helper that renders a block if `value` is **an odd number**.

**Params**

* `value` **{Number}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (ifOdd value)}}
  Value is odd
{{else}}
  Value is even
{{/if}}
```

### {{is}}

Block helper that renders a block if `a` is **equal to** `b` using loose equality (`==`).
Similar to [eq](#eq) but does not use strict equality.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (is 1 "1")}}
  This renders because 1 == "1" is true
{{/if}}
```

### {{isnt}}

Block helper that renders a block if `a` is **not equal to** `b` using loose inequality (`!=`).
Similar to [unlessEq](#unlesseq) but does not use strict equality.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (isnt name "admin")}}
  Not admin
{{/if}}
```

### {{lt}}

Block helper that renders a block if `a` is **less than** `b`.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (lt age 18)}}
  Minor
{{else}}
  Adult
{{/if}}
```

### {{lte}}

Block helper that renders a block if `a` is **less than or equal to** `b`.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (lte count 10)}}
  10 or fewer items
{{else}}
  More than 10 items
{{/if}}
```

### {{neither}}

Block helper that renders a block if **neither of** the given values are truthy.

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (neither isAdmin isModerator)}}
  Regular user
{{else}}
  Has elevated privileges
{{/if}}
```

### {{not}}

Returns true if `val` is falsey. Works as a block or inline helper.

**Params**

* `val` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (not isLoggedIn)}}
  Please log in
{{/if}}
```

### {{or}}

Block helper that renders a block if **any of** the given values is truthy.

**Params**

* `values` **{any}**: Variable number of values to check
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (or isAdmin isModerator isOwner)}}
  Has access
{{else}}
  Access denied
{{/if}}
```

### {{unlessEq}}

Block helper that returns true **unless `a` is strictly equal to `b`** (using `!==`).

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (unlessEq status "active")}}
  Status is not active
{{/if}}
```

### {{unlessGt}}

Block helper that returns true **unless `a` is greater than `b`** (equivalent to `a <= b`).

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (unlessGt count 100)}}
  Count is 100 or less
{{/if}}
```

### {{unlessLt}}

Block helper that returns true **unless `a` is less than `b`** (equivalent to `a >= b`).

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (unlessLt age 18)}}
  18 or older
{{/if}}
```

### {{unlessGteq}}

Block helper that returns true **unless `a` is greater than or equal to `b`** (equivalent to `a < b`).

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (unlessGteq age 21)}}
  Under 21
{{/if}}
```

### {{unlessLteq}}

Block helper that returns true **unless `a` is less than or equal to `b`** (equivalent to `a > b`).

**Params**

* `a` **{any}**
* `b` **{any}**
* `returns` **{Boolean}**

**Example**

```handlebars
{{#if (unlessLteq count 0)}}
  Count is greater than 0
{{/if}}
```

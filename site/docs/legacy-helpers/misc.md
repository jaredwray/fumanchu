---
title: Misc Helpers
description: >
    Handlebars provides a set of built-in helpers for working with miscellaneous tasks. These helpers are used to perform various operations, making it easier to manipulate data in templates.
order: 13
parent: legacy-helpers
---

## misc

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/misc.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/misc.js)

### [{{option}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/misc.js.js#L26)

Return the given value of `prop` from `this.options`.

**Params**

* `prop` **{String}**
* `returns` **{any}**

**Example**

```html
<!-- context = {options: {a: {b: {c: 'ddd'}}}} -->
{{option "a.b.c"}}
<!-- results => `ddd` -->
```

### [{{noop}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/misc.js.js#L39)

Block helper that renders the block without taking any arguments.

**Params**

* `options` **{Object}**
* `returns` **{String}**

### [{{typeOf}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/misc.js.js#L59)

Get the native type of the given `value`

**Params**

* `value` **{any}**
* `returns` **{String}**: Returns the type of value.

**Example**

```html
{{typeOf 1}}
//=> 'number'
{{typeOf "1"}}
//=> 'string'
{{typeOf "foo"}}
//=> 'string'
```

### [{{withHash}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/misc.js.js#L71)

Block helper that builds the context for the block
from the options hash.

**Params**

* `options` **{Object}**: Handlebars provided options object.

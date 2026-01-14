---
title: Misc Helpers
description: >
    Handlebars provides a set of built-in helpers for working with miscellaneous tasks. These helpers are used to perform various operations, making it easier to manipulate data in templates.
order: 18
---

## misc

### {{frame}}

Block helper for exposing private `@` variables on the context. Creates a new data frame and extends it with hash arguments.

**Params**

* `context` **{Object}**: Optional context data to include in the frame
* `options` **{Object}**: Handlebars provided options object
* `returns` **{String}**: Block content with the new frame context

**Example**

```html
{{#frame site="mysite" value=42}}
  {{@site}} - {{@value}}
{{/frame}}
<!-- results in: 'mysite - 42' -->
```

### {{option}}

Return the given value of `prop` from `this.options`.

**Params**

* `prop` **{String}**
* `returns` **{any}**

**Example**

```html
<!-- context = {options: {a: {b: {c: 'ddd'}}}} -->
{{option "a.b.c"}}
<!-- results in: 'ddd' -->
```

### {{noop}}

Block helper that renders the block without taking any arguments.

**Params**

* `options` **{Object}**
* `returns` **{String}**

### {{typeOf}}

Get the native type of the given `value`.

**Params**

* `value` **{any}**
* `returns` **{String}**: Returns the type of value.

**Example**

```html
{{typeOf 1}}
<!-- results in: 'number' -->
{{typeOf "1"}}
<!-- results in: 'string' -->
{{typeOf "foo"}}
<!-- results in: 'string' -->
```

### {{withHash}}

Block helper that builds the context for the block from the options hash.

**Params**

* `options` **{Object}**: Handlebars provided options object.

**Example**

```html
{{#withHash a=1 b="hello"}}
  {{a}} - {{b}}
{{/withHash}}
<!-- results in: '1 - hello' -->
```

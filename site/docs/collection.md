---
title: Collection Helpers
description: >
    Handlebars provides a set of built-in helpers for working with collections. These helpers are used to manipulate and format collections, making it easier to work with data in templates.
order: 9
---

## collection

Visit the: [collection](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/collection.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/collection.js)

### [{{isEmpty}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/collection.js#L31)

Inline, subexpression, or block helper that returns true (or the block) if the given collection is empty, or false (or the inverse block, if supplied) if the colleciton is not empty.

**Params**

* `collection` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- array: [] -->
{{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}
<!-- results in: 'AAA' -->

<!-- array: [] -->
{{isEmpty array}}
<!-- results in: true -->
```

### [{{iterate}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/collection.js#L59)

Block helper that iterates over an array or object. If
an array is given, `.forEach` is called, or if an object
is given, `.forOwn` is called, otherwise the inverse block
is returned.

**Params**

* `collection` **{Object|Array}**: The collection to iterate over
* `options` **{Object}**
* `returns` **{String}**

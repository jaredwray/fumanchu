---
title: Collection Helpers
description: >
    Handlebars provides a set of built-in helpers for working with collections. These helpers are used to manipulate and format collections, making it easier to work with data in templates.
order: 9
---

## collection

### {{isEmpty}}

Inline, subexpression, or block helper that returns true (or the block) if the given collection is empty, or false (or the inverse block, if supplied) if the collection is not empty.

A collection is considered empty if:
- It is `null` or `undefined`
- It is an array with length 0
- It is an object with no keys

**Params**

* `collection` **{Array|Object}**: The collection to check
* `returns` **{Boolean}**

**Example**

```handlebars
<!-- array: [] -->
{{#if (isEmpty array)}}
  Array is empty
{{else}}
  Array has items
{{/if}}
<!-- results in: 'Array is empty' -->

<!-- object: {} -->
{{#if (isEmpty object)}}
  Object is empty
{{/if}}

<!-- array: ['a', 'b'] -->
{{#if (isEmpty array)}}
  Empty
{{else}}
  Has {{array.length}} items
{{/if}}
<!-- results in: 'Has 2 items' -->
```

### {{iterate}}

Block helper that iterates over an array or object. If an array is given, it iterates over each element with its index. If an object is given, it iterates over each key-value pair. If the collection is null/undefined or not iterable, the inverse block is returned.

**Params**

* `collection` **{Object|Array}**: The collection to iterate over
* `fn` **{Function}**: The block function called for each item, receives `(value, key/index)`
* `inverse` **{Function}**: Optional inverse block if collection is empty or invalid
* `returns` **{String}**

**Example**

```handlebars
<!-- array: ['a', 'b', 'c'] -->
{{#iterate array}}
  Index {{@index}}: {{this}}
{{/iterate}}
<!-- results in:
  Index 0: a
  Index 1: b
  Index 2: c
-->

<!-- object: {name: 'John', age: 30} -->
{{#iterate object}}
  {{@key}}: {{this}}
{{/iterate}}
<!-- results in:
  name: John
  age: 30
-->

<!-- With inverse block for empty/invalid collections -->
{{#iterate emptyArray}}
  {{this}}
{{else}}
  No items found
{{/iterate}}
<!-- results in: 'No items found' -->
```

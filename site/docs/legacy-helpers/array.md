---
title: Array Helpers
description: >
  Handlebars provides a set of built-in helpers for working with arrays.
  These helpers allow you to iterate over arrays, check their length, and perform other common operations.
order: 1
parent: legacy-helpers
---

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/array.js)

### [{{after}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L22)

Returns all of the items in an array after the specified index. Opposite of [before](#before).

**Params**

* `array` **{Array}**: Collection
* `n` **{Number}**: Starting index (number of items to exclude)
* `returns` **{Array}**: Array exluding `n` items.

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{after array 1}}
<!-- results in: '["c"]' -->
```

### [{{arrayify}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L39)

Cast the given `value` to an array.

**Params**

* `value` **{any}**
* `returns` **{Array}**

**Example**

```html
{{arrayify "foo"}}
<!-- results in: [ "foo" ] -->
```

### [{{before}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L58)

Return all of the items in the collection before the specified count. Opposite of [after](#after).

**Params**

* `array` **{Array}**
* `n` **{Number}**
* `returns` **{Array}**: Array excluding items after the given number.

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{before array 2}}
<!-- results in: '["a", "b"]' -->
```

### [{{eachIndex}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L77)

**Params**

* `array` **{Array}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] -->
{{#eachIndex array}}
  {{item}} is {{index}}
{{/eachIndex}}
```

### [{{filter}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L102)

Block helper that filters the given array and renders the block for values that evaluate to `true`, otherwise the inverse block is returned.

**Params**

* `array` **{Array}**
* `value` **{any}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{#filter array "foo"}}AAA{{else}}BBB{{/filter}}
<!-- results in: 'BBB' -->
```

### [{{first}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L142)

Returns the first item, or first `n` items of an array.

**Params**

* `array` **{Array}**
* `n` **{Number}**: Number of items to return, starting at `0`.
* `returns` **{Array}**

**Example**

```html
{{first "['a', 'b', 'c', 'd', 'e']" 2}}
<!-- results in: '["a", "b"]' -->
```

### [{{forEach}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L184)

Iterates over each item in an array and exposes the current item in the array as context to the inner block. In addition to the current array item, the helper exposes the following variables to the inner block:

* `index`
* `total`
* `isFirst`
* `isLast`
Also, `@index` is exposed as a private variable, and additional
private variables may be defined as hash arguments.

**Params**

* `array` **{Array}**
* `returns` **{String}**

**Example**

```html
<!-- accounts = [
{'name': 'John', 'email': 'john@example.com'},
{'name': 'Malcolm', 'email': 'malcolm@example.com'},
{'name': 'David', 'email': 'david@example.com'}
] -->

{{#forEach accounts}}
  <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
	{{ name }}
  </a>{{#unless isLast}}, {{/unless}}
{{/forEach}}
```

### [{{inArray}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L224)

Block helper that renders the block if an array has the given `value`. Optionally specify an inverse block to render when the array does not have the given value.

**Params**

* `array` **{Array}**
* `value` **{any}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{#inArray array "d"}}
  foo
{{else}}
  bar
{{/inArray}}
<!-- results in: 'bar' -->
```

### [{{isArray}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L244)

Returns true if `value` is an es5 array.

**Params**

* `value` **{any}**: The value to test.
* `returns` **{Boolean}**

**Example**

```html
{{isArray "abc"}}
<!-- results in: false -->

<!-- array: [1, 2, 3] -->
{{isArray array}}
<!-- results in: true -->
```

### [{{itemAt}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L263)

Returns the item from `array` at index `idx`.

**Params**

* `array` **{Array}**
* `idx` **{Number}**
* `returns` **{any}** `value`

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{itemAt array 1}}
<!-- results in: 'b' -->
```

### [{{join}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L294)

Join all elements of array into a string, optionally using a given separator.

**Params**

* `array` **{Array}**
* `separator` **{String}**: The separator to use. Defaults to `,`.
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{join array}}
<!-- results in: 'a, b, c' -->

{{join array '-'}}
<!-- results in: 'a-b-c' -->
```
### [{{equalsLength}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L313)

Returns true if the the length of the given `value` is equal
to the given `length`. Can be used as a block or inline helper.

**Params**

* `value` **{Array|String}**
* `length` **{Number}**
* `options` **{Object}**
* `returns` **{String}**

### [{{last}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L349)

Returns the last item, or last `n` items of an array or string. Opposite of [first](#first).

**Params**

* `value` **{Array|String}**: Array or string.
* `n` **{Number}**: Number of items to return from the end of the array.
* `returns` **{Array}**

**Example**

```html
<!-- var value = ['a', 'b', 'c', 'd', 'e'] -->

{{last value}}
<!-- results in: ['e'] -->

{{last value 2}}
<!-- results in: ['d', 'e'] -->

{{last value 3}}
<!-- results in: ['c', 'd', 'e'] -->
```

### [{{length}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L379)

Returns the length of the given string or array.

**Params**

* `value` **{Array|Object|String}**
* `returns` **{Number}**: The length of the value.

**Example**

```html
{{length '["a", "b", "c"]'}}
<!-- results in: 3 -->

<!-- results in: myArray = ['a', 'b', 'c', 'd', 'e']; -->
{{length myArray}}
<!-- results in: 5 -->

<!-- results in: myObject = {'a': 'a', 'b': 'b'}; -->
{{length myObject}}
<!-- results in: 2 -->
```

### [{{lengthEqual}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L395)

Alias for [equalsLength](#equalsLength)

### [{{map}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L414)

Returns a new array, created by calling `function` on each element of the given `array`. For example,

**Params**

* `array` **{Array}**
* `fn` **{Function}**
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c'], and "double" is a
fictitious function that duplicates letters -->
{{map array double}}
<!-- results in: '["aa", "bb", "cc"]' -->
```

### [{{pluck}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L445)

Map over the given object or array or objects and create an array of values from the given `prop`. Dot-notation may be used (as a string) to get nested properties.

**Params**

* `collection` **{Array|Object}**
* `prop` **{Function}**
* `returns` **{String}**

**Example**

```html
// {{pluck items "data.title"}}
<!-- results in: '["aa", "bb", "cc"]' -->
```

### [{{reverse}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L473)

Reverse the elements in an array, or the characters in a string.

**Params**

* `value` **{Array|String}**
* `returns` **{Array|String}**: Returns the reversed string or array.

**Example**

```html
<!-- value: 'abcd' -->
{{reverse value}}
<!-- results in: 'dcba' -->
<!-- value: ['a', 'b', 'c', 'd'] -->
{{reverse value}}
<!-- results in: ['d', 'c', 'b', 'a'] -->
```

### [{{some}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L504)

Block helper that returns the block if the callback returns true for some value in the given array.

**Params**

* `array` **{Array}**
* `iter` **{Function}**: Iteratee
* **{Options}**: Handlebars provided options object
* `returns` **{String}**

**Example**

```html
<!-- array: [1, 'b', 3] -->
{{#some array isString}}
  Render me if the array has a string.
{{else}}
  Render me if it doesn't.
{{/some}}
<!-- results in: 'Render me if the array has a string.' -->
```

### [{{sort}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L532)

Sort the given `array`. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

**Params**

* `array` **{Array}**: the array to sort.
* `key` **{String|Function}**: The object key to sort by, or sorting function.

**Example**

```html
<!-- array: ['b', 'a', 'c'] -->
{{sort array}}
<!-- results in: '["a", "b", "c"]' -->
```

### [{{sortBy}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L557)

Sort an `array`. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

**Params**

* `array` **{Array}**: the array to sort.
* `props` **{String|Function}**: One or more properties to sort by, or sorting functions to use.

**Example**

```html
<!-- array: [{a: 'zzz'}, {a: 'aaa'}] -->
{{sortBy array "a"}}
<!-- results in: '[{"a":"aaa"}, {"a":"zzz"}]' -->
```

### [{{withAfter}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L588)

Use the items in the array _after_ the specified index as context inside a block. Opposite of [withBefore](#withBefore).

**Params**

* `array` **{Array}**
* `idx` **{Number}**
* `options` **{Object}**
* `returns` **{Array}**

**Example**

```html
<!-- array: ['a', 'b', 'c', 'd', 'e'] -->
{{#withAfter array 3}}
  {{this}}
{{/withAfter}}
<!-- results in: "de" -->
```

### [{{withBefore}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L618)

Use the items in the array _before_ the specified index as context inside a block. Opposite of [withAfter](#withAfter).

**Params**

* `array` **{Array}**
* `idx` **{Number}**
* `options` **{Object}**
* `returns` **{Array}**

**Example**

```html
<!-- array: ['a', 'b', 'c', 'd', 'e'] -->
{{#withBefore array 3}}
  {{this}}
{{/withBefore}}
<!-- results in: 'ab' -->
```

### [{{withFirst}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L648)

Use the first item in a collection inside a handlebars block expression. Opposite of [withLast](#withLast).

**Params**

* `array` **{Array}**
* `idx` **{Number}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{#withFirst array}}
  {{this}}
{{/withFirst}}
<!-- results in: 'a' -->
```

### [{{withGroup}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L692)

Block helper that groups array elements by given group `size`.

**Params**

* `array` **{Array}**: The array to iterate over
* `size` **{Number}**: The desired length of each array "group"
* `options` **{Object}**: Handlebars options
* `returns` **{String}**

**Example**

```html
<!-- array: ['a','b','c','d','e','f','g','h'] -->
{{#withGroup array 4}}
  {{#each this}}
	{{.}}
  {{each}}
  <br>
{{/withGroup}}
<!-- results in: -->
<!-- 'a','b','c','d'<br> -->
<!-- 'e','f','g','h'<br> -->
```

### [{{withLast}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L727)

Use the last item or `n` items in an array as context inside a block. Opposite of [withFirst](#withFirst).

**Params**

* `array` **{Array}**
* `idx` **{Number}**: The starting index.
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- array: ['a', 'b', 'c'] -->
{{#withLast array}}
  {{this}}
{{/withLast}}
<!-- results in: 'c' -->
```

### [{{withSort}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L766)

Block helper that sorts a collection and exposes the sorted collection as context inside the block.

**Params**

* `array` **{Array}**
* `prop` **{String}**
* `options` **{Object}**: Specify `reverse="true"` to reverse the array.
* `returns` **{String}**

**Example**

```html
<!-- array: ['b', 'a', 'c'] -->
{{#withSort array}}{{this}}{{/withSort}}
<!-- results in: 'abc' -->
```

### [{{unique}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/array.js#L816)

Block helper that return an array with all duplicate values removed. Best used along with a [each](#each) helper.

**Params**

* `array` **{Array}**
* `options` **{Object}**
* `returns` **{Array}**

**Example**

```html
<!-- array: ['a', 'a', 'c', 'b', 'e', 'e'] -->
{{#each (unique array)}}{{.}}{{/each}}
<!-- results in: 'acbe' -->
```

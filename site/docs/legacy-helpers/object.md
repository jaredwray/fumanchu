---
title: Object Helpers
description: >
    Handlebars provides a set of built-in helpers for working with objects. These helpers are used to manipulate and format objects, making it easier to work with complex data structures in templates.
order: 15
parent: legacy-helpers
---

## object

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/object.js)

### [{{extend}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L18)

Extend the context with the properties of other objects.
A shallow merge is performed to avoid mutating the context.

**Params**

* `objects` **{Object}**: One or more objects to extend.
* `returns` **{Object}**

### [{{forIn}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L55)

Block helper that iterates over the properties of
an object, exposing each key and value on the context.

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

### [{{forOwn}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L81)

Block helper that iterates over the **own** properties of
an object, exposing each key and value on the context.

**Params**

* `obj` **{Object}**: The object to iterate over.
* `options` **{Object}**
* `returns` **{String}**

### [{{toPath}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L106)

Take arguments and, if they are string or number, convert them to a dot-delineated object property path.

**Params**

* `prop` **{String|Number}**: The property segments to assemble (can be multiple).
* `returns` **{String}**

### [{{get}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L128)

Use property paths (`a.b.c`) to get a value or nested value from
the context. Works as a regular helper or block helper.

**Params**

* `prop` **{String}**: The property to get, optionally using dot notation for nested properties.
* `context` **{Object}**: The context object
* `options` **{Object}**: The handlebars options object, if used as a block helper.
* `returns` **{String}**

### [{{getObject}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L149)

Use property paths (`a.b.c`) to get an object from
the context. Differs from the `get` helper in that this
helper will return the actual object, including the
given property key. Also, this helper does not work as a
block helper.

**Params**

* `prop` **{String}**: The property to get, optionally using dot notation for nested properties.
* `context` **{Object}**: The context object
* `returns` **{String}**

### [{{hasOwn}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L167)

Return true if `key` is an own, enumerable property of the given `context` object.

**Params**

* `key` **{String}**
* `context` **{Object}**: The context object.
* `returns` **{Boolean}**

**Example**

```html
{{hasOwn context key}}
```

### [{{isObject}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L183)

Return true if `value` is an object.

**Params**

* `value` **{String}**
* `returns` **{Boolean}**

**Example**

```html
{{isObject "foo"}}
//=> false
```

### [{{JSONparse}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L201)

Parses the given string using `JSON.parse`.

**Params**

* `string` **{String}**: The string to parse

**Example**

```html
<!-- string: '{"foo": "bar"}' -->
{{JSONparse string}}
<!-- results in: { foo: 'bar' } -->
```

### [{{JSONstringify}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L218)

Stringify an object using `JSON.stringify`.

**Params**

* `obj` **{Object}**: Object to stringify
* `returns` **{String}**

**Example**

```html
<!-- object: { foo: 'bar' } -->
{{JSONstringify object}}
<!-- results in: '{"foo": "bar"}' -->
```

### [{{merge}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L235)

Deeply merge the properties of the given `objects` with the
context object.

**Params**

* `object` **{Object}**: The target object. Pass an empty object to shallow clone.
* `objects` **{Object}**
* `returns` **{Object}**

### [{{pick}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/object.js#L267)

Pick properties from the context object.

**Params**

* `properties` **{Array|String}**: One or more properties to pick.
* `context` **{Object}**
* `options` **{Object}**: Handlebars options object.
* `returns` **{Object}**: Returns an object with the picked values. If used as a block helper, the values are passed as context to the inner block. If no values are found, the context is passed to the inverse block.

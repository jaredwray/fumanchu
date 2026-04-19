---
title: Utils Helpers
description: >
    Handlebars provides a set of built-in helpers for working with utility functions. These helpers are used to manipulate and format data, making it easier to work with complex data structures in templates.
order: 25
---

## Utils

The following utils are exposed on `.utils`.

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/utils/index.js)

### [{{changecase}}](lib/utils/index.js#L54)

Change casing on the given `string`, optionally passing a delimiter to use between words in the returned string.

**Params**

* `string` **{String}**: The string to change.
* `returns` **{String}**

**Example**

```html
utils.changecase('fooBarBaz');
//=> 'foo bar baz'

utils.changecase('fooBarBaz' '-');
//=> 'foo-bar-baz'
```

### [{{random}}](lib/utils/index.js#L80)

Generate a random number

**Params**

* `min` **{Number}**
* `max` **{Number}**
* `returns` **{Number}**
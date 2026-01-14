---
title: Regex Helpers
description: >
    Handlebars provides a set of built-in helpers for working with regular expressions. These helpers are used to manipulate and format strings using regex patterns, making it easier to work with complex string matching in templates.
order: 22
---

## regex

### {{toRegex}}

Convert the given string to a regular expression.

**Params**

* `str` **{String}**
* `returns` **{RegExp}**

**Example**

```html
{{toRegex "foo"}}
<!-- results in: /foo/ -->
```

### {{test}}

Returns true if the given `str` matches the given regex. A regex can be passed on the context, or using the toRegex helper as a subexpression.

**Params**

* `str` **{String}**
* `returns` **{RegExp}**

**Example**

```html
{{test "bar" (toRegex "foo")}}
<!-- results in: false -->
{{test "foobar" (toRegex "foo")}}
<!-- results in: true -->
{{test "foobar" (toRegex "^foo$")}}
<!-- results in: false -->
```

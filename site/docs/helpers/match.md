---
title: Match Helpers
description: >
    Handlebars provides a set of built-in helpers for working with markdown. These helpers are used to format and manipulate markdown content, making it easier to display markdown in a readable format.
order: 11
parent: helpers
---

## match

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/match.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/match.js)

### [{{match}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/match.js#L23)

Returns an array of strings that match the given glob pattern(s). Options may be passed on the options hash or locals.

**Params**

* `files` **{Array|String}**
* `patterns` **{Array|String}**: One or more glob patterns.
* `locals` **{Object}**
* `options` **{Object}**
* `returns` **{Array}**: Array of matches

**Example**

```html
{{match (readdir "foo") "*.js"}}
{{match (readdir "foo") (toRegex "\\.js$")}}
```

### [{{isMatch}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/match.js#L47)

Returns true if a filepath contains the given pattern. Options may be passed on the options hash or locals.

**Params**

* `filepath` **{String}**
* `pattern` **{String}**
* `options` **{Object}**
* `returns` **{Boolean}**

**Example**

```html
{{isMatch "foo.md" "*.md"}}
<!-- results in: true -->
```

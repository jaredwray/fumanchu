---
title: Match Helpers
description: >
    Handlebars helpers for working with glob patterns and file matching. These helpers use micromatch to filter and test file paths against glob patterns.
order: 16
---

## match

### {{match}}

Returns an array of strings that match the given glob pattern(s).

**Params**

* `files` **{Array|String}**: Array of file paths or a single file path string.
* `patterns` **{Array|String}**: One or more glob patterns. Comma-separated strings are also supported.
* `options` **{Object}**: Options to pass to micromatch.
* `returns` **{Array}**: Array of matches

**Example**

```html
{{match (readdir "foo") "*.js"}}
{{match (readdir "foo") (toRegex "\\.js$")}}
```

### {{isMatch}}

Returns true if a filepath matches the given pattern.

**Params**

* `filepath` **{String}**: The file path to test.
* `pattern` **{String|Array}**: The glob pattern(s) to match against.
* `options` **{Object}**: Options to pass to micromatch.
* `returns` **{Boolean}**

**Example**

```html
{{isMatch "foo.md" "*.md"}}
<!-- results in: true -->
```

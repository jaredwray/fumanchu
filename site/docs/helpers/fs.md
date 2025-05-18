---
title: File System Helpers
description: >
    Handlebars provides a set of built-in helpers for working with the file system. These helpers are used to read and manipulate files, making it easier to work with file data in templates.
order: 6
parent: helpers
---

## fs

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/fs.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/fs.js)

### [{{read}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/fs.js#L29)

Read a file from the file system. This is useful in composing "include"-style helpers using sub-expressions.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{read "a/b/c.js"}}
{{someHelper (read "a/b/c.md")}}
```

### [{{readdir}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/fs.js#L42)

Return an array of files from the given
directory.

**Params**

* `directory` **{String}**
* `returns` **{Array}**

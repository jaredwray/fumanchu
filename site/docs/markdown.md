---
title: Markdown Helpers
description: >
    Handlebars provides a set of built-in helpers for working with markdown. These helpers are used to format and manipulate markdown content, making it easier to display markdown in a readable format.
order: 15
---

## markdown

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/src/helpers/md.ts) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/src/helpers/test/md.test.ts)

### [{{markdown}}](https://github.com/jaredwray/fumanchu/tree/main/src/helpers/md.ts)

Block helper that converts a string of inline markdown to HTML.

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
{{#markdown}}
# Foo
{{/markdown}}
<!-- results in: <h1>Foo</h1> -->
```

### [{{md}}](https://github.com/jaredwray/fumanchu/tree/main/src/helpers/md.ts)

Read a markdown file from the file system and inject its contents after converting it to HTML.

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
{{md "foo/bar.md"}}
```

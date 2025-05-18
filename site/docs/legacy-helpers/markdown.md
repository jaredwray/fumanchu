---
title: Markdown Helpers
description: >
    Handlebars provides a set of built-in helpers for working with markdown. These helpers are used to format and manipulate markdown content, making it easier to display markdown in a readable format.
order: 10
parent: legacy-helpers
---

## markdown

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/markdown.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/markdown.js)

### [{{markdown}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/markdown.js#L28)

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

### [{{md}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/markdown.js#L55)

Read a markdown file from the file system and inject its contents after converting it to HTML.

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
{{md "foo/bar.md"}}
```
